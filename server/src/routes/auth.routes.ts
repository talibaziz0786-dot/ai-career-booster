import {
  Router,
} from "express";

import {
  refreshTokenController,
} from "../controllers/auth/refresh-token.controller.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from "../controllers/auth.controller.js";

import {
  authMiddleware,
} from "../middleware/auth.middleware.js";

/* ==========================================================
   Router
========================================================== */

const router =
  Router();

/* ==========================================================
   Register
========================================================== */

router.post(
  "/register",
  registerUser
);

/* ==========================================================
   Login
========================================================== */

router.post(
  "/login",
  loginUser
);

/* ==========================================================
   Refresh Access Token
========================================================== */

router.post(
  "/refresh",
  refreshTokenController
);

/* ==========================================================
   Current User
========================================================== */

router.get(
  "/me",
  authMiddleware,
  getMe
);

/* ==========================================================
   Logout
========================================================== */

router.post(
  "/logout",
  logoutUser
);

/* ==========================================================
   Export
========================================================== */

export default router;