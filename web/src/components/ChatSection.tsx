import React, { useRef, useEffect } from "react";
import styles from "@/styles/ChatSection.module.css";
import { Message, useApp } from "@/context/AppContext";
import Markdown from "react-markdown";
import { useOllama } from "@/context/OllamaContext";
import Skeleton from "react-loading-skeleton";
import { Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";

import "react-loading-skeleton/dist/skeleton.css";

export interface MessageProps {
  message: Message;
}

const ChatSection: React.FC = () => {
  const { streamingCotent, isLoading, isStreaming, messages } = useOllama();
  const chatRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [streamingCotent]);

  return (
    <div className={styles.chatSection}>
      <Card
        body
        style={{
          height: "100%",
          overflowY: "auto",
        }}
        ref={chatRef}
      >
        <ListGroup>
          {messages.map((message, index) => {
            if (message.sender === "user")
              return <UserQuery key={index} message={message} />;
            else {
              return <Response key={index} message={message} />;
            }
          })}

          {isLoading && <Skeleton count={3} />}

          {isStreaming && (
            <Response
              message={{
                id: crypto.randomUUID(),
                sender: "assistant",
                content: streamingCotent,
                timestamp: new Date(),
              }}
            />
          )}
        </ListGroup>
      </Card>
    </div>
  );
};

export default ChatSection;

const UserQuery: React.FC<MessageProps> = ({ message }) => {
  return (
    <ListGroup.Item className="mb-2 d-flex justify-content-end border-0">
      <div className={styles.userQuery}>{message.content}</div>
      <FontAwesomeIcon
        className={styles.userIcon}
        style={{ marginLeft: "12px" }}
        icon={faUser}
      />
    </ListGroup.Item>
  );
};

const Response: React.FC<MessageProps> = ({ message }) => {
  return (
    <ListGroup.Item className="mb-2 d-flex border-0">
      <FontAwesomeIcon
        className={styles.userIcon}
        style={{ marginRight: "12px" }}
        icon={faRobot}
      />
      <div className={styles.response}>
        <div className={styles.markdownContent}>
          <Markdown>{message.content}</Markdown>
        </div>
      </div>
    </ListGroup.Item>
  );
};
