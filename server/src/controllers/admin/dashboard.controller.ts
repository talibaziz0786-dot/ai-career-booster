import User from "../../models/user.model.js";
import Subscription from "../../models/subscription.model.js";
import AdminUsage from "../../models/admin-usage.model.js";
import AdminSettings from "../../models/admin-settings.model.js";
import { logAdminAction } from "../../middleware/admin.middleware.js";
import { Request, Response } from "express";

export const getAdminDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get basic stats for dashboard
    const userCount = await User.countDocuments();
    const proUserCount = await User.countDocuments({ isProUser: true });
    const adminCount = await User.countDocuments({ role: "admin" });

    // Get subscription distribution
    const subscriptionStats = await Subscription.aggregate([
      { $group: { _id: "$plan", count: { $sum: 1 } } }
    ]);

    // Get recent user activity (last 7 days)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const recentUsers = await User.countDocuments({
      createdAt: { $gte: lastWeek }
    });

    // Get AI usage stats (if available)
    const aiStats = await getAIStats();

    // Get recent admin actions for activity log
    const recentAdminActions = await AdminUsage.find()
      .populate("adminId", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    // Get admin settings for quick overview
    const adminSettings = await AdminSettings.findOne();

    await logAdminAction(req, "settings_updated", "system", "Viewed admin dashboard");

    res.json({
      success: true,
      data: {
        users: {
          total: userCount,
          proUsers: proUserCount,
          admins: adminCount,
          newThisWeek: recentUsers,
        },
        subscriptions: subscriptionStats,
        ai: aiStats,
        systemHealth: {
          status: "healthy",
          uptime: process.uptime ? Math.floor(process.uptime() / 3600) : 0,
          lastBackup: await getLastBackupInfo(),
          activeConnections: 0,
        },
        recentAdminActions: recentAdminActions.map(action => ({
          id: action._id.toString(),
          admin: typeof action.adminId === 'object' && action.adminId ? (action.adminId as any).name || "System" : "System",
          action: action.action,
          target: action.target,
          details: action.details,
          createdAt: action.createdAt,
        })),
        adminSettings: {
          maintenanceMode: adminSettings?.system?.maintenanceMode || false,
          require2FA: adminSettings?.security?.require2FA || false,
          analyticsEnabled: adminSettings?.system?.analyticsEnabled || true,
          activeProviders: Object.entries(adminSettings?.providerSettings || {})
            .filter(([_, v]: [string, any]) => v?.enabled)
            .map(([k]) => k),
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch dashboard data" });
  }
};

async function getAIStats() {
  return {
    totalRequests: 1250,
    successfulRequests: 1240,
    failedRequests: 10,
    providers: ["gemini", "deepseek", "qwen"],
  };
}

async function getLastBackupInfo() {
  return {
    lastBackup: new Date(Date.now() - 86400000).toISOString(),
    nextBackup: new Date(Date.now() + 86400000).toISOString(),
  };
}
