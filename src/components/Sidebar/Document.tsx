import React, { useState } from "react";

import styles from "@/styles/Sidebar.module.css";
import { loadDocuments } from "@/services/document";

const Document: React.FC = () => {
  const [files, setFiles] = useState<any>([]);

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleFileUpload = async () => {
    if (files) {
      try {
        const formData = new FormData();
        formData.append("files", files[0]);
        const res = await loadDocuments(formData);
        console.log({ res });
      } catch (error) {
        console.log({ error });
      }
    }
  };

  return (
    <div className={styles.document}>
      <h2>Document</h2>
      <div className={styles.fileUpload}>
        <label htmlFor="file" className={styles.fileDrop}>
          <p>Drag and drop file here</p>
          <input
            className={styles.fileInput}
            type="file"
            id="file"
            onChange={handleFileSelect}
          />
        </label>
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      <DocumentPreview files={files} />
    </div>
  );
};

export default Document;

const DocumentPreview = ({ files }: any) => {
  console.log({ files });

  return (
    <div className={styles.pdfPreview}>
      <h2>PDF Preview</h2>
      {/* <div className={styles.pdfPreviewImage}></div> */}
      <div className={styles.fileInfo}>
        <p>{files[0]?.name}</p>
        {/* <p>Processing document</p> */}
      </div>
    </div>
  );
};
