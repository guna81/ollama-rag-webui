import React, { useRef, useEffect } from "react";
import styles from "@/styles/ChatSection.module.css";
import { Message, useApp } from "@/context/AppContext";
import Markdown from "react-markdown";
import { useOllama } from "@/context/OllamaContext";

import Skeleton from "react-loading-skeleton";
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
    <div className={styles.chatSection} ref={chatRef}>
      {messages.map((message, index) => {
        if (message.sender === "user")
          return <UserQuery key={index} message={message} />;
        else {
          return <Response key={index} message={message} />;
        }
      })}

      {isLoading && <Skeleton count={3} width={"50%"} />}

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
    </div>
  );
};

export default ChatSection;

const UserQuery: React.FC<MessageProps> = ({ message }) => {
  return <div className={styles.userQuery}>{message.content}</div>;
};

const Response: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className={styles.response}>
      <div className={styles.markdownContent}>
        <Markdown>{message.content}</Markdown>
      </div>
    </div>
  );
};
