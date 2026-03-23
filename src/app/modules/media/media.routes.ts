import { Router } from "express";
import { MediaController } from "./media.controller";
import { MediaValidation } from "./media.validation";
import validateRequest from "../../middlewares/validateRequest";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";

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

export const MediaRoutes = router;
