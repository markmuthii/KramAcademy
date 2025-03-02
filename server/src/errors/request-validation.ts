import { CustomError } from "@/errors/custom-error";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Request validation error");
  }

  serializeErrors() {
    const data = this.errors.map((error) =>
      error.type === "field"
        ? {
            message: error.msg,
            field: error.path,
          }
        : {
            message: error.msg,
          }
    );

    return {
      success: false,
      errors: data,
    };
  }
}
