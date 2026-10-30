import User from "../../models/user.model.js";
import Subscription from "../../models/subscription.model.js";
import { logAdminAction } from "../../middleware/admin.middleware.js";
import { Request, Response } from "express";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search as string;
    const role = req.query.role as string;
    const status = req.query.status as string;

    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }
    if (role) {
      filter.role = role;
    }
    if (status) {
      filter.status = status;
    }

    const users = await User.find(filter)
      .select("-password -refreshToken")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    await logAdminAction(req, "user_updated", "all", `Viewed all users (page ${page})`);

    res.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

export const getUserDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    const user = await User.findById(id).select("-password -refreshToken");
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const subscription = await Subscription.findOne({ user: id });
    const aiUsage = await getUserAIUsage(id);

    await logAdminAction(req, "user_updated", id, `Viewed user details`);

    res.json({
      success: true,
      data: {
        user,
        subscription,
        aiUsage
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch user details" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    const updateData = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).select("-password -refreshToken");

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    await logAdminAction(req, "user_updated", id, `Updated user: ${JSON.stringify(updateData)}`);

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

export const updateUserStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    const { status } = req.body; // 'active' or 'suspended'

    const user = await User.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    ).select("-password -refreshToken");

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    await logAdminAction(req, "user_updated", id, `Updated user status to ${status}`);

    res.json({
      success: true,
      data: user,
      message: `User ${status === "suspended" ? "suspended" : "activated"} successfully`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update user status" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    await User.findByIdAndDelete(id);

    await logAdminAction(req, "user_deleted", id, `Deleted user account`);

    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

async function getUserAIUsage(userId: string) {
  return {
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    total: 0,
  };
}