import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import { User }
from "../models/user.model";

interface JwtPayload {
  id: string;
}

export interface AuthRequest
  extends Request {

  user?: any;
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

console.log("TOKEN:", token);
   console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const decoded =
jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;

      console.log("DECODED:", decoded);

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

     console.log("JWT ERROR:", error);

    return res.status(401).json({
      message:
        "Invalid token",
    });

  }
};