import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .regex(/[A-Za-z]/, "Password must contain at least one letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters"),
    email: z.email("Invalid email address"),
    password: passwordSchema,
    image: z.url().optional().nullable(),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address"),
    password: z.string(),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z
    .object({
      oldPassword: z.string(),
      newPassword: passwordSchema,
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: "New password must be different from the old password",
      path: ["newPassword"],
    }),
});

const verifyEmailValidationSchema = z.object({
  body: z.object({
    email: z.email("Invalid email format"),
    otp: z
      .string()
      .length(6, "OTP must be exactly 6 digits")
      .regex(/^\d+$/, "OTP must only contain numbers"),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.email("Please provide a valid email address"),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.email("Please provide a valid email address"),
    otp: z
      .string()
      .length(6, "OTP must be exactly 6 digits")
      .regex(/^\d+$/, "OTP must only contain numbers"),
    newPassword: passwordSchema,
  }),
});

export const AuthValidation = {
  registerUserValidationSchema,
  loginUserValidationSchema,
  changePasswordValidationSchema,
  verifyEmailValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
