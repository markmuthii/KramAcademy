import { Response } from "express";
import { IAPIResponse } from "@/types";

export const respond = <T>(
  res: Response,
  data: T,
  status: number = 200,
  success: boolean = true
) => {
  const response: IAPIResponse<T> = {
    success,
    data,
  };

  return res.status(status).json(response);
};
