import { Router } from "express";

import {
  createJob,
  getJobs,
  getJob,
  getJobStats,
  updateJob,
  deleteJob,
  updateJobStatus,
  scheduleInterview,
  addTimelineEvent,
} from "../controllers/job.controller.js";

import {
  authMiddleware,
} from "../middleware/auth.middleware.js";

const router = Router();

/* ==========================================================
   Collection
========================================================== */

router.get("/", authMiddleware, getJobs);
router.get("/all", authMiddleware, getJobs);
router.get("/stats", authMiddleware, getJobStats);

router.post("/", authMiddleware, createJob);
router.post("/create", authMiddleware, createJob);

/* ==========================================================
   Item + nested actions
========================================================== */

router.get("/:id", authMiddleware, getJob);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);

router.patch(
  "/:id/status",
  authMiddleware,
  updateJobStatus
);

router.patch(
  "/:id/interview",
  authMiddleware,
  scheduleInterview
);

router.patch(
  "/:id/timeline",
  authMiddleware,
  addTimelineEvent
);

export default router;
