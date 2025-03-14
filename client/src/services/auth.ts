"use server";

import { fetapi } from "@/services/api";
import { RegisterData, RegisterFormData } from "@/types";

type RegisterState = string | null | { error: string };

export const register = async (_: RegisterState, data: RegisterFormData) => {
  try {
    const response = await fetapi.post<RegisterData>("/auth/register", {
      body: data,
    });

    return response.message;
  } catch (error) {
    return {
      error: "Something went wrong. Please try again.",
    };
  }
};
