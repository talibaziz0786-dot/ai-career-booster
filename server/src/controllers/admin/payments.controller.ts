import { Request, Response } from "express";
import { logAdminAction } from "../../middleware/admin.middleware.js";
import Subscription from "../../models/subscription.model.js";

export const getAllPayments = async (req: Request, res: Response): Promise<void> => {
  try {
    const subscriptions = await Subscription.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const payments = subscriptions.map((s: any) => ({
      id: s._id.toString(),
      user: s.user ? { name: s.user.name, email: s.user.email } : { name: "Unknown", email: "" },
      amount: s.amount || 999,
      currency: s.currency || "INR",
      status: s.status === "active" ? "success" : (s.status || "success"),
      razorpayPaymentId: s.razorpayPaymentId || "pay_mock123",
      createdAt: s.createdAt
    }));

    await logAdminAction(req, "settings_updated", "payments", "Viewed all payments");
    res.json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch payments" });
  }
};
