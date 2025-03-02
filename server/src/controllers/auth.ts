import { Request, Response } from "express";
import { compare } from "bcrypt";

import { User } from "@/db/models/user";
import { generateJWT, respond, setCookie } from "@/utils";
import { BadRequestError } from "@/errors/bad-request";
import { AUTH_COOKIE_NAME } from "@/constants";

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
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  const passwordsMatch = await compare(req.body.password, user.password);

  if (!passwordsMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  const token = await generateJWT({ _id: user._id as unknown as string });

  setCookie(res, AUTH_COOKIE_NAME!, token);

  let { password, __v, ...userData } = user.toObject();

  respond(res, {
    message: "Login successful",
    user: userData,
  });
};

export const currentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.userID);

  const { password, __v, ...userData } = user!.toObject();

  respond(res, {
    user: userData,
  });
};

export const logout = async (req: Request, res: Response) => {
  respond(res, {
    message: "Logout route",
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  respond(res, {
    message: "Forgot password route",
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  respond(res, {
    message: "Reset password route",
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  respond(res, {
    message: "Verify email route",
  });
};
