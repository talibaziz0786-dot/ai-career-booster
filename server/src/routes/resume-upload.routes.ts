import express from "express";

import {
  authMiddleware,
} from "../middleware/auth.middleware.js";

import {
  upload,
} from "../middleware/upload.middleware.js";

import {
  uploadResume,
} from "../controllers/resume-upload.controller.js";

const router =
express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

export default router;