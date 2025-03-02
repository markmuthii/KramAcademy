import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "@/controllers";
import {
  loginValidator,
  registrationValidator,
  validateRequest,
} from "@/middleware/request-validators";

const authRouter = Router();

authRouter.post("/register", registrationValidator, validateRequest, register);

authRouter.post("/login", loginValidator, validateRequest, login);

authRouter.delete("/logout", logout);

authRouter.post("/forgot-password", forgotPassword);

authRouter.post("/reset-password", resetPassword);

authRouter.post("/verify-email", verifyEmail);

export { authRouter };
