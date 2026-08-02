import type { Request, Response } from "express";
import Subscription from "../models/subscription.model.js";
import {
  getPaidPlan,
  planExpiryDate,
  verifyRazorpaySignature,
} from "../services/payment-verification.service.js";

export const getMySubscription = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user;

    const subscription =
      await Subscription.findOne({
        user: user.id,
      });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    return res.status(200).json({
      success: true,
      subscription,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch subscription",
    });
  }
};

export const startTrial = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user;

    const existing =
      await Subscription.findOne({
        user: user.id,
      });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          "Subscription already exists",
      });
    }

    const subscription =
      await Subscription.create({
        user: user.id,
        plan: "trial",
        status: "active",
      });

    return res.status(201).json({
      success: true,
      subscription,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to start trial",
    });
  }
};

export const upgradePlan = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user;

    const {
      plan,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentMethod,
    } = req.body ?? {};

    const paidPlan = getPaidPlan(plan);

    if (!paidPlan) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan",
      });
    }

    if (
      typeof razorpayOrderId !== "string" ||
      typeof razorpayPaymentId !== "string" ||
      typeof razorpaySignature !== "string" ||
      !verifyRazorpaySignature(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Payment verification failed",
      });
    }

    const alreadyUsed =
      await Subscription.findOne({
        razorpayPaymentId,
      });

    if (alreadyUsed) {
      return res.status(409).json({
        success: false,
        message:
          "Payment already processed",
      });
    }

    const subscription =
      await Subscription.findOne({
        user: user.id,
      });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message:
          "Subscription not found",
      });
    }

    const paymentDate = new Date();

    subscription.plan = paidPlan.id;

    subscription.status = "active";

    subscription.expiresAt =
      planExpiryDate(
        paidPlan,
        paymentDate
      );

    subscription.razorpayOrderId =
      razorpayOrderId;

    subscription.razorpayPaymentId =
      razorpayPaymentId;

    subscription.razorpaySignature =
      razorpaySignature;

    subscription.paymentMethod =
      typeof paymentMethod === "string"
        ? paymentMethod
        : "razorpay";

    subscription.amountPaid =
      paidPlan.price;

    subscription.currency = "INR";

    subscription.paymentDate =
      paymentDate;

    await subscription.save();

    return res.status(200).json({
      success: true,
      subscription,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Unable to upgrade plan",
    });
  }
};

export const cancelSubscription =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const user = (req as any).user;

      const subscription =
        await Subscription.findOne({
          user: user.id,
        });

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message:
            "Subscription not found",
        });
      }

      subscription.status =
        "cancelled";

      await subscription.save();

      return res.status(200).json({
        success: true,
        message:
          "Subscription cancelled",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to cancel subscription",
      });
    }
  };

export const resetDailyUsage =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const user = (req as any).user;

      const subscription =
        await Subscription.findOne({
          user: user.id,
        });

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message:
            "Subscription not found",
        });
      }

      subscription.usage.resumeToday = 0;
      subscription.usage.atsToday = 0;
      subscription.usage.interviewToday = 0;
      subscription.usage.coverLetterToday = 0;

      subscription.usage.lastReset =
        new Date();

      await subscription.save();

      return res.status(200).json({
        success: true,
        message:
          "Daily usage reset successfully",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to reset usage",
      });
    }
  };