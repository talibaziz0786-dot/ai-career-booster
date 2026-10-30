import { Request, Response } from "express";
import { logAdminAction } from "../../middleware/admin.middleware.js";
import AdminSettings, { getOrCreateAdminSettings } from "../../models/admin-settings.model.js";

export const getSecuritySettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = await getOrCreateAdminSettings();
    const secObj = settings.security || {};

    const secList = Object.entries(secObj).map(([key, value]) => ({
      id: key,
      name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      description: `Security setting for ${key}`,
      status: typeof value === 'boolean' ? value : true
    }));

    await logAdminAction(req, "settings_updated", "security", "Viewed security settings");
    res.json({ success: true, data: secList });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch security settings" });
  }
};

export const updateSecuritySetting = async (req: Request, res: Response): Promise<void> => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    const { status } = req.body;

    if (id) {
      await AdminSettings.findOneAndUpdate({}, { $set: { ["security." + id]: status } });
    }

    await logAdminAction(req, "settings_updated", "security", `Updated security setting ${id} to ${status}`);
    res.json({ success: true, message: "Security setting updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update security setting" });
  }
};
