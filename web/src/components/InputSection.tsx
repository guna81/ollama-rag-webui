import React, { useState } from "react";
import styles from "@/styles/InputSection.module.css";
import { useApp } from "@/context/AppContext";

import sendIcon from "../../assets/icons/send-icon.svg";
import Image from "next/image";
import { useOllama } from "@/context/OllamaContext";

const InputSection: React.FC = () => {
  const { isLoading, isStreaming, sendMessage } = useOllama();
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isLoading || isStreaming) return;

    try {
      sendMessage(message);
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    } else {
      return;
    }
  };

  return (
    <form className={styles.inputSection}>
      <textarea
        rows={1}
        className={styles.input}
        placeholder="What's up?"
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <a className={styles.sendButton} onClick={handleSendMessage}>
        <Image
          src={sendIcon}
          width={24}
          height={24}
          alt="send-icon"
          onClick={handleSendMessage}
        />
      </a>
    </form>
  );
};

export default InputSection;
