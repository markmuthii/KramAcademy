import { z } from "zod";
import { registerFormSchema } from "@/schemas/forms";

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export interface APIError {
  message: string;
  field?: string;
  path?: string;
}

export interface APIErrorResponse {
  success: false;
  errors: APIError[];
}

export interface APIResponse<T> {
  success: boolean;
  data: T | T[];
}

export interface RegisterData {
  message: string;
}
