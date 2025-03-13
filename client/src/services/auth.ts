"use server";

import { RegisterFormData } from "@/types";

export const register = async (_: string | null, data: RegisterFormData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Registering user", data);

  return "User registered";
};
