interface RequestOptions extends RequestInit {
  headers?: HeadersInit;
  body?: any;
}

class BaseApi {
  private baseURL: string;
  private headers: HeadersInit;

  constructor(baseURL: string, headers: HeadersInit = {}) {
    this.baseURL = baseURL;
    this.headers = headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      } as HeadersInit & { "Content-Type": string },
    };

    if (options.body && typeof options.body === "object") {
      config.body = JSON.stringify(options.body);
      if (!config.headers) {
        config.headers = {};
      }
      (config.headers as Record<string, string>)["Content-Type"] =
        "application/json";
    }

    try {
      const response = await fetch(url, config);
      // console.log("API response:", response);
      const data = await response.json();
      // console.log("API data:", response);

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }
      return data;
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  }

  get<T>(endpoint: string, headers: HeadersInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: "GET",
      headers,
    });
  }

  post<T>(endpoint: string, body: any, headers: HeadersInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      headers,
      body,
    });
  }

  put<T>(endpoint: string, body: any, headers: HeadersInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      headers,
      body,
    });
  }

  delete<T>(endpoint: string, headers: HeadersInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      headers,
    });
  }
}

export default BaseApi;
