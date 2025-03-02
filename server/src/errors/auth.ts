import { CustomError } from "@/errors/custom-error";

export class AuthError extends CustomError {
  statusCode: number;

  constructor(
    public message: string = "Unauthorized",
    public code: number = 401
  ) {
    super(message);
    this.statusCode = code;
  }

  serializeErrors() {
    return {
      success: false,
      errors: [{ message: "Unauthorized" }],
    };
  }
}
