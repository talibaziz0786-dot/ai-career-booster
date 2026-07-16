import { Request, Response } from "express";

import {
  runRecruiterSimulation,
} from "../services/ai/recruiter-simulation.service.js";

export const recruiterSimulationController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
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
        return res.status(400).json({
          success: false,
          message:
            "Missing required recruiter simulation data.",
        });
      }

      const simulation =
        await runRecruiterSimulation({
          resumeAnalysis,
          interviewAnalysis,
          careerProfile,
        });

      return res.json({
        success: true,
        simulation,
      });

    } catch (error) {

      console.error(
        "Recruiter Simulation Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Recruiter simulation failed.",
      });
    }
  };