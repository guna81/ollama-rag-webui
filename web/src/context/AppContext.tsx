"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

import { getModelList } from "@/services/ollama";

interface AppProviderProps {
  children: ReactNode;
}

interface ChatContextProps {
  selectedModel: any;
  changeModel: (model: string) => void;
  ollamaModels: any[];
  getOllamaModels: () => void;
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState<any>("");
  const [ollamaModels, setOllamaModels] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getOllamaModels = useCallback(async () => {
    const res: any = await getModelList();
    setOllamaModels(res.data.models);
  }, []);

  const changeModel = useCallback((model: string) => {
    setSelectedModel(model);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedModel,
        changeModel,
        ollamaModels,
        getOllamaModels,
        isLoading,
        error,
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
