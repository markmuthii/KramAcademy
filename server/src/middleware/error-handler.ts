import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";
import { CustomError } from "@/errors";

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log({ ERROR: err });

  let errors;

  if (err instanceof CustomError) {
    errors = err.serializeErrors();
  } else if (err instanceof mongoose.Error.ValidationError) {
    // This error is thrown when a document is being saved and it fails validation checks eg required
    const error = err.errors[
      Object.keys(err.errors)[0]
    ] as mongoose.Error.ValidatorError;

    errors = [
      {
        message: error.properties.message,
        path: error.path,
      },
    ];
  } else if (err.cause instanceof MongoServerError) {
    // This error is thrown when a document is being saved and it fails a unique constraint check
    errors = [
      {
        message: err.message,
        path: Object.keys(err.cause.keyPattern)[0],
      },
    ];
  } else {
    errors = [
      {
        message: err.message,
      },
    ];
  }

  res
    .status(err instanceof CustomError ? err.statusCode : 500)
    .json(err instanceof CustomError ? errors : { success: false, errors });
};
