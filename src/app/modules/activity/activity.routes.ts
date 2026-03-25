import { Router } from "express";
import { ActivityController } from "./activity.controller";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";
import validateRequest from "../../middlewares/validateRequest";
import { ActivityValidation } from "./activity.validation";

const router = Router();

router.get(
  "/feed",
  checkAuth(Role.USER, Role.ADMIN),
  validateRequest(ActivityValidation.getFeedSchema),
  ActivityController.getFollowingFeed,
);

export const ActivityRoutes = router;
