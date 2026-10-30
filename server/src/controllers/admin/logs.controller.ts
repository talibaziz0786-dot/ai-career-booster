import { Request, Response } from "express";
import { logAdminAction } from "../../middleware/admin.middleware.js";
import AdminUsage from "../../models/admin-usage.model.js";

export const getLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const logs = await AdminUsage.find().populate("adminId", "name email").sort({ createdAt: -1 }).limit(100);
    await logAdminAction(req, "settings_updated", "logs", "Viewed logs");
    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch logs" });
  }
};
