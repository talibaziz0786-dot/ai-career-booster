import { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";

import { buildResume } from "../services/ai/resume-builder/services/resume-builder-ai.service.js";
import ResumeBuilder from "../models/resume-builder.model.js";


export async function generateResumeController(
 req: AuthRequest,
  res: Response
) {
  try {

    const {

      resumeText,

      language = "english",

    } = req.body;

    if (!resumeText) {

      return res.status(400).json({

        success: false,

        message: "resumeText is required.",

      });

    }

    const result = await buildResume(

req.user?.id as string,

resumeText,

language

);

    return res.json({

      success: true,

      data: result,

    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Resume Builder failed.",

    });

  }

}



export async function getResumeHistoryController(
  req: AuthRequest,
  res: Response
) {
  try {

    const resumes =
      await ResumeBuilder.find({
        user: req.user!.id,
      })
        .sort({
          updatedAt: -1,
        });

    return res.json({
      success: true,
      data: resumes,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
    });

  }
}


export async function getResumeController(
  req: AuthRequest,
  res: Response
) {
  try {

    const resume =
      await ResumeBuilder.findOne({
        _id: req.params.id,
        user: req.user!.id,
      });

    if (!resume) {

      return res.status(404).json({
        success: false,
      });

    }

    return res.json({
      success: true,
      data: resume,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
    });

  }
}


export async function updateResumeController(
  req: AuthRequest,
  res: Response
) {
  try {

    const resume =
      await ResumeBuilder.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user!.id,
        },
        {
          content: req.body,
        },
        {
          new: true,
        }
      );

    return res.json({
      success: true,
      data: resume,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
    });

  }
}