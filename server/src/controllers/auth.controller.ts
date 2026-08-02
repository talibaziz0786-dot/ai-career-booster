import bcrypt from "bcryptjs";
import type { Request, Response } from "express";

import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import Subscription from "../models/subscription.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MIN_PASSWORD_LENGTH = 8;

function normalizeCredentials(body: unknown) {
  const { email, password, name } =
    (body ?? {}) as Record<string, unknown>;

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !EMAIL_PATTERN.test(email.trim())
  ) {
    return null;
  }

  return {
    email: email.trim(),
    password,
    name:
      typeof name === "string"
        ? name.trim()
        : "",
  };
}

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const credentials =
      normalizeCredentials(req.body);

    if (
      !credentials ||
      !credentials.name ||
      credentials.password.length <
        MIN_PASSWORD_LENGTH
    ) {
      return res.status(400).json({
        message:
          "Name, a valid email and a password of at least 8 characters are required",
      });
    }

    const { name, email, password } =
      credentials;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

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

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    const credentials =
      normalizeCredentials(req.body);

    if (!credentials) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const { email, password } =
      credentials;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
    });
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response
) => {
  const user = await User.findById(
    req.user!.id
  ).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json(user);
};