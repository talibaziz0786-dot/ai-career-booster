import type {
  Request,
  Response,
} from "express";

import User from "../models/user.model.js";

import Subscription from "../models/subscription.model.js";

import generateToken from "../utils/generateToken.js";

import type {
  AuthRequest,
} from "../middleware/auth.middleware.js";

/* ==========================================================
   Types
========================================================== */

interface AuthResponseUser {
  id: string;

  name: string;

  email: string;

  isProUser: boolean;

  role: string;

  bio: string;

  title: string;

  location: string;

  phone: string;

  github: string;

  linkedin: string;

  portfolio: string;

  avatar: string;
}

/* ==========================================================
   Helpers
========================================================== */

function buildUserResponse(
  user: {
    _id: unknown;

    name: string;

    email: string;

    isProUser: boolean;

    role: string;

    bio?: string;

    title?: string;

    location?: string;

    phone?: string;

    github?: string;

    linkedin?: string;

    portfolio?: string;

    avatar?: string;
  }
): AuthResponseUser & {
  bio: string;
  title: string;
  location: string;
  phone: string;
  github: string;
  linkedin: string;
  portfolio: string;
  avatar: string;
} {
  return {
    id: String(user._id),

    name: user.name,

    email: user.email,

    isProUser:
      user.isProUser,

    role: user.role,

    bio: user.bio ?? "",

    title: user.title ?? "",

    location:
      user.location ?? "",

    phone:
      user.phone ?? "",

    github:
      user.github ?? "",

    linkedin:
      user.linkedin ?? "",

    portfolio:
      user.portfolio ?? "",

    avatar:
      user.avatar ?? "",
  };
}

function normalizeEmail(
  value: unknown
): string | null {
  if (
    typeof value !==
    "string"
  ) {
    return null;
  }

  const email =
    value
      .trim()
      .toLowerCase();

  if (
    !email ||
    email.length > 254
  ) {
    return null;
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !emailPattern.test(
      email
    )
  ) {
    return null;
  }

  return email;
}

/* ==========================================================
   REGISTER
========================================================== */

export const registerUser =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const {
        name,
        email,
        password,
      } = req.body ?? {};

      /* ====================================================
         Validate Name
      ==================================================== */

      if (
        typeof name !==
          "string" ||
        name.trim().length < 2 ||
        name.trim().length > 100
      ) {
        res.status(400).json({
          success: false,

          message:
            "Name must be between 2 and 100 characters.",
        });

        return;
      }

      /* ====================================================
         Validate Email
      ==================================================== */

      const normalizedEmail =
        normalizeEmail(
          email
        );

      if (!normalizedEmail) {
        res.status(400).json({
          success: false,

          message:
            "Please provide a valid email address.",
        });

        return;
      }

      /* ====================================================
         Validate Password
      ==================================================== */

      if (
        typeof password !==
          "string" ||
        password.length < 6 ||
        password.length > 128
      ) {
        res.status(400).json({
          success: false,

          message:
            "Password must be between 6 and 128 characters.",
        });

        return;
      }

      /* ====================================================
         Existing User
      ==================================================== */

      const existingUser =
        await User.exists({
          email:
            normalizedEmail,
        });

      if (existingUser) {
        res.status(409).json({
          success: false,

          message:
            "An account with this email already exists.",
        });

        return;
      }

      /* ====================================================
         Create User
      ==================================================== */

      const user =
        await User.create({
          name:
            name.trim(),

          email:
            normalizedEmail,

          password,

          role: "user",

          isProUser: false,
        });

      /* ====================================================
         Create Default Subscription
      ==================================================== */

      const subscription =
        await Subscription.create({
          user: user._id,
        });

      user.subscription =
        subscription._id;

      /* ====================================================
         Generate Tokens
      ==================================================== */

      const tokens =
        generateToken(
          res,
          user._id.toString()
        );

      user.refreshToken =
        tokens.refreshToken;

      await user.save();

      /* ====================================================
         Response
      ==================================================== */

      res.status(201).json({
        success: true,

        message:
          "Registration successful.",

        user:
          buildUserResponse(
            user
          ),

        token:
          tokens.accessToken,
      });
    } catch (error) {
      console.error(
        "Register error:",
        error instanceof Error
          ? error.message
          : "Unknown error"
      );

      res.status(500).json({
        success: false,

        message:
          "Registration failed.",
      });
    }
  };

/* ==========================================================
   LOGIN
========================================================== */

export const loginUser =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const {
        email,
        password,
      } = req.body ?? {};

      /* ====================================================
         Email
      ==================================================== */

      const normalizedEmail =
        normalizeEmail(
          email
        );

      if (
        !normalizedEmail
      ) {
        res.status(400).json({
          success: false,

          message:
            "Please provide a valid email address.",
        });

        return;
      }

      /* ====================================================
         Password
      ==================================================== */

      if (
        typeof password !==
          "string" ||
        password.length === 0 ||
        password.length > 128
      ) {
        res.status(400).json({
          success: false,

          message:
            "Please provide a valid password.",
        });

        return;
      }

      /* ====================================================
         Find User
      ==================================================== */

      const user =
        await User.findOne({
          email:
            normalizedEmail,
        }).select(
          "+password +refreshToken"
        );

      if (!user) {
        res.status(401).json({
          success: false,

          message:
            "Invalid email or password.",
        });

        return;
      }

      /* ====================================================
         Password Verification
      ==================================================== */

      const passwordMatched =
        await user.comparePassword(
          password
        );

      if (
        !passwordMatched
      ) {
        res.status(401).json({
          success: false,

          message:
            "Invalid email or password.",
        });

        return;
      }

      /* ====================================================
         Generate Tokens
      ==================================================== */

      const tokens =
        generateToken(
          res,
          user._id.toString()
        );

      /* ====================================================
         Rotate Refresh Token
      ==================================================== */

      user.refreshToken =
        tokens.refreshToken;

      await user.save();

      /* ====================================================
         Response
      ==================================================== */

      res.status(200).json({
        success: true,

        message:
          "Login successful.",

        user:
          buildUserResponse(
            user
          ),

        token:
          tokens.accessToken,
      });
    } catch (error) {
      console.error(
        "Login error:",
        error instanceof Error
          ? error.message
          : "Unknown error"
      );

      res.status(500).json({
        success: false,

        message:
          "Login failed.",
      });
    }
  };

/* ==========================================================
   LOGOUT
========================================================== */

export const logoutUser =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const refreshToken =
        req.cookies
          ?.refreshToken;

      if (
        typeof refreshToken ===
        "string" &&
        refreshToken.length > 0
      ) {
        await User.updateOne(
          {
            refreshToken,
          },

          {
            $unset: {
              refreshToken: 1,
            },
          }
        );
      }

      /* ====================================================
         Clear Access Cookie
      ==================================================== */

      res.clearCookie(
        "accessToken",
        {
          httpOnly: true,

          secure:
            process.env.NODE_ENV ===
            "production",

          sameSite:
            "strict",

          path: "/",
        }
      );

      /* ====================================================
         Clear Refresh Cookie
      ==================================================== */

      res.clearCookie(
        "refreshToken",
        {
          httpOnly: true,

          secure:
            process.env.NODE_ENV ===
            "production",

          sameSite:
            "strict",

          path: "/api/auth",
        }
      );

      res.status(200).json({
        success: true,

        message:
          "Logged out successfully.",
      });
    } catch (error) {
      console.error(
        "Logout error:",
        error instanceof Error
          ? error.message
          : "Unknown error"
      );

      res.status(500).json({
        success: false,

        message:
          "Logout failed.",
      });
    }
  };

/* ==========================================================
   GET CURRENT USER
========================================================== */

export const getMe =
  async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const userId =
        req.user?.id;

      if (
        typeof userId !==
          "string" ||
        !userId.trim()
      ) {
        res.status(401).json({
          success: false,

          message:
            "Authentication required.",
        });

        return;
      }

      /* ====================================================
         Find Current User
      ==================================================== */

      const user =
        await User.findById(
          userId
        ).select(
          "-password -refreshToken"
        );

      if (!user) {
        res.status(404).json({
          success: false,

          message:
            "User not found.",
        });

        return;
      }

      /* ====================================================
         Response
      ==================================================== */

      res.status(200).json({
        success: true,

        user:
          buildUserResponse(
            user
          ),
      });
    } catch (error) {
      console.error(
        "Get current user error:",
        error instanceof Error
          ? error.message
          : "Unknown error"
      );

      res.status(500).json({
        success: false,

        message:
          "Unable to fetch user.",
      });
    }
  };