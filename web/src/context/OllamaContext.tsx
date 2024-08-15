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

// interface Document {
//   id: string;
//   title: string;
//   content: string;
// }

export interface Message {
  id: string;
  sender: string;
  content: any;
  timestamp: Date;
}

interface AppProviderProps {
  children: ReactNode;
}

interface ChatContextProps {
  streamingCotent: string;
  isStreaming: boolean;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (payload: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const OllamaContext = createContext<ChatContextProps | undefined>(undefined);

export const OllamaProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { selectedModel } = useApp();

  const [streamingCotent, setStreamingContent] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isStreaming && streamingCotent) {
      const responseMessage = {
        id: crypto.randomUUID(),
        sender: "assistant",
        content: streamingCotent,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
      setStreamingContent("");
    }
  }, [isStreaming, streamingCotent]);

  let controller: any = null;

  const abortLastRequest = () => {
    if (controller) {
      controller.abort();
      controller = null;
      setLoading(false);
      setIsStreaming(false);
    }
  };

  const sendMessage = useCallback(
    async (message: any) => {
      // Abort the previous request if it exists
      if (controller) {
        abortLastRequest();
      }

      controller = new AbortController();
      const signal = controller.signal;

      const userMessage = {
        id: crypto.randomUUID(),
        sender: "user",
        content: message,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const payload: any = {
        model: selectedModel,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        stream: true,
        signal: signal,
      };

      setLoading(true);
      const res: any = await ollama.chat(payload);
      setLoading(false);

      setIsStreaming(true);
      for await (const part of res) {
        setStreamingContent((prev) => prev + part.message.content);
      }
      setIsStreaming(false);
    },
    [selectedModel]
  );

  return (
    <OllamaContext.Provider
      value={{
        streamingCotent,
        isStreaming,
        messages,
        isLoading,
        error,
        sendMessage,
        setLoading,
        setError,
      }}
    >
      {children}
    </OllamaContext.Provider>
  );
};

export const useOllama = (): ChatContextProps => {
  const context = useContext(OllamaContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
