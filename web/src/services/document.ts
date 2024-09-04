import BaseApi from "./baseApi";

const API_URL: string =
  process.env.NEXT_PUBLIC_RAG_API_URL || "http://127.0.0.1:8000";

export const api = new BaseApi(API_URL, {
  // Authorization: "Bearer your-token",
});

export const loadDocuments = async (payload: any) => {
  try {
    console.log({ payload }, typeof payload, Object.keys(payload));

    const data = await api.post<any>("/api/embed-doc/", payload, {
      // "Content-Type": "multipart/form-data",
    });

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);

    return error;
  }
};

export const chat = async (payload: any) => {
  try {
    const data = await api.post<any>("/api/chat/", payload);

    return data;
  } catch (error) {
    console.error("Error posting data:", error);
    return error;
  }
};

// export const askQuestion = async (payload: any) => {
//   try {
//     console.log({ payload });

//     // const response = await api.post<any>("/qa", payload);
//     // console.log("response", response);x
//     const response: any = await fetch(API_URL + "/qa", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });
//     console.log({ response });

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder("utf-8");
//     let done = false;

//     const result = [];
//     while (!done) {
//       const { value, done: readerDone } = await reader.read();
//       done = readerDone;
//       if (value) {
//         const chunk = decoder.decode(value, { stream: true });
//         console.log("json", JSON.parse(chunk));

//         const content = JSON.parse(chunk).content;
//         result.push(content);
//       }
//     }
//     return result;
//   } catch (error) {
//     console.error("Error posting data:", error);
//   }
// };
