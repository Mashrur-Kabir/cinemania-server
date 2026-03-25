import { Router } from "express";
import { FollowController } from "./follow.controller";
import { FollowValidation } from "./follow.validation";
import validateRequest from "../../middlewares/validateRequest";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// Publicly viewable follower/following lists
router.get("/:userId/followers", FollowController.getFollowers);
router.get("/:userId/following", FollowController.getFollowing);

// Authenticated interactions
router.get(
  "/:userId/status",
  checkAuth(Role.USER, Role.ADMIN),
  validateRequest(FollowValidation.toggleFollowSchema),
  FollowController.getFollowStatus,
);

router.post(
  "/:userId",
  checkAuth(Role.USER, Role.ADMIN),
  validateRequest(FollowValidation.toggleFollowSchema),
  FollowController.toggleFollow,
);

export const FollowRoutes = router;
