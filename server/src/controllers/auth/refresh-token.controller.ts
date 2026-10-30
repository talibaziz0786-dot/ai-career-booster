import type {
  Request,
  Response,
} from "express";

import jwt from "jsonwebtoken";

import User from "../../models/user.model.js";

import generateToken from "../../utils/generateToken.js";

/* ==========================================================
   JWT Payload
========================================================== */

interface RefreshTokenPayload {
  userId: string;

  iat?: number;

  exp?: number;
}

/* ==========================================================
   Refresh Secret
========================================================== */

function getRefreshSecret(): string {
  const secret =
    process.env.JWT_REFRESH_SECRET;

  if (
    typeof secret !== "string" ||
    secret.trim().length < 32
  ) {
    throw new Error(
      "JWT_REFRESH_SECRET must be configured with at least 32 characters."
    );
  }

  return secret.trim();
}

/* ==========================================================
   Refresh Token Controller
========================================================== */

export async function refreshTokenController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    /* ======================================================
       Read Refresh Cookie
    ====================================================== */

    const refreshToken =
      req.cookies?.refreshToken;

    if (
      typeof refreshToken !==
        "string" ||
      refreshToken.trim().length ===
        0
    ) {
      res.status(401).json({
        success: false,

        message:
          "Refresh token missing.",
      });

      return;
    }

    /* ======================================================
       Verify JWT
    ====================================================== */

    let decoded: RefreshTokenPayload;

    try {
      decoded =
        jwt.verify(
          refreshToken,
          getRefreshSecret()
        ) as RefreshTokenPayload;
    } catch {
      res.status(401).json({
        success: false,

        message:
          "Invalid or expired refresh token.",
      });

      return;
    }

    /* ======================================================
       Validate Payload
    ====================================================== */

    if (
      typeof decoded.userId !==
        "string" ||
      decoded.userId.trim().length ===
        0
    ) {
      res.status(401).json({
        success: false,

        message:
          "Invalid refresh token.",
      });

      return;
    }

    /* ======================================================
       Find User
    ====================================================== */

    const user =
      await User.findById(
        decoded.userId
      ).select(
        "+refreshToken"
      );

    if (!user) {
      res.status(401).json({
        success: false,

        message:
          "Invalid refresh token.",
      });

      return;
    }

    /* ======================================================
       Validate Stored Refresh Token
    ====================================================== */

    if (
      typeof user.refreshToken !==
        "string" ||
      user.refreshToken !==
        refreshToken
    ) {
      res.status(401).json({
        success: false,

        message:
          "Refresh token is no longer valid.",
      });

      return;
    }

    /* ======================================================
       Rotate Tokens
    ====================================================== */

    const tokens =
      generateToken(
        res,
        user._id.toString()
      );

    /* ======================================================
       Persist New Refresh Token
    ====================================================== */

    user.refreshToken =
      tokens.refreshToken;

    await user.save();

    /* ======================================================
       Response
    ====================================================== */

    res.status(200).json({
      success: true,

      message:
        "Access token refreshed successfully.",

      token:
        tokens.accessToken,
    });
  } catch (error) {
    console.error(
      "Refresh token controller error:",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    res.status(401).json({
      success: false,

      message:
        "Unable to refresh authentication.",
    });
  }
}