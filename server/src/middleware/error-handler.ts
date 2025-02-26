import { NextFunction, Request, Response } from "express";
import { CustomError } from "@/errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  res
    .status(err instanceof CustomError ? err.statusCode : 500)
    .json(
      err instanceof CustomError
        ? err.serializeErrors()
        : [{ message: err.message }]
    );
};
