"use server";

import { cookies, headers } from "next/headers";

import { AuthData, LoginFormData, RegisterFormData } from "@/types";
import { fetapi } from "@/services/api";
import { createUserSession } from "@/lib/session";

type RegisterState = AuthData | null | { error: string };
type LoginState = AuthData | null | { error: string };

export const authError = async (error: unknown) => {
  return {
    error:
      error instanceof Error
        ? error.message
        : "An error occurred. Please try again.",
  };
};

export const authHeaders = async () => {
  return {
    headers: Object.fromEntries((await headers()).entries()),
  };
};

export const register = async (_: RegisterState, data: RegisterFormData) => {
  try {
    const result = await fetapi.post<AuthData>("/auth/register", {
      body: data,
    });

    return result.data;
  } catch (error) {
    return await authError(error);
  }
};

export const login = async (_: LoginState, data: LoginFormData) => {
  try {
    const result = await fetapi.post<AuthData>("/auth/login", {
      body: data,
    });

    // Create the user session by setting the cookie in the browser
    await createUserSession(result.response);

    return result.data;
  } catch (error) {
    return await authError(error);
  }
};

export const logout = async () => {
  try {
    const result = await fetapi.delete<AuthData>(
      "/auth/logout",
      await authHeaders()
    );

    // Clear the cookie in the browser
    (await cookies()).delete("auth_token");
    return result.data;
  } catch (error) {
    return await authError(error);
  }
};
