import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { MediaRoutes } from "../modules/media/media.routes";
import { GenreRoutes } from "../modules/genre/genre.routes";
import { ReviewRoutes } from "../modules/review/review.routes";
import { CommentRoutes } from "../modules/comment/comment.routes";
import { WatchlistRoutes } from "../modules/watchlist/watchlist.routes";
import { FollowRoutes } from "../modules/follow/follow.routes";
import { WatchedHistoryRoutes } from "../modules/watchedHistory/watchedHistory.routes";
import { ActivityRoutes } from "../modules/activity/activity.routes";
import { NotificationRoutes } from "./../modules/notification/notification.routes";
import { PaymentRoutes } from "../modules/payment/payment.routes";
import { DiscoveryRoutes } from "../modules/discovery/discovery.routes";
import { ProfileRoutes } from "../modules/profile/profile.routes";
import { AchievementRoutes } from "../modules/achievement/achievement.routes";
import { UserRoutes } from "../modules/user/user.routes";

const router = Router();

//auth entry:
router.use("/auth", AuthRoutes);

//user
router.use("/user", UserRoutes);

//media
router.use("/media", MediaRoutes);

//genre
router.use("/genre", GenreRoutes);

//review
router.use("/review", ReviewRoutes);

//comment
router.use("/comment", CommentRoutes);

//watchlist
router.use("/watchlist", WatchlistRoutes);

//follow
router.use("/follow", FollowRoutes);

//watchedHistory
router.use("/watchedHistory", WatchedHistoryRoutes);

//activity
router.use("/activity", ActivityRoutes);

//notification
router.use("/notification", NotificationRoutes);

//payment
router.use("/payment", PaymentRoutes);

//discovery
router.use("/discovery", DiscoveryRoutes);

//profile
router.use("/profile", ProfileRoutes);

//achievements
router.use("/achievement", AchievementRoutes);

export const IndexRoutes = router;
