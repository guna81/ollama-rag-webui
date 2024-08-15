import React, { useEffect } from "react";
import { useApp } from "@/context/AppContext";

import styles from "@/styles/Sidebar.module.css";

const ModelSelect: React.FC = () => {
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
    <div className={styles.modelSelector}>
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
  );
};

export default ModelSelect;
