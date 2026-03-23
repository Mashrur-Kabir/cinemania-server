import { Router } from "express";
import { ReviewController } from "./review.controller";
import { ReviewValidation } from "./review.validation";
import validateRequest from "../../middlewares/validateRequest";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// User Interactions
router.post(
  "/",
  checkAuth(Role.USER),
  validateRequest(ReviewValidation.createReviewSchema),
  ReviewController.createReview,
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
