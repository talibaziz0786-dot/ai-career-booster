import bcrypt from "bcryptjs";
import type { Request, Response } from "express";

import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import Subscription from "../models/subscription.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import {
  asyncHandler,
  sendError,
} from "../utils/http-response.js";

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

function sendAuthResponse(
  res: Response,
  user: AuthUser,
  status: number
) {
  return res.status(status).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user.id),
  });
}

export const registerUser = asyncHandler<Request>(
  async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return sendError(
        res,
        400,
        "User already exists"
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const subscription =
      await Subscription.create({
        user: user._id,
      });

    user.subscription = subscription._id;

    await user.save();

    return sendAuthResponse(res, user, 201);
  },
  "Registration failed"
);

export const loginUser = asyncHandler<Request>(
  async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return sendError(
        res,
        401,
        "Invalid credentials"
      );
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return sendError(
        res,
        401,
        "Invalid credentials"
      );
    }

    return sendAuthResponse(res, user, 200);
  },
  "Login failed"
);

export const getMe = async (
  req: AuthRequest,
  res: Response
) => {
  res.status(200).json(req.user);
};
