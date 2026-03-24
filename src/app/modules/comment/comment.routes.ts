import { Router } from "express";
import { CommentController } from "./comment.controller";
import { CommentValidation } from "./comment.validation";
import validateRequest from "../../middlewares/validateRequest";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// --- All routes require authentication ---

router.post(
  "/",
  checkAuth(Role.USER, Role.ADMIN),
  validateRequest(CommentValidation.createCommentSchema),
  CommentController.createComment,
);

router.patch(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN),
  validateRequest(CommentValidation.updateCommentSchema),
  CommentController.updateComment,
);

router.delete(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN),
  CommentController.deleteComment,
);

export const CommentRoutes = router;
