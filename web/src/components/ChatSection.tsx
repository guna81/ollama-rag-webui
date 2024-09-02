import React, { useRef, useEffect } from "react";
import styles from "@/styles/ChatSection.module.css";
import Markdown from "react-markdown";
import { Message, useChat } from "@/context/ChatContext";
import Skeleton from "react-loading-skeleton";
import { Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faRobot,
  faStop,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";

import "react-loading-skeleton/dist/skeleton.css";

export interface MessageProps {
  message: Message;
}

const ChatSection: React.FC = () => {
  const { streamingCotent, loading, messages } = useChat();
  const { isLoading, isStreaming } = loading;

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
                type: "text",
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
  const { loading } = useChat();
  const { documentLoading } = loading;

  return (
    <ListGroup.Item className="mb-2 d-flex justify-content-end border-0">
      <div className={styles.userQuery}>
        {message.type === "text" ? (
          message.content
        ) : (
          <div>
            {documentLoading ? (
              <Spinner
                style={{ marginRight: "12px" }}
                animation="border"
                size="sm"
              />
            ) : (
              <FontAwesomeIcon
                // className={styles.userIcon}
                style={{ marginRight: "12px" }}
                icon={faFile}
              />
            )}
            {message.content.name}
          </div>
        )}
      </div>
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
