import BaseApi from "./baseApi";

const API_URL: string = process.env.OLLAMA_API_URL || "http://127.0.0.1:11434";

export const api = new BaseApi(API_URL, {
  // Authorization: "Bearer your-token",
  // "Custom-Header": "custom-value",
});

export const getModelList = async () => {
  let result = {};
  try {
    const data = await api.get<any>("/api/tags");
    console.log(data);

    result = {
      data: data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    result = {
      error: error,
    };
  }
  return result;
};
