"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

import { chat, getModelList } from "@/services/ollama";
import ollama from "ollama/browser";
import { askQuestion } from "@/services/document";

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
  selectedModel: any;
  changeModel: (model: string) => void;
  ollamaModels: any[];
  getOllamaModels: () => void;
  documents: Document[];
  streamingCotent: string;
  isStreaming: boolean;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addDocument: (document: Document) => void;
  sendMessage: (payload: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState<any>("");
  const [ollamaModels, setOllamaModels] = useState<any[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [streamingCotent, setStreamingContent] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getOllamaModels = useCallback(async () => {
    const res: any = await getModelList();
    setOllamaModels(res.data.models);
  }, []);

  const changeModel = useCallback((model: string) => {
    setSelectedModel(model);
  }, []);

  const addDocument = useCallback((document: Document) => {
    setDocuments((prevDocuments) => [...prevDocuments, document]);
  }, []);

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

  const sendMessage = useCallback(
    async (message: any) => {
      const userMessage = {
        id: crypto.randomUUID(),
        sender: "user",
        content: message,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      if (documents.length === 0) {
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

        const res: any = await ollama.chat(payload);

        setIsStreaming(true);
        for await (const part of res) {
          setStreamingContent((prev) => prev + part.message.content);
        }
        setIsStreaming(false);
      } else {
        const payload: any = {
          question: message,
        };
        const res: any = await askQuestion(payload);

        setIsStreaming(true);
        for await (const part of res) {
          setStreamingContent((prev) => prev + part);
        }
        setIsStreaming(false);
      }
    },
    [selectedModel]
  );

  return (
    <ChatContext.Provider
      value={{
        selectedModel,
        changeModel,
        ollamaModels,
        getOllamaModels,
        documents,
        streamingCotent,
        isStreaming,
        messages,
        isLoading,
        error,
        addDocument,
        sendMessage,
        setLoading,
        setError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useApp = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
