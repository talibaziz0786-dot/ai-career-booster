import type { Request, Response } from "express";
import Subscription from "../models/subscription.model.js";

export const getUsage = async (
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

    const plan = subscription.plan;

    const limits =
      plan === "free"
        ? {
            resume: 5,
            ats: 5,
            interview: 20,
            coverLetter: 5,
          }
        : null;

    return res.json({
      success: true,

      plan,

      status: subscription.status,

      usage: subscription.usage,

      limits,

      trialEnd: subscription.trialEnd,

      expiresAt: subscription.expiresAt,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch usage",
    });
  }
};