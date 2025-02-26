import { StatusCodes } from "http-status-codes";
import { CustomError } from "@/errors/custom-error";

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;

  constructor() {
    super("Route not found");
  }

  serializeErrors() {
    return {
      success: false,
      data: [{ message: "Route not found" }],
    };
  }
}
