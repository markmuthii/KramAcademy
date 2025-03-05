import { Router } from "express";

import {
  currentUser,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "@/controllers";
import {
  authenticate,
  loginValidator,
  registrationValidator,
  validateRequest,
} from "@/middleware";

const authRouter = Router();

authRouter.post("/register", registrationValidator, validateRequest, register);

authRouter.get("/verify-email", verifyEmail);

authRouter.post("/login", loginValidator, validateRequest, login);

authRouter.get("/me", authenticate, currentUser);

authRouter.delete("/logout", authenticate, logout);

authRouter.post("/forgot-password", forgotPassword);

authRouter.post("/reset-password", resetPassword);

export { authRouter };
