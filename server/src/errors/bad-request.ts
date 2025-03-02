import { CustomError } from "@/errors/custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string = "Bad Request") {
    super(message);
  }

  serializeErrors() {
    return {
      success: false,
      errors: [{ message: this.message }],
    };
  }
}
