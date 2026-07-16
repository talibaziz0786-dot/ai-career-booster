import JobApplication
from "../models/JobApplication.model.js";

import {
  AuthRequest,
}
from "../middleware/auth.middleware.js";

import { Response }
from "express";

export const createJob =
async (
  req: AuthRequest,
  res: Response
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

    console.error(error);

    res.status(500).json({
      success: false,
    });

  }

};

export const getJobs =
async (
  req: AuthRequest,
  res: Response
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

    console.error(error);

    res.status(500).json({
      success: false,
    });

  }

};

export const deleteJob =
async (
  req: AuthRequest,
  res: Response
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

    console.error(error);

    res.status(500).json({
      success: false,
    });

  }

};

export const updateJob =
async (
  req: AuthRequest,
  res: Response
) => {

  try {

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

      return res.status(404).json({
        success: false,
      });

    }

    res.json({
      success: true,
      job,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
    });

  }

};