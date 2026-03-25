import { Router } from "express";
import { WatchlistController } from "./watchlist.controller";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";
import { WatchlistValidation } from "./watchlist.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

// --- All routes require authentication ---

router.get(
  "/",
  checkAuth(Role.USER, Role.ADMIN),
  WatchlistController.getMyWatchlist,
);

router.post(
  "/:mediaId",
  checkAuth(Role.USER, Role.ADMIN),
  validateRequest(WatchlistValidation.toggleWatchlistSchema), // Validates the URL param
  WatchlistController.toggleWatchlist,
);

router.delete(
  "/",
  checkAuth(Role.USER, Role.ADMIN),
  WatchlistController.clearWatchlist,
);

router.get(
  "/:mediaId/status",
  checkAuth(Role.USER, Role.ADMIN),
  validateRequest(WatchlistValidation.toggleWatchlistSchema), // Validates the URL param
  WatchlistController.checkWatchlistStatus,
); //Since toggleWatchlistSchema was already defined to validate params.mediaId, we reuse it here. It’s efficient and ensures that every route using :mediaId follows the exact same rules.

export const WatchlistRoutes = router;
