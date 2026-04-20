import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { Role } from "../../../generated/prisma/enums";
import checkAuth from "../../middlewares/authMiddleware";
import validateRequest from "../../middlewares/validateRequest";
import { PaymentValidation } from "./payment.validation";

const router = Router();

// Route for users to buy a subscription
router.post(
  "/initiate",
  checkAuth(Role.USER, Role.ADMIN),
  validateRequest(PaymentValidation.initiatePaymentSchema),
  PaymentController.initiatePayment,
);

// Get personal billing history
router.get(
  "/my-history",
  checkAuth(Role.USER, Role.ADMIN),
  PaymentController.getMyBillingHistory,
);

// Get subscription summary
router.get(
  "/summary",
  checkAuth(Role.USER, Role.ADMIN),
  PaymentController.getSubscriptionSummary,
);

// 📈 Admin Financial Reports
router.get(
  "/admin/revenue-report",
  checkAuth(Role.ADMIN),
  PaymentController.getRevenueReport,
);

export const PaymentRoutes = router;
