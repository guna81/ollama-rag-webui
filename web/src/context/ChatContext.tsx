"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

import ollama from "ollama/browser";
import { useApp } from "./AppContext";
import { chat, loadDocuments } from "@/services/document";

export interface Message {
  id: string;
  sender: string;
  content: any;
  timestamp: Date;
  type: string;
}

interface Document {
  id: string;
  title: string;
  content: string;
}

interface ChatProviderProps {
  children: ReactNode;
}

interface ChatContextProps {
  streamingCotent: string;
  messages: Message[];
  loading: any;
  error: string | null;
  addMessage: (message: Message) => void;
  sendMessage: (payload: any) => void;
  abortLastRequest: () => void;
  loadDocument: (payload: any) => void;
  setError: (error: string | null) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { selectedModel } = useApp();
  const [document, setDocument] = useState<Document[]>([]);
  const [streamingCotent, setStreamingContent] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState<any>({
    isLoading: false,
    isStreaming: false,
    documentLoading: false,
  });

  const { isLoading, isStreaming, documentLoading } = loading;

  const updateLoading = (key: string, value: boolean) => {
    setLoading((prev: any) => ({ ...prev, [key]: value }));
  };

  const abortLastRequest = useCallback(async () => {
    if (isLoading || isStreaming) {
      // Abort the current request
      console.log("Aborting last request");

      ollama.abort();
      updateLoading("isLoading", false);
      updateLoading("isStreaming", false);

      // creating manual timeout
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }, [isLoading, isStreaming]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const ollamaChat = async (message: any) => {
    const userMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      content: message,
      timestamp: new Date(),
      type: "text",
    };
    addMessage(userMessage);

    const payload: any = {
      model: selectedModel,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
    };

    updateLoading("isLoading", true);
    try {
      const res: any = await ollama.chat(payload);
      updateLoading("isLoading", false);
      updateLoading("isStreaming", true);
      for await (const part of res) {
        setStreamingContent((prev) => prev + part.message.content);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Request was aborted");
      } else {
        console.error("An error occurred:", error);
      }
    } finally {
      // setIsStreaming(false);
      updateLoading("isStreaming", false);
    }
  };

  const ragChat = async (message: any) => {
    const userMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      content: message,
      timestamp: new Date(),
      type: "text",
    };
    addMessage(userMessage);

    // const payload: any = {
    //   model: selectedModel,
    //   messages: [
    //     {
    //       role: "user",
    //       content: message,
    //     },
    //   ],
    //   stream: true,
    // };

    const payload = {
      query: message,
    };

    console.log({ payload });

    updateLoading("isLoading", true);
    const res: any = await chat(payload);
    updateLoading("isLoading", false);

    const result = {
      id: crypto.randomUUID(),
      sender: "assistant",
      content: res.response,
      timestamp: new Date(),
      type: "text",
    };
    setMessages((prevMessages) => [...prevMessages, result]);
  };

  const sendMessage = useCallback(
    async (message: any) => {
      // Abort the previous request if it exists
      await abortLastRequest();

      if (document.length > 0) {
        ragChat(message);
      } else {
        ollamaChat(message);
      }
    },
    [selectedModel, abortLastRequest, document, ollamaChat, ragChat]
  );

  useEffect(() => {
    if (!isStreaming && streamingCotent) {
      const responseMessage = {
        id: crypto.randomUUID(),
        sender: "assistant",
        content: streamingCotent,
        timestamp: new Date(),
        type: "text",
      };
      addMessage(responseMessage);
      setStreamingContent("");
    }
  }, [isStreaming, streamingCotent]);

  const loadDocument = useCallback(async (file: any) => {
    updateLoading("documentLoading", true);
    setDocument((prev) => [...prev, file]);
    const message = {
      id: crypto.randomUUID(),
      sender: "user",
      content: file,
      timestamp: new Date(),
      type: "file",
    };
    addMessage(message);
    const formData = new FormData();
    formData.append("file", file);
    const res: any = await loadDocuments(formData);
    console.log({ res });
    updateLoading("documentLoading", false);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        streamingCotent,
        messages,
        loading,
        error,
        addMessage,
        sendMessage,
        abortLastRequest,
        loadDocument,
        setError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
