import type {
  Request,
  Response,
} from "express";

import User from "../models/user.model.js";

import type {
  AuthRequest,
} from "../middleware/auth.middleware.js";

/* ==========================================================
   Types
========================================================== */

interface ProfileUpdateBody {
  name?: unknown;

  bio?: unknown;

  title?: unknown;

  location?: unknown;

  phone?: unknown;

  github?: unknown;

  linkedin?: unknown;

  portfolio?: unknown;

  avatar?: unknown;
}

/* ==========================================================
   Allowed Profile Fields
========================================================== */

const PROFILE_FIELDS = [
  "name",
  "bio",
  "title",
  "location",
  "phone",
  "github",
  "linkedin",
  "portfolio",
  "avatar",
] as const;

type ProfileField =
  (typeof PROFILE_FIELDS)[number];

/* ==========================================================
   Limits
========================================================== */

const FIELD_LIMITS: Record<
  ProfileField,
  number
> = {
  name: 100,

  bio: 500,

  title: 100,

  location: 100,

  phone: 30,

  github: 200,

  linkedin: 200,

  portfolio: 200,

  avatar: 500,
};

/* ==========================================================
   URL Fields
========================================================== */

const URL_FIELDS: ProfileField[] = [
  "github",
  "linkedin",
  "portfolio",
  "avatar",
];

/* ==========================================================
   Helpers
========================================================== */

function sanitizeString(
  value: unknown
): string {
  if (
    typeof value !==
    "string"
  ) {
    return "";
  }

  return value.trim();
}

/* ==========================================================
   URL Validation
========================================================== */

function isValidHttpUrl(
  value: string
): boolean {
  if (!value) {
    return true;
  }

  try {
    const normalized =
      /^https?:\/\//i.test(
        value
      )
        ? value
        : `https://${value}`;

    const url =
      new URL(normalized);

    return (
      url.protocol ===
        "http:" ||
      url.protocol ===
        "https:"
    );
  } catch {
    return false;
  }
}

/* ==========================================================
   Build Safe User Response
========================================================== */

export function buildProfileUserResponse(
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
) {
  return {
    id: String(
      user._id
    ),

    name: user.name,

    email: user.email,

    isProUser:
      user.isProUser,

    role: user.role,

    bio:
      user.bio ?? "",

    title:
      user.title ?? "",

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

/* ==========================================================
   Build Profile Update
========================================================== */

function buildProfileUpdate(
  body: ProfileUpdateBody
):
  | {
      update: Partial<
        Record<
          ProfileField,
          string
        >
      >;
      error: string | null;
    } {
  const update: Partial<
    Record<
      ProfileField,
      string
    >
  > = {};

  for (
    const field of PROFILE_FIELDS
  ) {
    if (
      body[field] ===
      undefined
    ) {
      continue;
    }

    const value =
      sanitizeString(
        body[field]
      );

    if (
      value.length >
      FIELD_LIMITS[field]
    ) {
      return {
        update: {},

        error:
          `${field} cannot exceed ${FIELD_LIMITS[field]} characters.`,
      };
    }

    update[field] =
      value;
  }

  /* ========================================================
     Name Validation
  ======================================================== */

  if (
    update.name !==
    undefined
  ) {
    if (
      update.name.length <
      2
    ) {
      return {
        update: {},

        error:
          "Name must contain at least 2 characters.",
      };
    }
  }

  /* ========================================================
     URL Validation
  ======================================================== */

  for (
    const field of URL_FIELDS
  ) {
    const value =
      update[field];

    if (
      value &&
      !isValidHttpUrl(
        value
      )
    ) {
      return {
        update: {},

        error:
          `${field} must be a valid HTTP or HTTPS URL.`,
      };
    }
  }

  return {
    update,

    error: null,
  };
}

/* ==========================================================
   CREATE PROFILE
========================================================== */

export async function createProfile(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const authReq =
      req as AuthRequest;

    const userId =
      authReq.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,

        message:
          "Authentication required.",
      });

      return;
    }

    const {
      update,
      error,
    } =
      buildProfileUpdate(
        req.body as ProfileUpdateBody
      );

    if (error) {
      res.status(400).json({
        success: false,

        message: error,
      });

      return;
    }

    if (
      Object.keys(
        update
      ).length === 0
    ) {
      res.status(400).json({
        success: false,

        message:
          "No profile data was provided.",
      });

      return;
    }

    const updatedUser =
      await User.findByIdAndUpdate(
        userId,
        {
          $set: update,
        },
        {
          new: true,

          runValidators: true,
        }
      ).select(
        "-password -refreshToken"
      );

    if (!updatedUser) {
      res.status(404).json({
        success: false,

        message:
          "User not found.",
      });

      return;
    }

    res.status(200).json({
      success: true,

      message:
        "Profile created successfully.",

      user:
        buildProfileUserResponse(
          updatedUser
        ),
    });
  } catch (error) {
    console.error(
      "Create Profile Error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        "Unable to create profile.",
    });
  }
}

/* ==========================================================
   UPDATE PROFILE
========================================================== */

export async function updateProfile(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const authReq =
      req as AuthRequest;

    const userId =
      authReq.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,

        message:
          "Authentication required.",
      });

      return;
    }

    /* ======================================================
       Build Safe Update
    ====================================================== */

    const {
      update,
      error,
    } =
      buildProfileUpdate(
        req.body as ProfileUpdateBody
      );

    if (error) {
      res.status(400).json({
        success: false,

        message: error,
      });

      return;
    }

    /* ======================================================
       Prevent Empty Update
    ====================================================== */

    if (
      Object.keys(
        update
      ).length === 0
    ) {
      res.status(400).json({
        success: false,

        message:
          "No profile changes were provided.",
      });

      return;
    }

    /* ======================================================
       Atomic Update
    ====================================================== */

    const updatedUser =
      await User.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          $set: update,
        },
        {
          new: true,

          runValidators: true,

          context: "query",
        }
      ).select(
        "-password -refreshToken"
      );

    if (!updatedUser) {
      res.status(404).json({
        success: false,

        message:
          "User not found.",
      });

      return;
    }

    /* ======================================================
       Response
    ====================================================== */

    res.status(200).json({
      success: true,

      message:
        "Profile updated successfully.",

      user:
        buildProfileUserResponse(
          updatedUser
        ),
    });
  } catch (error) {
    console.error(
      "Update Profile Error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        "Unable to update profile.",
    });
  }
}