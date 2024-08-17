"use client";

import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Main from "../components/Main";
import { AppProvider } from "@/context/AppContext";
import { OllamaProvider } from "@/context/OllamaContext";

import styles from "../styles/Home.module.css";

import "@/styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
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
