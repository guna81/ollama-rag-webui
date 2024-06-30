"use client";

import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { AppProvider } from "@/context/AppContext";

import "@/styles/styles.css";
import styles from "../styles/Home.module.css";

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
