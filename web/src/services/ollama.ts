import BaseApi from "./baseApi";

const API_URL = "http://localhost:11434";

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

export const chat = async (payload: any) => {
  let result = {};
  try {
    const res = await api.post<any>("/api/chat", payload);
    console.log({ res });

    result = {
      data: res,
    };
  } catch (error) {
    console.error("Error posting data:", error);
    result = {
      error: error,
    };
  }
  return result;
};
