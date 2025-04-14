import { Request, Response } from "express";
import { compare } from "bcrypt";
import crypto from "crypto";

import { User } from "@/db/models/user";
import { clearCookie, generateJWT, respond, setCookie } from "@/utils";
import { BadRequestError } from "@/errors/bad-request";
import { AUTH_COOKIE_NAME, BACKEND_URL } from "@/constants";
import { Email } from "@/providers/Email";
import { Token } from "@/db/models/token";

export const register = async (req: Request, res: Response) => {
  // TODO: Use a timebound token (JWT) instead of a static token
  // generate a verification token
  const token = crypto.randomBytes(32).toString("hex");

  const user = await User.create(req.body);

  const tokenDoc = await Token.create({
    token,
    user: user._id,
    type: "email",
  });

  const email = new Email(req.body.email);

  // TODO: Set the frontend as the email verification link
  const emailResponse = await email.sendEmailVerification(
    `${BACKEND_URL}/api/v1/auth/verify-email?token=${token}`
  );

  console.log({ emailResponse });

  if (!emailResponse || emailResponse.error) {
    // Delete the user and token if the email is not sent
    await User.findByIdAndDelete(user._id);
    await Token.findByIdAndDelete(tokenDoc._id);
    throw new BadRequestError(
      "Verification email not sent. Please register again."
    );
  }

  respond(
    res,
    {
      message:
        "Registration successful. Check your email for verification link.",
    },
    201
  );
};

export const verifyEmail = async (req: Request, res: Response) => {
  // Get the token from the query params
  const { token } = req.query;

  // Find the details of the token
  const tokenDetails = await Token.findOne({
    token,
    type: "email",
    status: "active",
  });

  if (!tokenDetails) {
    throw new BadRequestError("Invalid token");
  }

  // Find the user through the user id in token and update the emailVerifiedOn field
  const updatedUser = await User.findByIdAndUpdate(tokenDetails.user, {
    emailVerifiedOn: new Date(),
  });

  if (!updatedUser) {
    throw new BadRequestError("Invalid token");
  }

  // Set the token status to inactive
  tokenDetails.status = "inactive";

  await tokenDetails.save();

  // Send a welcome email to the user
  const email = new Email(updatedUser.email);

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
  const { email: userEmail } = req.body;

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  const token = crypto.randomBytes(32).toString("hex");

  await Token.create({
    token,
    user: user._id,
    type: "password",
  });

  const email = new Email(user.email);

  // TODO: Set the frontend as the reset password link
  const resetLink = `${BACKEND_URL}/api/v1/auth/reset-password?token=${token}&email=${user.email}`;

  email.sendResetPasswordEmail(resetLink);

  respond(res, {
    message: "Forgot password route",
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, email } = req.query;
  const { password } = req.body;

  const tokenDetails = await Token.findOne({
    token,
    type: "password",
    status: "active",
  }).populate<{
    user: {
      _id: string;
      email: string;
    };
  }>("user", ["email"]);

  if (!tokenDetails || tokenDetails.user.email !== email) {
    throw new BadRequestError("Invalid token");
  }

  await User.findOneAndUpdate(
    {
      email,
    },
    {
      password,
    }
  );

  tokenDetails.status = "inactive";

  await tokenDetails.save();

  respond(res, {
    message: "Reset password route",
  });
};
