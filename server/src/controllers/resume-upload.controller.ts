import type {
  Request,
  Response,
} from "express";

import fs from "node:fs/promises";

import {
  extractResumeText,
} from "../services/resume-parser.service.js";

export const uploadResume =
  async (
    req: Request,
    res: Response
  ) => {
    const uploadedFile =
      req.file;

    try {
      if (!uploadedFile) {
        return res.status(400).json({
          success: false,
          message:
            "Resume file is required.",
        });
      }

      const resumeText =
        await extractResumeText(
          uploadedFile.path
        );

      if (
        !resumeText ||
        !resumeText.trim()
      ) {
        return res.status(422).json({
          success: false,
          message:
            "Unable to extract readable text from the uploaded resume.",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Resume uploaded and parsed successfully.",
        data: {
          resumeText:
            resumeText.trim(),
          file: {
            originalName:
              uploadedFile.originalname,
            mimeType:
              uploadedFile.mimetype,
            size:
              uploadedFile.size,
          },
        },
      });
    } catch (error) {
      console.error(
        "Resume Upload Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Resume upload or parsing failed.",
      });
    } finally {
      if (uploadedFile?.path) {
        try {
          await fs.unlink(
            uploadedFile.path
          );
        } catch (cleanupError) {
          console.error(
            "Resume temporary file cleanup failed:",
            cleanupError
          );
        }
      }
    }
  };