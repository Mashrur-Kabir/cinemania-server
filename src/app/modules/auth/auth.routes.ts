import { Router } from "express";
import { AuthController } from "./auth.controller";
import { Role } from "../../../generated/prisma/enums";
import checkAuth from "../../middlewares/authMiddleware";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { authRateLimiter, otpRateLimiter } from "../../middlewares/rateLimiter";

const router = Router();

// --- Public Routes ---
router.post(
  "/register",
  authRateLimiter,
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthController.registerUser,
);

router.post(
  "/login",
  authRateLimiter,
  validateRequest(AuthValidation.loginUserValidationSchema),
  AuthController.loginUser,
);

router.post(
  "/verify-email",
  otpRateLimiter,
  validateRequest(AuthValidation.verifyEmailValidationSchema),
  AuthController.verifyEmail,
);

router.post(
  "/resend-otp",
  otpRateLimiter,
  validateRequest(AuthValidation.resendOtpValidationSchema),
  AuthController.resendOTP,
);

router.post(
  "/forget-password",
  authRateLimiter,
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthController.forgetPassword,
);

router.post(
  "/reset-password",
  authRateLimiter,
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthController.resetPassword,
);

// --- OAuth Success Callback ---
router.get("/google/success", AuthController.googleLoginSuccess);

// --- Protected Routes ---
router.get("/me", checkAuth(Role.USER, Role.ADMIN), AuthController.getMe);

router.post(
  "/refresh-token",
  checkAuth(Role.USER, Role.ADMIN),
  AuthController.getNewToken,
);

router.post(
  "/change-password",
  checkAuth(Role.USER, Role.ADMIN),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword,
);

router.post(
  "/logout",
  checkAuth(Role.USER, Role.ADMIN),
  AuthController.logoutUser,
);

export const AuthRoutes = router;
