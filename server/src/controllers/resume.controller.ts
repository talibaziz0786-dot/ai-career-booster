import type { Response } from "express";

import type {
  AuthRequest,
} from "../middleware/auth.middleware.js";

import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../services/resume/resume.service.js";

export async function createResumeController(
  req: AuthRequest,
  res: Response
) {
  const resume = await createResume(
    req.user!.id,
    req.body
  );

  res.status(201).json(resume);
}

export async function getResumesController(
  req: AuthRequest,
  res: Response
) {
  const resumes = await getUserResumes(
    req.user!.id
  );

  res.json(resumes);
}

export async function getResumeController(
  req: AuthRequest,
  res: Response
) {
  const resume = await getResumeById(
    req.user!.id,
    String(req.params.id)
  );

  if (!resume) {
    return res.status(404).json({
      message: "Resume not found",
    });
  }

  res.json(resume);
}

export async function updateResumeController(
  req: AuthRequest,
  res: Response
) {
  const resume = await updateResume(
    req.user!.id,
    String(req.params.id),
    req.body
  );

  if (!resume) {
    return res.status(404).json({
      message: "Resume not found",
    });
  }

  res.json(resume);
}

export async function deleteResumeController(
  req: AuthRequest,
  res: Response
) {
  await deleteResume(
    req.user!.id,
    String(req.params.id)
  );

  res.json({
    success: true,
  });
}