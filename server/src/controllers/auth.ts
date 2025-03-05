import { Request, Response } from "express";
import { compare } from "bcrypt";
import crypto from "crypto";

import { User } from "@/db/models/user";
import { clearCookie, generateJWT, respond, setCookie } from "@/utils";
import { BadRequestError } from "@/errors/bad-request";
import { AUTH_COOKIE_NAME, BACKEND_URL } from "@/constants";
import { Email } from "@/providers/Email";

export const register = async (req: Request, res: Response) => {
  // TODO: Use a timebound token (JWT) instead of a static token
  // generate a verification token
  const token = crypto.randomBytes(32).toString("hex");

  // add the token to the request body
  req.body.verificationToken = token;

  await User.create(req.body);

  const email = new Email(req.body.email);

  // TODO: Set the frontend as the email verification link
  email.sendEmailVerification(
    `${BACKEND_URL}/api/v1/auth/verify-email?token=${token}`
  );

  respond(
    res,
    {
      success: true,
      message: "User registered successfully",
    },
    201
  );
};

export const verifyEmail = async (req: Request, res: Response) => {
  // Get the token from the query params
  const { token } = req.query;

  // Find the user with the verification token
  const user = await User.findOne({
    verificationToken: token as string,
  });

  if (!user) {
    throw new BadRequestError("Invalid token");
  }

  // Update the user's verification status
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    emailVerifiedOn: new Date(),
  });

  const email = new Email(user.email);

  email.sendWelcomeEmail();

  respond(res, {
    message: "Email verified successfully",
  });
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

  const { password, __v, ...userData } = user.toObject();

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
  clearCookie(res, AUTH_COOKIE_NAME!);

  respond(res, {
    message: "Logout successful",
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
