import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware.js";
import User from "../models/user.model.js";
import AdminUsage, { IAdminUsage } from "../models/admin-usage.model.js";

export const requireAdminRole = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }

    const user = await User.findById(req.user.id).select("role").lean();
    
    if (!user || user.role !== "admin") {
      res.status(403).json({ success: false, message: "Admin role required" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logAdminAction = async (
  req: AuthRequest,
  action: IAdminUsage["action"],
  target: string,
  details: string
): Promise<void> => {
  try {
    if (!req.user) return;
    
    await AdminUsage.create({
      adminId: req.user.id,
      action,
      target,
      details,
      ip: req.ip || "unknown"
    });
  } catch (error) {
    console.error("Failed to log admin action:", error);
  }
};