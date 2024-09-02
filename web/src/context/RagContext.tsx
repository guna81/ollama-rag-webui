"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

import { useApp } from "./AppContext";
import { loadDocuments } from "@/services/document";

interface Document {
  id: string;
  title: string;
  content: string;
}

interface RagProviderProps {
  children: ReactNode;
}

interface ChatContextProps {
  document: Document[];
  isLoading: boolean;
  error: string | null;
  loadDocument: (payload: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const RagContext = createContext<ChatContextProps | undefined>(undefined);

export const RagProvider: React.FC<RagProviderProps> = ({ children }) => {
  const { selectedModel } = useApp();

  const [document, setDocument] = useState<Document[]>([]);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadDocument = useCallback(async (file: any) => {
    setDocument((prev) => [...prev, file]);
    const formData = new FormData();
    formData.append("file", file);
    const res: any = await loadDocuments(formData);
    console.log({ res });
  }, []);

  return (
    <RagContext.Provider
      value={{
        document,
        isLoading,
        error,
        loadDocument,
        setLoading,
        setError,
      }}
    >
      {children}
    </RagContext.Provider>
  );
};

export const useRag = (): ChatContextProps => {
  const context = useContext(RagContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
