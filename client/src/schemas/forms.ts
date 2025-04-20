import * as z from "zod";

export const registerFormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z.string().regex(/\+254\d\d\d\d\d\d\d\d\d$/i, {
      message: "Please enter a valid phone number.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    // TODO: Fix this. When typing the password, the confirmPassword field should be validated as well.
    if (password !== confirmPassword) {
      ctx.addIssue({
        message: "Passwords do not match.",
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});
