import { Router } from "express";
import { UserController } from "./user.controller";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/analytics",
  checkAuth(Role.ADMIN),
  UserController.getUserAnalytics,
);

router.get("/", checkAuth(Role.ADMIN), UserController.getAllUsers);

router.patch("/:id/role", checkAuth(Role.ADMIN), UserController.changeRole);

router.patch("/:id/status", checkAuth(Role.ADMIN), UserController.toggleStatus);

router.delete("/:id", checkAuth(Role.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
