type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
}

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
