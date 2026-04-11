// src/app/modules/achievement/achievement.routes.ts
import { Router } from "express";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";
import { AchievementController } from "./achievement.controller";

const router = Router();

router.get(
  "/",
  checkAuth(Role.USER, Role.ADMIN),
  AchievementController.getAllAchievements,
);

export const AchievementRoutes = router;
