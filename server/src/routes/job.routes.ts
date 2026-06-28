import {
  Router,
} from "express";

import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
}
from "../controllers/job.controller";



import {
  authMiddleware,
}
from "../middleware/auth.middleware";

const router =
  Router();

router.post(
  "/create",
  authMiddleware,
  createJob
);

router.get(
  "/all",
  authMiddleware,
  getJobs
);

router.put(
  "/:id",
  authMiddleware,
  updateJob
);

router.delete(
  "/:id",
  authMiddleware,
  deleteJob
);

export default router;