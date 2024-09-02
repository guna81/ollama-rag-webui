"use client";

import Head from "next/head";
import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Main from "../components/Main";
import { AppProvider } from "@/context/AppContext";
import { ChatProvider } from "@/context/ChatContext";

import styles from "../styles/Home.module.css";

import "@/styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      {/* <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head> */}

      <AppProvider>
        <ChatProvider>
          <Sidebar />
          <Main />
        </ChatProvider>
      </AppProvider>
    </div>
  );
};

export default Home;
