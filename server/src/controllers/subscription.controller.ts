import type { Request, Response } from "express";
import Subscription from "../models/subscription.model.js";

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
      expiresAt,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentMethod,
      amountPaid,
      currency,
    } = req.body;

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

    subscription.plan = plan;

    subscription.status = "active";

    subscription.expiresAt =
      expiresAt;

    subscription.razorpayOrderId =
      razorpayOrderId;

    subscription.razorpayPaymentId =
      razorpayPaymentId;

    subscription.razorpaySignature =
      razorpaySignature;

    subscription.paymentMethod =
      paymentMethod;

    subscription.amountPaid =
      amountPaid;

    subscription.currency =
      currency;

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