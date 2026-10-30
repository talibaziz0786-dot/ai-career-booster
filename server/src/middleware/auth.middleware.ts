import type {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt, {
  type JwtPayload,
} from "jsonwebtoken";

import {
  isValidObjectId,
} from "mongoose";

import User, {
  type UserRole,
} from "../models/user.model.js";

/* ==========================================================
   JWT Payload
========================================================== */

interface AccessTokenPayload
  extends JwtPayload {
  userId: string;
}

/* ==========================================================
   Auth Request
========================================================== */

export interface AuthRequest
  extends Request {
  user?: {
    id: string;

    role: UserRole;
  };
}

/* ==========================================================
   Auth Middleware
========================================================== */

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    /* ======================================================
       Read Authorization Header
    ====================================================== */

    const authHeader =
      req.headers.authorization;

    if (
      typeof authHeader !==
        "string" ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {
      res.status(401).json({
        success: false,

        message:
          "Authorization token missing.",
      });

      return;
    }

    /* ======================================================
       Extract Token
    ====================================================== */

    const token =
      authHeader
        .slice(7)
        .trim();

    if (!token) {
      res.status(401).json({
        success: false,

        message:
          "Authorization token missing.",
      });

      return;
    }

    /* ======================================================
       Access Secret
    ====================================================== */

    const accessSecret =
      process.env.JWT_ACCESS_SECRET;

    if (
      typeof accessSecret !==
        "string" ||
      accessSecret.trim().length < 32
    ) {
      console.error(
        "JWT_ACCESS_SECRET is missing or too weak."
      );

      res.status(500).json({
        success: false,

        message:
          "Authentication service is not configured.",
      });

      return;
    }

    /* ======================================================
       Verify JWT
    ====================================================== */

    const decoded =
      jwt.verify(
        token,
        accessSecret.trim()
      ) as AccessTokenPayload;

    /* ======================================================
       Validate User ID
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
          "Invalid authentication token.",
      });

      return;
    }

    const userId =
      decoded.userId.trim();

    /* ======================================================
       Validate MongoDB ObjectId
    ====================================================== */

    if (
      !isValidObjectId(
        userId
      )
    ) {
      res.status(401).json({
        success: false,

        message:
          "Invalid authentication token.",
      });

      return;
    }

    /* ======================================================
       Find User
    ====================================================== */

    const user =
      await User.findById(
        userId
      )
        .select(
          "_id role"
        )
        .lean();

    if (!user) {
      res.status(401).json({
        success: false,

        message:
          "User not found.",
      });

      return;
    }

    /* ======================================================
       Attach Authenticated User
    ====================================================== */

    req.user = {
      id: String(
        user._id
      ),

      role:
        user.role,
    };

    /* ======================================================
       Continue
    ====================================================== */

    next();
  } catch (error) {
    /* ======================================================
       Expired Token
    ====================================================== */

    if (
      error instanceof
      jwt.TokenExpiredError
    ) {
      res.status(401).json({
        success: false,

        message:
          "Authentication token expired.",
      });

      return;
    }

    /* ======================================================
       Invalid JWT
    ====================================================== */

    if (
      error instanceof
      jwt.JsonWebTokenError
    ) {
      res.status(401).json({
        success: false,

        message:
          "Invalid authentication token.",
      });

      return;
    }

    /* ======================================================
       Unknown Error
    ====================================================== */

    console.error(
      "Authentication middleware error:",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    res.status(500).json({
      success: false,

      message:
        "Authentication service error.",
    });
  }
}