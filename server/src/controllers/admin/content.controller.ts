import { Request, Response } from "express";
import { logAdminAction } from "../../middleware/admin.middleware.js";
import Template from "../../models/template.model.js";

export const getAllTemplates = async (req: Request, res: Response): Promise<void> => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });
    const formatted = templates.map((t) => ({
      id: t._id.toString(),
      name: t.name,
      type: t.type,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    }));

    await logAdminAction(req, "settings_updated", "templates", "Viewed templates");
    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch templates" });
  }
};

export const createTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = req.body.name || (req.file ? req.file.originalname : "Default Template");
    const type = req.body.type || "Resume";
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newTemplate = await Template.create({ name, type, fileUrl });

    await logAdminAction(req, "template_created", newTemplate._id.toString(), `Created template: ${name}`);
    res.json({ success: true, message: "Template created successfully", data: newTemplate });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create template" });
  }
};

export const deleteTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    await Template.findByIdAndDelete(id);

    await logAdminAction(req, "template_updated", id || "unknown", "Deleted template");
    res.json({ success: true, message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete template" });
  }
};
