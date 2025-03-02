import { User } from "@/db/models/user";
import { respond } from "@/utils";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  await User.create(req.body);

  respond(
    res,
    {
      success: true,
      message: "User registered successfully",
    },
    201
  );
};

export const login = async (req: Request, res: Response) => {
  res.json({
    message: "Login route",
  });
};

export const logout = async (req: Request, res: Response) => {
  res.json({
    message: "Logout route",
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  res.json({
    message: "Forgot password route",
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  res.json({
    message: "Reset password route",
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  res.json({
    message: "Verify email route",
  });
};
