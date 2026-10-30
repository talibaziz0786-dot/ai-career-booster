import type { Request, Response } from "express";

import Settings from "../models/settings.model.js";

import type { AuthRequest } from "../middleware/auth.middleware.js";

/* ==========================================================\
   Get My Settings
========================================================== */

export const getMySettings = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    let settings = await Settings.findOne({
      user: req.user.id,
    });

    if (!settings) {
      settings = await Settings.create({
        user: req.user.id,
      });
    }

    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch settings.",
    });
  }
};

/* ==========================================================\
   Update My Settings
========================================================== */

export const updateMySettings = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const {
      darkMode,
      sendEmailNotifications,
      sendSMSNotifications,
      profileVisibility,
    } = req.body;

    const settings = await Settings.findOneAndUpdate(
      {
        user: req.user.id,
      },
      {
        darkMode,
        sendEmailNotifications,
        sendSMSNotifications,
        profileVisibility,
      },
      {
        new: true,
      }
    );

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Settings not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      settings,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to update settings.",
    });
  }
};
