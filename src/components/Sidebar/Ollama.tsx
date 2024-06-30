import React, { useEffect } from "react";
import { useApp } from "@/context/AppContext";

import styles from "@/styles/Sidebar.module.css";

const Ollama: React.FC = () => {
  const { ollamaModels, getOllamaModels, selectedModel, changeModel } =
    useApp();

  useEffect(() => {
    getOllamaModels();
  }, [getOllamaModels]);

  useEffect(() => {
    if (ollamaModels.length > 0) {
      changeModel(ollamaModels[0].name);
    }
  }, [changeModel, ollamaModels]);

  console.log({ selectedModel });

  return (
    <div className={styles.ollama}>
      <h2>Ollama</h2>
      <div className={styles.modelSelector}>
        <label htmlFor="model">Model List</label>
        <select
          id="model"
          name="model"
          value={selectedModel}
          onChange={(e) => changeModel(e.target.value)}
        >
          {ollamaModels.map((model) => {
            return (
              <option key={model.model} value={model.name}>
                {model.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Ollama;
