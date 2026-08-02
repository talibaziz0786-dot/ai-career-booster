import type {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import { User }
from "../models/user.model.js";

import { requireEnv }
from "../config/env.js";

import { AppError } from "../utils/errors.js";

interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role?: string;
  };
}


export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  if (req.user?.role !== "admin") {

    return res.status(403).json({
      message: "Admin access required",
    });

  }

  next();
};

export const authMiddleware =
async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {

      return res.status(401).json({
        message:
          "Not authorized",
      });

    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
jwt.verify(
        token,
        requireEnv("JWT_SECRET")
      ) as JwtPayload;

    const user =
      await User.findById(
        decoded.id
      ).select("-password");

    if (!user) {

      return res.status(401).json({
        message:
          "User not found",
      });

    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();

  } catch (error) {

    if (error instanceof jwt.TokenExpiredError) {

      return res.status(401).json({
        message: "Token expired",
      });

    }

    if (error instanceof jwt.JsonWebTokenError) {

      return res.status(401).json({
        message: "Invalid token",
      });

    }

    return next(
      new AppError(
        "Authentication failed",
        500,
        { cause: error }
      )
    );

  }
};