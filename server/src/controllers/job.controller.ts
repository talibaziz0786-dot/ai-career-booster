import JobApplication
from "../models/JobApplication.model.js";

import {
  AuthRequest,
}
from "../middleware/auth.middleware.js";

import type { NextFunction, Response }
from "express";

import { AppError } from "../utils/errors.js";

export const createJob =
async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const job =
      await JobApplication.create({

        user:
          req.user?.id,

        company:
          req.body.company,

        role:
          req.body.role,

        status:
          req.body.status,

        notes:
          req.body.notes,
      });

    res.status(201).json({
      success: true,
      job,
    });

  } catch (error) {

    next(
      new AppError(
        "Unable to create job application",
        500,
        { cause: error }
      )
    );

  }

};

export const getJobs =
async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const jobs =
      await JobApplication.find({
        user:
          req.user?.id,
      });

    res.json({
      success: true,
      jobs,
    });

  } catch (error) {

    next(
      new AppError(
        "Unable to fetch job applications",
        500,
        { cause: error }
      )
    );

  }

};

export const deleteJob =
async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const job =
      await JobApplication.findOneAndDelete({
        _id: req.params.id,
        user: req.user?.id,
      });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
    });

  } catch (error) {

    next(
      new AppError(
        "Unable to delete job application",
        500,
        { cause: error }
      )
    );

  }

};

export const updateJob =
async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      company,
      role,
      status,
      notes,
    } = req.body ?? {};

    const job =
      await JobApplication.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user?.id,
        },
        {
          company,
          role,
          status,
          notes,
        },
        {
          new: true,
        }
      );

    if (!job) {

      return res.status(404).json({
        success: false,
        message: "Job not found",
      });

    }

    res.json({
      success: true,
      job,
    });

  } catch (error) {

    next(
      new AppError(
        "Unable to update job application",
        500,
        { cause: error }
      )
    );

  }

};