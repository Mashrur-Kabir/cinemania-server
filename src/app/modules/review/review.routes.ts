import { Router } from "express";
import { ReviewController } from "./review.controller";
import { ReviewValidation } from "./review.validation";
import validateRequest from "../../middlewares/validateRequest";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";
import { checkAuthOptional } from "../../middlewares/checkAuthOptional";

const router = Router();

// ✅ Static/specific routes FIRST — before any /:id wildcards
router.get(
  "/reports/queue",
  checkAuth(Role.ADMIN),
  ReviewController.getReports,
);

// Admin
router.get(
  "/admin/pending",
  checkAuth(Role.ADMIN),
  ReviewController.getPendingReviews,
);

router.get(
  "/admin/archive",
  checkAuth(Role.ADMIN),
  ReviewController.getAdminArchive,
);

router.get(
  "/archive/my-archive",
  checkAuth(Role.USER),
  ReviewController.getArchivedReviews,
);

router.get("/user/:userId", ReviewController.getApprovedReviews);

// 🔥 PUBLIC FEED (homepage, discovery, etc.)
router.get("/public", ReviewController.getAllApprovedPublicReviews);

// ✅ Require real auth here — no guest access to "my reviews"
router.get(
  "/",
  checkAuth(Role.USER, Role.ADMIN),
  ReviewController.getAllMyReviews,
);

// ✅ Wildcard /:id routes LAST
router.get("/:id", checkAuthOptional(), ReviewController.getSingleReview);

// ... rest of your routes unchanged
router.post(
  "/",
  checkAuth(Role.USER),
  validateRequest(ReviewValidation.createReviewSchema),
  ReviewController.createReview,
);

router.patch(
  "/:id",
  checkAuth(Role.USER),
  validateRequest(ReviewValidation.updateReviewSchema),
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

router.patch(
  "/:id/status",
  checkAuth(Role.ADMIN),
  validateRequest(ReviewValidation.changeStatusSchema),
  ReviewController.changeStatus,
);

export const ReviewRoutes = router;
