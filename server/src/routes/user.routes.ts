import {
  Router,
} from "express";

import {
  createProfile,
  updateProfile,
} from "../controllers/user.controller.js";

import {
  authMiddleware,
} from "../middleware/auth.middleware.js";

/* ==========================================================
   Router
========================================================== */

const router =
  Router();

/* ==========================================================
   Authentication Required
========================================================== */

router.use(
  authMiddleware
);

/* ==========================================================
   Create / Initialize Profile
========================================================== */

router.post(
  "/profile",
  createProfile
);

/* ==========================================================
   Update Profile
========================================================== */

router.put(
  "/profile",
  updateProfile
);

/* ==========================================================
   Export
========================================================== */

export default router;