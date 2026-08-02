import crypto from "crypto";

import type { Request, Response } from "express";
import Subscription from "../models/subscription.model.js";

import { requireEnv } from "../config/env.js";

import {
  PAID_PLANS,
  isPaidPlan,
} from "../config/plans.js";

function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
) {
  const expected = crypto
    .createHmac(
      "sha256",
      requireEnv("RAZORPAY_KEY_SECRET")
    )
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const expectedBuffer =
    Buffer.from(expected, "utf8");

  const providedBuffer =
    Buffer.from(signature, "utf8");

  return (
    expectedBuffer.length ===
      providedBuffer.length &&
    crypto.timingSafeEqual(
      expectedBuffer,
      providedBuffer
    )
  );
}

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

    if (!isPaidPlan(plan)) {
      return res.status(400).json({
        success: false,
        message: "Unknown plan",
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

    const planDefinition =
      PAID_PLANS[plan];

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

    subscription.expiresAt = new Date(
      Date.now() +
        planDefinition.durationDays *
          24 *
          60 *
          60 *
          1000
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
      planDefinition.amount;

    subscription.currency =
      planDefinition.currency;

    subscription.paymentDate = new Date();

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