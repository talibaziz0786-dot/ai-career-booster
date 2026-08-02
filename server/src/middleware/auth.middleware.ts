import type {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import { User }
from "../models/user.model.js";


interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role?: string;
  };
}


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
        process.env.JWT_SECRET!
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

    req.user = user;

    next();

  } catch (error) {

    return res.status(401).json({
      message:
        "Invalid token",
    });

  }
};