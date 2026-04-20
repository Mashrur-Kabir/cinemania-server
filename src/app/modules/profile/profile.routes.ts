import { Router } from "express";
import { ProfileController } from "./profile.controller";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// User's own dashboard
router.get(
  "/me",
  checkAuth(Role.USER, Role.ADMIN),
  ProfileController.getMyStats,
);

// Restricted Admin dashboard
router.get(
  "/admin/stats",
  checkAuth(Role.ADMIN),
  ProfileController.getAdminDashboard,
);

// User profile (This must come last so it doesn't intercept "/me" or "/admin")
router.get(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN),
  ProfileController.getUserProfile,
);

export const ProfileRoutes = router;
