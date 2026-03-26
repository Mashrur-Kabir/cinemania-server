import { Router } from "express";
import { DiscoveryController } from "./discovery.controller";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/",
  checkAuth(Role.USER, Role.ADMIN),
  DiscoveryController.getDiscoveryFeed,
);

export const DiscoveryRoutes = router;
