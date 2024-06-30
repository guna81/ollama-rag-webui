import React from "react";
import styles from "@/styles/Sidebar.module.css";
import Ollama from "./Sidebar/Ollama";
import Image from "next/image";

import logo from "../../assets/logo/logo.png";
import Document from "./Sidebar/Document";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Image src={logo} alt="logo" width={100} height={100} />
        <h1 className={styles.title}>Chat With Data</h1>
      </div>

      <div className={styles.sidebarBody}>
        <Ollama />
        <Document />
      </div>
    </div>
  );
};

export default Sidebar;
