import { Router } from "express";
import { MediaController } from "./media.controller";
import { MediaValidation } from "./media.validation";
import validateRequest from "../../middlewares/validateRequest";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";
import { checkActiveSubscription } from "../../middlewares/subscriptionMiddleware";

const router = Router();

/**
 * --- Public Routes ---
 * Accessible by all users for browsing the portal
 */
router.get("/", MediaController.getAllMedia);
router.get("/:slug", MediaController.getSingleMedia);

/**
 * --- Admin Routes ---
 * Strictly protected for media management
 */
router.post(
  "/",
  checkAuth(Role.ADMIN),
  validateRequest(MediaValidation.createMediaSchema),
  MediaController.createMedia,
);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN),
  validateRequest(MediaValidation.updateMediaSchema),
  MediaController.updateMedia,
);

router.delete("/:id", checkAuth(Role.ADMIN), MediaController.deleteMedia);

/**
 * --- Subscriber Routes ---
 * Only active subscribers can access the actual streaming URL
 */
router.get(
  "/:id/play",
  checkAuth(Role.USER, Role.ADMIN),
  checkActiveSubscription, // The gatekeeper we just built
  MediaController.getMediaStream,
);

export const MediaRoutes = router;
