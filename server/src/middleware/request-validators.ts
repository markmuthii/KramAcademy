import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { PASSWORD_OPTIONS } from "@/constants";
import { RequestValidationError } from "@/errors/request-validation";

const passwordValidator = [
  body("password")
    .isStrongPassword(PASSWORD_OPTIONS)
    .withMessage(
      "Password is weak. It should have at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol."
    ),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    })
    .withMessage("Passwords do not match."),
];

export const registrationValidator = [
  body(["firstName", "lastName"])
    .isString()
    .notEmpty()
    .withMessage(
      (value, { path, req }) =>
        `${path === "firstName" ? "First Name" : "Last Name"} is required.`
    ),
  body("email").isEmail().withMessage("Email is invalid."),
  body("phone").isMobilePhone("en-KE").withMessage("Phone number is invalid."),
  body("username").isString().notEmpty().withMessage("Username is required."),
  ...passwordValidator,
];

export const loginValidator = [
  body("email").isEmail().withMessage("Email is invalid."),
  body("password").notEmpty().withMessage("Password is required."),
];

export const passwordResetValidator = [...passwordValidator];

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
