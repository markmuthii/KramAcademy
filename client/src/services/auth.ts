"use server";

import { fetapi } from "@/services/api";
import { AuthData, LoginFormData, RegisterFormData } from "@/types";

type RegisterState = string | null | { error: string };
type LoginState = string | null | { error: string };

// TODO: Refactor this to use a single function for both login and register
// and use a type guard to differentiate between the two states.
export const register = async (_: RegisterState, data: RegisterFormData) => {
  try {
    const response = await fetapi.post<AuthData>("/auth/register", {
      body: data,
    });

    return response.message;
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.",
    };
  }
};

export const login = async (_: LoginState, data: LoginFormData) => {
  try {
    const response = await fetapi.post<AuthData>("/auth/login", {
      body: data,
    });

    return response.message;
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.",
    };
  }
};
