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
  "/admin",
  checkAuth(Role.ADMIN),
  ProfileController.getAdminDashboard,
);

export const ProfileRoutes = router;
