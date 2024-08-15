"use client";

import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { AppProvider } from "@/context/AppContext";

import "@/styles/styles.css";
import styles from "../styles/Home.module.css";
import { OllamaProvider } from "@/context/OllamaContext";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <AppProvider>
        <OllamaProvider>
          <Sidebar />
          <Main />
        </OllamaProvider>
      </AppProvider>
    </div>
  );
};

export default Home;
