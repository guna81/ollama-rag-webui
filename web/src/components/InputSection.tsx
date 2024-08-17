import React, { useState } from "react";
import styles from "@/styles/InputSection.module.css";

import sendIcon from "../../assets/icons/send-icon.svg";
import Image from "next/image";
import { useOllama } from "@/context/OllamaContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faStop } from "@fortawesome/free-solid-svg-icons";

const InputSection: React.FC = () => {
  const { isLoading, isStreaming, sendMessage, abortLastRequest } = useOllama();
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!message) return;

    try {
      sendMessage(message);
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAbort = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      abortLastRequest();
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
      {isLoading || isStreaming ? (
        <a className={styles.sendButton} onClick={handleAbort}>
          <FontAwesomeIcon icon={faStop} />
        </a>
      ) : (
        <a className={styles.sendButton} onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </a>
      )}
    </form>
  );
};

export default InputSection;
