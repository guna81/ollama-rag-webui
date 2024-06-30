import React from "react";
import ChatSection from "./ChatSection";
import InputSection from "./InputSection";
import styles from "@/styles/Main.module.css";

const Main: React.FC = () => {
  return (
    <div className={styles.main}>
      <ChatSection />
      <InputSection />
    </div>
  );
};

export default Main;
