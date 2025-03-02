import { NextFunction, Request, Response } from "express";

import { AUTH_COOKIE_NAME } from "@/constants";
import { AuthError } from "@/errors/auth";
import { verifyJWT } from "@/utils";

declare global {
  namespace Express {
    interface Request {
      userID?: string;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  if (!token) {
    throw new AuthError();
  }

  const decoded = await verifyJWT(token);

  req.userID = decoded.user._id;

  next();
};
