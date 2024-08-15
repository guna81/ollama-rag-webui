import React from "react";
import ChatSection from "./ChatSection";
import InputSection from "./InputSection";
import styles from "@/styles/Main.module.css";
import ModelSelect from "./layout/ModelSelect";

const Main: React.FC = () => {
  return (
    <div className={styles.main}>
      <ModelSelect />
      <ChatSection />
      <InputSection />
    </div>
  );
};

export default Main;
