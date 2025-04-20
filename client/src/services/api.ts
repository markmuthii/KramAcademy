import { APIError } from "@/types";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005/api/v1";

export class APIClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = BASE_URL, defaultHeaders = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...defaultHeaders,
    };
  }

  async request<T>(
    endppoint: string,
    { method, headers = {}, body = {} }: FetchOptions
  ) {
    const config = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include" as RequestCredentials,
    };

    if (method === "GET") {
      delete config.body;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endppoint}`, config);

      const responseJSON = (await response.json()) as {
        success: boolean;
        data?: T;
        errors?: APIError[];
      };

      if (!responseJSON.success && responseJSON.errors) {
        // Throw an error if the response is not successful
        throw new Error(responseJSON.errors[0].message);
      }

      return { data: responseJSON.data as T, response };
    } catch (e) {
      throw e;
    }
  }

  get<T>(endpoint: string, options: FetchOptions = {}) {
    options.method = "GET";
    return this.request<T>(endpoint, { ...options });
  }

  post<T>(endpoint: string, options: FetchOptions = {}) {
    options.method = "POST";
    return this.request<T>(endpoint, { ...options });
  }

  put<T>(endpoint: string, options: FetchOptions = {}) {
    options.method = "PUT";
    return this.request<T>(endpoint, { ...options });
  }

  delete<T>(endpoint: string, options: FetchOptions = {}) {
    options.method = "DELETE";
    return this.request<T>(endpoint, { ...options });
  }
}

const fetapi = new APIClient();

export { fetapi };
