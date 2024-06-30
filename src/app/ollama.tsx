"use client";

import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import styles from "../styles/Home.module.css";
import { AppProvider } from "@/context/AppContext";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <AppProvider>
        <Sidebar />
        <Main />
      </AppProvider>
    </div>
  );
};

export default Home;
