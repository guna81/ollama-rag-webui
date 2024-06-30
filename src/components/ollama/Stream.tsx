import React, { useState } from "react";
import axios from "axios";

const StreamComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");

  const startStream = async () => {
    setResults(""); // Clear previous results

    try {
      const response = await axios({
        method: "post",
        url: "https://api.ollama.com/stream",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer YOUR_API_KEY`, // If required
        },
        data: {
          query,
        },
        responseType: "stream",
      });

      const reader = response.data.getReader();
      const decoder = new TextDecoder("utf-8");
      let result;

      while (!(result = await reader.read()).done) {
        const chunk = decoder.decode(result.value, { stream: true });
        setResults((prev) => prev + chunk);
      }
    } catch (error) {
      console.error("Error streaming data:", error);
      setResults("Error streaming data");
    }
  };

  return (
    <div>
      <h1>Ollama API Stream</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query"
      />
      <button onClick={startStream}>Start Stream</button>
      <div id="results">{results}</div>
    </div>
  );
};

export default StreamComponent;
