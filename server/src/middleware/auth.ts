import { NextFunction, Request, Response } from "express";

export const requiresAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
