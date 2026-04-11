import { Router } from "express";
import { ReviewController } from "./review.controller";
import { ReviewValidation } from "./review.validation";
import validateRequest from "../../middlewares/validateRequest";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

/**
 * --- Get Routes ---
 */
router.get(
  "/",
  checkAuth(Role.USER, Role.ADMIN),
  ReviewController.getAllReviews,
);

// User Interactions
router.post(
  "/",
  checkAuth(Role.USER),
  validateRequest(ReviewValidation.createReviewSchema),
  ReviewController.createReview,
);

router.patch(
  "/:id",
  checkAuth(Role.USER),
  validateRequest(ReviewValidation.updateReviewSchema), // Ensure you use the partial schema
  ReviewController.updateReview,
);

router.post(
  "/:id/like",
  checkAuth(Role.USER, Role.ADMIN),
  ReviewController.toggleLike,
);

router.post(
  "/:id/report",
  checkAuth(Role.USER, Role.ADMIN),
  validateRequest(ReviewValidation.reportReviewSchema),
  ReviewController.reportReview,
);

router.delete(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN),
  ReviewController.deleteReview,
);

// Admin Moderation
router.patch(
  "/:id/status",
  checkAuth(Role.ADMIN),
  validateRequest(ReviewValidation.changeStatusSchema),
  ReviewController.changeStatus,
);

router.get(
  "/reports/queue",
  checkAuth(Role.ADMIN),
  ReviewController.getReports,
);

export const ReviewRoutes = router;
