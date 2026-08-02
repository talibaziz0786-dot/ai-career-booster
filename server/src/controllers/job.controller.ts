import JobApplication from "../models/JobApplication.model.js";

import type { AuthRequest } from "../middleware/auth.middleware.js";

import {
  asyncHandler,
  sendError,
  sendSuccess,
} from "../utils/http-response.js";

export const createJob = asyncHandler<AuthRequest>(
  async (req, res) => {
    const job = await JobApplication.create({
      user: req.user?.id,

      company: req.body.company,

      role: req.body.role,

      status: req.body.status,

      notes: req.body.notes,
    });

    return sendSuccess(
      res,
      {
        job,
      },
      201
    );
  }
);

export const getJobs = asyncHandler<AuthRequest>(
  async (req, res) => {
    const jobs = await JobApplication.find({
      user: req.user?.id,
    });

    return sendSuccess(res, {
      jobs,
    });
  }
);

export const deleteJob = asyncHandler<AuthRequest>(
  async (req, res) => {
    const job =
      await JobApplication.findOneAndDelete({
        _id: req.params.id,
        user: req.user?.id,
      });

    if (!job) {
      return sendError(
        res,
        404,
        "Job not found"
      );
    }

    return sendSuccess(res);
  }
);

export const updateJob = asyncHandler<AuthRequest>(
  async (req, res) => {
    const job =
      await JobApplication.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user?.id,
        },
        req.body,
        {
          new: true,
        }
      );

    if (!job) {
      return sendError(res, 404);
    }

    return sendSuccess(res, {
      job,
    });
  }
);
