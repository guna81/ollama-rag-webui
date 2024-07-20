import React from "react";
import ChatSection from "./ChatSection";
import InputSection from "./InputSection";
import styles from "@/styles/Main.module.css";
import Ollama from "./Sidebar/Ollama";

const Main: React.FC = () => {
  return (
    <div className={styles.main}>
      <Ollama />
      <ChatSection />
      <InputSection />
    </div>
  );
};

export default Main;
