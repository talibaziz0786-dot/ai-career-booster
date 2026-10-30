import type { Response } from "express";
import { randomUUID } from "crypto";

import JobApplication, {
  type IJobApplication,
  type JobStatus,
  JOB_STATUSES,
} from "../models/JobApplication.model.js";

import type {
  AuthRequest,
} from "../middleware/auth.middleware.js";

/* ==========================================================
   Serialize
========================================================== */

function toJobItem(job: IJobApplication) {
  return {
    id: job._id.toString(),
    company: job.company,
    position: job.position,
    location: job.location,
    employmentType: job.employmentType,
    workMode: job.workMode,
    priority: job.priority,
    status: job.status,
    salary: job.salary,
    appliedDate: job.appliedDate,
    deadline: job.deadline,
    jobUrl: job.jobUrl,
    description: job.description,
    notes: job.notes,
    interview: job.interview,
    timeline: job.timeline ?? [],
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  };
}

function isJobStatus(
  value: unknown
): value is JobStatus {
  return (
    typeof value === "string" &&
    (JOB_STATUSES as readonly string[]).includes(
      value
    )
  );
}

/* ==========================================================
   Create Job
========================================================== */

export const createJob = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const {
      company,
      position,
      location,
      employmentType,
      workMode,
      priority,
      status,
      salary,
      deadline,
      jobUrl,
      description,
      notes,
    } = req.body;

    if (
      !company?.trim() ||
      !position?.trim() ||
      !location?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Company, position, and location are required.",
      });
    }

    const initialStatus: JobStatus =
      isJobStatus(status) ? status : "wishlist";

    const job = await JobApplication.create({
      user: req.user.id,
      company: company.trim(),
      position: position.trim(),
      location: location.trim(),
      employmentType:
        employmentType ?? "full-time",
      workMode: workMode ?? "remote",
      priority: priority ?? "medium",
      status: initialStatus,
      salary,
      appliedDate: new Date().toISOString(),
      deadline,
      jobUrl,
      description,
      notes,
      timeline: [
        {
          id: randomUUID(),
          title: "Job created",
          description:
            "Application added to tracker.",
          status: initialStatus,
          createdAt: new Date().toISOString(),
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully.",
      data: toJobItem(job),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to create job.",
    });
  }
};

/* ==========================================================
   Get All Jobs
========================================================== */

export const getJobs = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const jobs = await JobApplication.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    const data = jobs.map(toJobItem);

    return res.json({
      success: true,
      message: "Jobs fetched successfully.",
      data,
      // Backward-compatible alias for dashboard widget
      jobs: data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch jobs.",
    });
  }
};

/* ==========================================================
   Get Dashboard Stats
========================================================== */

export const getJobStats = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const jobs = await JobApplication.find({
      user: req.user.id,
    }).select("status");

    const stats = {
      total: jobs.length,
      applied: 0,
      interviews: 0,
      offers: 0,
      accepted: 0,
      rejected: 0,
      wishlist: 0,
    };

    for (const job of jobs) {
      switch (job.status) {
        case "wishlist":
          stats.wishlist += 1;
          break;
        case "applied":
        case "screening":
          stats.applied += 1;
          break;
        case "interview":
        case "technical":
        case "hr":
          stats.interviews += 1;
          break;
        case "offer":
          stats.offers += 1;
          break;
        case "accepted":
          stats.accepted += 1;
          break;
        case "rejected":
          stats.rejected += 1;
          break;
      }
    }

    return res.json({
      success: true,
      message: "Job stats fetched successfully.",
      data: stats,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch job stats.",
    });
  }
};

/* ==========================================================
   Get Single Job
========================================================== */

export const getJob = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const job = await JobApplication.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    return res.json({
      success: true,
      message: "Job fetched successfully.",
      data: toJobItem(job),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch job.",
    });
  }
};

/* ==========================================================
   Update Job
========================================================== */

export const updateJob = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const allowedFields = [
      "company",
      "position",
      "location",
      "employmentType",
      "workMode",
      "priority",
      "status",
      "salary",
      "deadline",
      "jobUrl",
      "description",
      "notes",
      "interview",
    ] as const;

    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const job =
      await JobApplication.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.id,
        },
        updates,
        { new: true }
      );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    return res.json({
      success: true,
      message: "Job updated successfully.",
      data: toJobItem(job),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to update job.",
    });
  }
};

/* ==========================================================
   Delete Job
========================================================== */

export const deleteJob = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const job =
      await JobApplication.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
      });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    return res.json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete job.",
    });
  }
};

/* ==========================================================
   Update Status
========================================================== */

export const updateJobStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const { status } = req.body;

    if (!isJobStatus(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job status.",
      });
    }

    const job = await JobApplication.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    job.status = status;
    job.timeline.push({
      id: randomUUID(),
      title: "Status updated",
      description: `Status changed to ${status}.`,
      status,
      createdAt: new Date().toISOString(),
    });

    await job.save();

    return res.json({
      success: true,
      message: "Status updated successfully.",
      data: toJobItem(job),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to update status.",
    });
  }
};

/* ==========================================================
   Schedule Interview
========================================================== */

export const scheduleInterview = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const { interview } = req.body;

    if (
      !interview?.date ||
      !interview?.time
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Interview date and time are required.",
      });
    }

    const job = await JobApplication.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    job.interview = interview;
    job.status = "interview";
    job.timeline.push({
      id: randomUUID(),
      title: "Interview scheduled",
      description: `Interview on ${interview.date} at ${interview.time}.`,
      status: "interview",
      createdAt: new Date().toISOString(),
    });

    await job.save();

    return res.json({
      success: true,
      message: "Interview scheduled successfully.",
      data: toJobItem(job),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to schedule interview.",
    });
  }
};

/* ==========================================================
   Add Timeline Event
========================================================== */

export const addTimelineEvent = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const { timelineItem } = req.body;

    if (
      !timelineItem?.title ||
      !isJobStatus(timelineItem.status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Timeline title and valid status are required.",
      });
    }

    const job = await JobApplication.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    job.timeline.push({
      id: timelineItem.id || randomUUID(),
      title: timelineItem.title,
      description:
        timelineItem.description ?? "",
      status: timelineItem.status,
      createdAt:
        timelineItem.createdAt ||
        new Date().toISOString(),
    });

    await job.save();

    return res.json({
      success: true,
      message: "Timeline event added.",
      data: toJobItem(job),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to add timeline event.",
    });
  }
};
