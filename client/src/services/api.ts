import { APIError } from "@/types";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005/api/v1";

/*
export const fetchApi = async <T>(
  url: string,
  options: FetchOptions = {
    method: "GET",
  }
) => {
  const { method, headers, body } = options;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (!response.ok) {
    // TODO: Handle errors
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  const responseJSON = (await response.json()) as {
    success: boolean;
    data?: T;
    errors?: {
      [key: string]: string;
    }[];
  };

  if (!responseJSON.success) {
    // TODO: Handle errors
    throw new Error("Something went wrong");
  }

  return responseJSON.data as T;
};
*/

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

    // TODO: Refactor this to return the response instead of the data
    try {
      const response = await fetch(`${this.baseUrl}${endppoint}`, config);

      // TODO: Handle errors from the server

      const responseJSON = (await response.json()) as {
        success: boolean;
        data?: T;
        errors?: APIError[];
      };

      if (!responseJSON.success && responseJSON.errors) {
        // Throw an error if the response is not successful
        throw new Error(responseJSON.errors[0].message);
      }

      return responseJSON.data as T;
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
