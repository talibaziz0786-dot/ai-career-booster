import type {
  Response,
} from "express";

import jwt from "jsonwebtoken";

/* ==========================================================
   Token Configuration
========================================================== */

const ACCESS_TOKEN_EXPIRES_IN =
  "15m";

const REFRESH_TOKEN_EXPIRES_IN =
  "7d";

const ACCESS_COOKIE_MAX_AGE =
  15 * 60 * 1000;

const REFRESH_COOKIE_MAX_AGE =
  7 *
  24 *
  60 *
  60 *
  1000;

/* ==========================================================
   Environment Secret
========================================================== */

function getRequiredSecret(
  name: string
): string {
  const value =
    process.env[name];

  if (
    typeof value !== "string" ||
    value.trim().length < 32
  ) {
    throw new Error(
      `${name} must be configured with at least 32 characters.`
    );
  }

  return value.trim();
}

/* ==========================================================
   Cookie Configuration
========================================================== */

function getCookieOptions() {
  const isProduction =
    process.env.NODE_ENV ===
    "production";

  return {
    httpOnly: true,

    secure: isProduction,

    sameSite:
      "strict" as const,
  };
}

/* ==========================================================
   Generate Authentication Tokens
========================================================== */

const generateToken = (
  res: Response,
  userId: string
) => {
  /* ========================================================
     Validate User ID
  ======================================================== */

  if (
    typeof userId !== "string" ||
    userId.trim().length === 0
  ) {
    throw new Error(
      "User ID is required to generate authentication tokens."
    );
  }

  const normalizedUserId =
    userId.trim();

  /* ========================================================
     Secrets
  ======================================================== */

  const accessSecret =
    getRequiredSecret(
      "JWT_ACCESS_SECRET"
    );

  const refreshSecret =
    getRequiredSecret(
      "JWT_REFRESH_SECRET"
    );

  /* ========================================================
     Access Token
  ======================================================== */

  const accessToken =
    jwt.sign(
      {
        userId:
          normalizedUserId,
      },
      accessSecret,
      {
        expiresIn:
          ACCESS_TOKEN_EXPIRES_IN,
      }
    );

  /* ========================================================
     Refresh Token
  ======================================================== */

  const refreshToken =
    jwt.sign(
      {
        userId:
          normalizedUserId,
      },
      refreshSecret,
      {
        expiresIn:
          REFRESH_TOKEN_EXPIRES_IN,
      }
    );

  /* ========================================================
     Cookie Options
  ======================================================== */

  const cookieOptions =
    getCookieOptions();

  /* ========================================================
     Access Cookie
  ======================================================== */

  res.cookie(
    "accessToken",
    accessToken,
    {
      ...cookieOptions,

      maxAge:
        ACCESS_COOKIE_MAX_AGE,

      path: "/",
    }
  );

  /* ========================================================
     Refresh Cookie
  ======================================================== */

  res.cookie(
    "refreshToken",
    refreshToken,
    {
      ...cookieOptions,

      maxAge:
        REFRESH_COOKIE_MAX_AGE,

      path: "/api/auth",
    }
  );

  /* ========================================================
     Return Tokens
  ======================================================== */

  return {
    accessToken,
    refreshToken,
  };
};

export default generateToken;