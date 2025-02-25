import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "@/controllers";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.delete("/logout", logout);

authRouter.post("/forgot-password", forgotPassword);

authRouter.post("/reset-password", resetPassword);

authRouter.post("/verify-email", verifyEmail);

export { authRouter };
