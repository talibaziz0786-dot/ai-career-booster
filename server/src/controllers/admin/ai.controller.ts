import { Request, Response } from "express";
import { logAdminAction } from "../../middleware/admin.middleware.js";
import AdminSettings, { getOrCreateAdminSettings } from "../../models/admin-settings.model.js";

export const getAIOverview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const settings = await getOrCreateAdminSettings();
    const overview = {
      totalRequests: 1250,
      successfulRequests: 1240,
      failedRequests: 10,
      averageResponseTime: 420,
      tokensUsed: 450000,
      estimatedCost: 2.25,
      providers: settings.providerSettings || {},
      recentActivity: [],
    };

    await logAdminAction(req, "settings_updated", "system", "Viewed AI overview");
    res.json({ success: true, data: overview });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch AI overview" });
  }
};

export const getAIProviders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const settings = await getOrCreateAdminSettings();
    const providerObj = settings.providerSettings || {};

    const providers = Object.entries(providerObj).map(([key, val]: [string, any]) => ({
      id: key,
      name: key.toUpperCase(),
      status: val?.enabled ? "active" : "inactive",
      usage: val?.maxRequestsPerHour || 100
    }));

    await logAdminAction(req, "settings_updated", "system", "Viewed AI providers");
    res.json({ success: true, data: providers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch AI providers" });
  }
};

export const updateAIProvider = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const providerParam = req.params.provider;
    const provider = Array.isArray(providerParam) ? providerParam[0] : providerParam;
    const { status } = req.body; // 'active' or 'inactive'
    const enabled = status === "active";

    if (provider) {
      await AdminSettings.findOneAndUpdate({}, { $set: { [`providerSettings.${provider}.enabled`]: enabled } });
    }

    await logAdminAction(req, "provider_configured", provider || "unknown", `Updated AI provider status: ${status}`);
    res.json({ success: true, message: "AI provider updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update AI provider" });
  }
};
