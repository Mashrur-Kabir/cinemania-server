import express from "express";
import { NotificationController } from "./notification.controller";
import { Role } from "../../../generated/prisma/enums";
import checkAuth from "../../middlewares/authMiddleware";

const router = express.Router();

router.get(
  "/",
  checkAuth(Role.USER, Role.ADMIN),
  NotificationController.getMyNotifications,
);

router.patch(
  "/mark-all-read",
  checkAuth(Role.USER, Role.ADMIN),
  NotificationController.markAllAsRead,
);

router.patch(
  "/:id/read",
  checkAuth(Role.USER, Role.ADMIN),
  NotificationController.markAsRead,
);

export const NotificationRoutes = router;
