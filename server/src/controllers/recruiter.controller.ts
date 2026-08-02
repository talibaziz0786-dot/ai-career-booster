import type { Request } from "express";

import { runRecruiterSimulation } from "../services/ai/recruiter-simulation.service.js";
import {
  asyncHandler,
  sendError,
  sendSuccess,
} from "../utils/http-response.js";

export const recruiterSimulationController = asyncHandler<Request>(
  async (req, res) => {
    const {
      resumeAnalysis,
      interviewAnalysis,
      careerProfile,
    } = req.body;

    if (
      !resumeAnalysis ||
      !interviewAnalysis ||
      !careerProfile
    ) {
      return sendError(
        res,
        400,
        "Missing required recruiter simulation data."
      );
    }

    const simulation =
      await runRecruiterSimulation({
        resumeAnalysis,
        interviewAnalysis,
        careerProfile,
      });

    return sendSuccess(res, {
      simulation,
    });
  },
  "Recruiter simulation failed."
);
