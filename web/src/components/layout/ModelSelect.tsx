import React, { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import Form from "react-bootstrap/Form";

import styles from "@/styles/Main.module.css";

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
      <Form.Select
        style={{ width: 320 }}
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
      </Form.Select>
    </div>
  );
};

export default ModelSelect;
