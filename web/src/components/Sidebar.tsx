import React from "react";
import styles from "@/styles/Sidebar.module.css";
import Ollama from "./layout/ModelSelect";
import Image from "next/image";

import logo from "../../assets/logo/ollama.png";
import Document from "./Sidebar/Document";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Image src={logo} alt="logo" width={100} height={100} />
        <h1 className={styles.title}>Ollama Web</h1>
      </div>

      <div className={styles.sidebarBody}>{/* <Document /> */}</div>
    </div>
  );
};

export default Sidebar;
