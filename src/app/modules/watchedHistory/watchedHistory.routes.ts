import { Router } from "express";
import { WatchedHistoryController } from "./watchedHistory.controller";
import { WatchedHistoryValidation } from "./watchedHistory.validation";
import validateRequest from "../../middlewares/validateRequest";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";
import { checkActiveSubscription } from "../../middlewares/subscriptionMiddleware";

const router = Router();

router.get(
  "/",
  checkAuth(Role.USER, Role.ADMIN),
  WatchedHistoryController.getMyDiary,
);

router.post(
  "/",
  checkAuth(Role.USER, Role.ADMIN),
  checkActiveSubscription,
  validateRequest(WatchedHistoryValidation.logMovieSchema),
  WatchedHistoryController.logMovie,
);

router.get(
  "/stats",
  checkAuth(Role.USER, Role.ADMIN),
  WatchedHistoryController.getStats,
);

router.patch(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN),
  validateRequest(WatchedHistoryValidation.updateLogSchema),
  WatchedHistoryController.updateLog,
);

router.delete(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN),
  WatchedHistoryController.deleteLog,
);

export const WatchedHistoryRoutes = router;
