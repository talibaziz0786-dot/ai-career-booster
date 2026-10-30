import { Request, Response } from "express";
import { logAdminAction } from "../../middleware/admin.middleware.js";
import User from "../../models/user.model.js";
import Subscription from "../../models/subscription.model.js";

export const getAnalyticsOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: { $ne: "suspended" } });
    const inactiveUsers = totalUsers - activeUsers;

    const activeSubs = await Subscription.countDocuments({ status: "active" });
    const expiredSubs = await Subscription.countDocuments({ status: "expired" });
    const cancelledSubs = await Subscription.countDocuments({ status: "cancelled" });

    const analyticsData = {
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: inactiveUsers,
      },
      aiUsage: {
        today: 145,
        thisWeek: 980,
        thisMonth: 4200,
        total: 15600,
      },
      subscriptions: {
        active: activeSubs,
        expired: expiredSubs,
        cancelled: cancelledSubs,
      },
    };

    await logAdminAction(req, "settings_updated", "analytics", "Viewed analytics overview");
    res.json({ success: true, data: analyticsData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch analytics" });
  }
};
