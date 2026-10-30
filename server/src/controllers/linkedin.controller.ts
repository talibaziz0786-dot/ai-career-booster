import type { Response } from "express";

import type {
  AuthRequest,
} from "../middleware/auth.middleware.js";

import {
  optimizeLinkedInProfile,
  getLinkedInHistory,
  deleteLinkedInHistory,
} from "../services/linkedin/linkedin-optimizer.service.js";

import type {
  LinkedInOptimizeRequest,
} from "../types/linkedin/linkedin.types.js";

/* ==========================================================
   LinkedIn Optimizer Controller
========================================================== */

export async function optimizeLinkedInController(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const body =
      req.body as LinkedInOptimizeRequest;

    const profile = body.profile;

    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "Profile payload is required.",
      });
    }

    if (!profile.headline?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Headline is required.",
      });
    }

    if (!profile.summary?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Summary is required.",
      });
    }

    if (!profile.targetRole?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Target role is required.",
      });
    }

    if (!Array.isArray(profile.skills)) {
      return res.status(400).json({
        success: false,
        message: "Skills must be an array.",
      });
    }

    if (!Array.isArray(profile.achievements)) {
      return res.status(400).json({
        success: false,
        message:
          "Achievements must be an array.",
      });
    }

    const result = await optimizeLinkedInProfile(
      {
        profile: {
          fullName: profile.fullName?.trim() || "",
          headline: profile.headline.trim(),
          currentRole:
            profile.currentRole?.trim() || "",
          yearsOfExperience: Number(
            profile.yearsOfExperience ?? 0
          ),
          location: profile.location?.trim() || "",
          skills: profile.skills,
          summary: profile.summary.trim(),
          achievements: profile.achievements,
          targetRole: profile.targetRole.trim(),
          industry: profile.industry?.trim() || "",
        },
        tone: body.tone,
        language: body.language,
      },
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message:
        "LinkedIn profile optimized successfully.",
      data: result,
    });
  } catch (error) {
    console.error(
      "LinkedIn Optimizer Error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to optimize LinkedIn profile.";

    const status =
      message.toLowerCase().includes("quota") ||
      message.toLowerCase().includes("limit")
        ? 429
        : 500;

    return res.status(status).json({
      success: false,
      message,
    });
  }
}

export async function getLinkedInHistoryController(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const history = await getLinkedInHistory(
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "History fetched successfully.",
      data: history,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to load LinkedIn history.",
    });
  }
}

export async function deleteLinkedInHistoryController(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "History id is required.",
      });
    }

    const deleted = await deleteLinkedInHistory(
      req.user.id,
      id
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "History item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "History deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Unable to delete LinkedIn history.",
    });
  }
}

export async function exportLinkedInPdfController(
  _req: AuthRequest,
  res: Response
) {
  return res.status(501).json({
    success: false,
    message:
      "LinkedIn PDF export is not available yet.",
  });
}
