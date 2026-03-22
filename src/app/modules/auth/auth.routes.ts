import { Router } from "express";
import { AuthController } from "./auth.controller";
import { Role } from "../../../generated/prisma/enums";
import checkAuth from "../../middlewares/authMiddleware";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();

// --- Public Routes ---
router.post(
  "/register",
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthController.registerUser,
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginUserValidationSchema),
  AuthController.loginUser,
);

router.post(
  "/verify-email",
  validateRequest(AuthValidation.verifyEmailValidationSchema),
  AuthController.verifyEmail,
);

router.post(
  "/forget-password",
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthController.forgetPassword,
);

router.post(
  "/reset-password",
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
