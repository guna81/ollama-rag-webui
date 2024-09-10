import React, { useState, useEffect } from "react";
import styles from "@/styles/InputSection.module.css";

import { useChat } from "@/context/ChatContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faPaperPlane,
  faPaperclip,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

import Form from "react-bootstrap/Form";

const InputSection: React.FC = () => {
  const { loading, sendMessage, abortLastRequest, loadDocument } = useChat();
  const { isLoading, isStreaming, documentLoading } = loading;

  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

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

  const handleFileUpload = async () => {
    if (file) {
      try {
        const res: any = await loadDocument(file);
        console.log({ res });
      } catch (error) {
        console.log({ error });
      }
    }
  };

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

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
      <Form.Control
        className={styles.input}
        as="textarea"
        rows={1}
        placeholder="Type a message"
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.sendButtonContainer}>
        <label className={styles.fileButton}>
          <input
            type="file"
            className={styles.fileInput}
            // value={file}
            accept="application/pdf"
            onChange={(e: any) => setFile(e.target.files[0])}
          />
          <FontAwesomeIcon icon={faPaperclip} />
        </label>
        {isLoading || isStreaming ? (
          <a className={styles.sendButton} onClick={handleAbort}>
            <FontAwesomeIcon icon={faStop} />
          </a>
        ) : (
          <a className={styles.sendButton} onClick={handleSendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </a>
        )}
      </div>
    </form>
  );
};

export default InputSection;
