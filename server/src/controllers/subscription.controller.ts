import type { AuthRequest } from "../middleware/auth.middleware.js";
import Subscription from "../models/subscription.model.js";
import {
  asyncHandler,
  sendSuccess,
} from "../utils/http-response.js";
import {
  clearDailyUsage,
  findSubscriptionByUser,
  getSubscriptionOr404,
} from "../utils/subscription.util.js";

export const getMySubscription = asyncHandler<AuthRequest>(
  async (req, res) => {
    const subscription =
      await getSubscriptionOr404(
        res,
        req.user!.id
      );

    if (!subscription) {
      return;
    }

    return sendSuccess(res, {
      subscription,
    });
  },
  "Unable to fetch subscription"
);

export const startTrial = asyncHandler<AuthRequest>(
  async (req, res) => {
    const existing =
      await findSubscriptionByUser(
        req.user!.id
      );

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          "Subscription already exists",
      });
    }

    const subscription =
      await Subscription.create({
        user: req.user!.id,
        plan: "trial",
        status: "active",
      });

    return sendSuccess(
      res,
      {
        subscription,
      },
      201
    );
  },
  "Unable to start trial"
);

export const upgradePlan = asyncHandler<AuthRequest>(
  async (req, res) => {
    const {
      plan,
      expiresAt,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentMethod,
      amountPaid,
      currency,
    } = req.body;

    const subscription =
      await getSubscriptionOr404(
        res,
        req.user!.id
      );

    if (!subscription) {
      return;
    }

    subscription.plan = plan;

    subscription.status = "active";

    subscription.expiresAt = expiresAt;

    subscription.razorpayOrderId =
      razorpayOrderId;

    subscription.razorpayPaymentId =
      razorpayPaymentId;

    subscription.razorpaySignature =
      razorpaySignature;

    subscription.paymentMethod =
      paymentMethod;

    subscription.amountPaid = amountPaid;

    subscription.currency = currency;

    await subscription.save();

    return sendSuccess(res, {
      subscription,
    });
  },
  "Unable to upgrade plan"
);

export const cancelSubscription = asyncHandler<AuthRequest>(
  async (req, res) => {
    const subscription =
      await getSubscriptionOr404(
        res,
        req.user!.id
      );

    if (!subscription) {
      return;
    }

    subscription.status = "cancelled";

    await subscription.save();

    return sendSuccess(res, {
      message: "Subscription cancelled",
    });
  },
  "Unable to cancel subscription"
);

export const resetDailyUsage = asyncHandler<AuthRequest>(
  async (req, res) => {
    const subscription =
      await getSubscriptionOr404(
        res,
        req.user!.id
      );

    if (!subscription) {
      return;
    }

    clearDailyUsage(subscription);

    await subscription.save();

    return sendSuccess(res, {
      message:
        "Daily usage reset successfully",
    });
  },
  "Unable to reset usage"
);
