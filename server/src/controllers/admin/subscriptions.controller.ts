import { Request, Response } from "express";
import { logAdminAction } from "../../middleware/admin.middleware.js";
import Subscription from "../../models/subscription.model.js";

export const getAllSubscriptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const subscriptions = await Subscription.find().populate("user", "name email").sort({ createdAt: -1 });
    await logAdminAction(req, "settings_updated", "subscriptions", "Viewed all subscriptions");
    res.json({ success: true, data: subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch subscriptions" });
  }
};

export const updateSubscriptionPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    const { plan, status } = req.body;

    const sub = await Subscription.findByIdAndUpdate(
      id,
      { $set: { ...(plan && { plan }), ...(status && { status }) } },
      { new: true }
    );

    await logAdminAction(req, "plan_upgraded", id || "plan", `Updated subscription plan to ${plan || 'new status'}`);
    res.json({ success: true, message: "Plan updated successfully", data: sub });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update plan" });
  }
};
