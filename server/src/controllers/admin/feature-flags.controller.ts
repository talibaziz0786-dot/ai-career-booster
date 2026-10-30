import { Request, Response } from "express";
import { logAdminAction } from "../../middleware/admin.middleware.js";
import AdminSettings, { getOrCreateAdminSettings } from "../../models/admin-settings.model.js";

export const getFeatureFlags = async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = await getOrCreateAdminSettings();
    const flagsObj = settings.featureFlags || {};
    
    const flagList = Object.entries(flagsObj).map(([key, value]) => ({
      id: key,
      name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      description: `Feature flag for ${key}`,
      status: Boolean(value)
    }));

    await logAdminAction(req, "settings_updated", "feature_flags", "Viewed feature flags");
    res.json({ success: true, data: flagList });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch feature flags" });
  }
};

export const updateFeatureFlag = async (req: Request, res: Response): Promise<void> => {
  try {
    const keyParam = req.params.key;
    const key = Array.isArray(keyParam) ? keyParam[0] : keyParam;
    const { status } = req.body;

    if (key) {
      await AdminSettings.findOneAndUpdate({}, { $set: { ["featureFlags." + key]: status } });
    }

    await logAdminAction(req, "feature_flag_updated", key || "unknown", `Updated feature flag ${key} to ${status}`);
    res.json({ success: true, message: "Feature flag updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update feature flag" });
  }
};
