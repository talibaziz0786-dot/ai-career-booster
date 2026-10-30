import type { Response } from "express";

import type {
  AuthRequest,
} from "../middleware/auth.middleware.js";

import type {
  InterviewHistoryItem,
} from "../interview/history/interview-history.types.js";

import {
  generateInterviewQuestion,
} from "../services/ai/interview.service.js";

import {
  generateInterviewFeedback,
} from "../services/ai/interview-feedback.service.js";

import {
  isInterviewType,
  isInterviewDifficulty,
  isInterviewLanguage,
} from "../interview/types/interview.types.js";

import type {
  InterviewType,
  InterviewDifficulty,
  InterviewLanguage,
} from "../interview/types/interview.types.js";

/* =========================================================
   Runtime Limits
========================================================= */

const MAX_SKILLS = 30;

const MAX_HISTORY_ITEMS = 100;

const MAX_FEEDBACK_QUESTIONS = 50;

const MAX_STRING_LENGTH = 500;

/* =========================================================
   Utility Type Guards
========================================================= */

function isString(
  value: unknown
): value is string {
  return typeof value === "string";
}

function isStringArray(
  value: unknown
): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "string"
    )
  );
}

/* =========================================================
   Safe String
========================================================= */

function cleanString(
  value: unknown
): string {
  if (!isString(value)) {
    return "";
  }

  return value
    .trim()
    .slice(0, MAX_STRING_LENGTH);
}

/* =========================================================
   Clean String Array
========================================================= */

function cleanStringArray(
  value: unknown
): string[] {
  if (!isStringArray(value)) {
    return [];
  }

  return [
    ...new Set(
      value
        .map((item) =>
          item.trim()
        )
        .filter(Boolean)
        .map((item) =>
          item.slice(
            0,
            MAX_STRING_LENGTH
          )
        )
    ),
  ];
}

/* =========================================================
   History Validation
========================================================= */

function validateHistory(
  value: unknown
): value is InterviewHistoryItem[] {
  if (!Array.isArray(value)) {
    return false;
  }

  if (
    value.length >
    MAX_HISTORY_ITEMS
  ) {
    return false;
  }

  return value.every(
    (item) => {
      if (
        !item ||
        typeof item !== "object"
      ) {
        return false;
      }

      const historyItem =
        item as Partial<InterviewHistoryItem>;

      return (
        typeof historyItem.question ===
          "string" &&
        typeof historyItem.skill ===
          "string" &&
        typeof historyItem.competencyId ===
          "string" &&
        typeof historyItem.competencyName ===
          "string" &&
        typeof historyItem.difficulty ===
          "string" &&
        isInterviewDifficulty(
          historyItem.difficulty
        ) &&
        typeof historyItem.createdAt ===
          "string"
      );
    }
  );
}

/* =========================================================
   User ID
========================================================= */

function getUserId(
  req: AuthRequest
): string {
  const userId =
    req.user?.id;

  if (
    typeof userId !== "string" ||
    !userId.trim()
  ) {
    throw new Error(
      "Authenticated user ID is missing."
    );
  }

  return userId.trim();
}

/* =========================================================
   Generate Interview Question
========================================================= */

export const getQuestion = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId =
      getUserId(req);

    const body =
      req.body ?? {};

    const rawProfession =
      body.profession;

    const category =
      body.category;

    const role =
      body.role;

    const rawInterviewType =
      body.interviewType ??
      "skill";

    const skills =
      body.skills;

    const rawDifficulty =
      body.difficulty ??
      "intermediate";

    const rawLanguage =
      body.language ??
      "english";

    const history =
      body.history ?? [];

    /* =====================================================
       Profession
    ===================================================== */

    const profession =
      cleanString(
        rawProfession
      ) ||
      cleanString(
        category
      ) ||
      "Software Engineer";

    /* =====================================================
       Role
    ===================================================== */

    const cleanedRole =
      cleanString(role);

    /* =====================================================
       Interview Type
    ===================================================== */

    if (
      !isInterviewType(
        rawInterviewType
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid interview type.",
        code:
          "INVALID_INTERVIEW_TYPE",
      });
    }

    const interviewType:
      InterviewType =
        rawInterviewType;

    /* =====================================================
       Skills
    ===================================================== */

    let parsedSkills =
      cleanStringArray(
        skills
      );

    if (
      parsedSkills.length === 0
    ) {
      parsedSkills = [
        profession,
      ];
    }

    if (
      parsedSkills.length >
      MAX_SKILLS
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Too many skills provided.",
        code:
          "TOO_MANY_SKILLS",
      });
    }

    /* =====================================================
       Difficulty
    ===================================================== */

    if (
      !isInterviewDifficulty(
        rawDifficulty
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid interview difficulty.",
        code:
          "INVALID_INTERVIEW_DIFFICULTY",
      });
    }

    const difficulty:
      InterviewDifficulty =
        rawDifficulty;

    /* =====================================================
       Language
    ===================================================== */

    if (
      !isInterviewLanguage(
        rawLanguage
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid interview language.",
        code:
          "INVALID_INTERVIEW_LANGUAGE",
      });
    }

    const language:
      InterviewLanguage =
        rawLanguage;

    /* =====================================================
       History
    ===================================================== */

    if (
      !validateHistory(
        history
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid interview history.",
        code:
          "INVALID_INTERVIEW_HISTORY",
      });
    }

    /* =====================================================
       AI Question Generation
    ===================================================== */

    const result =
      await generateInterviewQuestion({
        userId,

        profession,

        role:
          cleanedRole ||
          undefined,

        interviewType,

        skills:
          parsedSkills,

        difficulty,

        language,

        history,
      });

    /* =====================================================
       Success
    ===================================================== */

    return res.status(200).json({
      success: true,

      data: result,
    });
  } catch (error) {
    console.error(
      "Interview question generation error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to generate interview question.",

      code:
        "INTERVIEW_QUESTION_GENERATION_FAILED",
    });
  }
};

/* =========================================================
   Generate Interview Feedback
========================================================= */

export const generateFeedback =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const userId =
        getUserId(req);

      const body =
        req.body ?? {};

      const questions =
        body.questions;

      const answers =
        body.answers;

      const skills =
        body.skills;

      const history =
        body.history;

      const rawLanguage =
        body.language ??
        "english";

      /* =====================================================
         Language
      ===================================================== */

      if (
        !isInterviewLanguage(
          rawLanguage
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid interview language.",
          code:
            "INVALID_INTERVIEW_LANGUAGE",
        });
      }

      const language:
        InterviewLanguage =
        rawLanguage;

      /* =====================================================
         Questions
      ===================================================== */

      let cleanedQuestions: string[] =
        [];

      if (
        isStringArray(
          questions
        )
      ) {
        cleanedQuestions =
          questions
            .map((question) =>
              question.trim()
            )
            .filter(Boolean);
      } else if (
        Array.isArray(history)
      ) {
        cleanedQuestions =
          history
            .map((item) =>
              item &&
              typeof item ===
                "object" &&
              typeof item.question ===
                "string"
                ? item.question.trim()
                : ""
            )
            .filter(Boolean);
      }

      /* =====================================================
         Answers
      ===================================================== */

      let cleanedAnswers: string[] =
        [];

      if (
        isStringArray(
          answers
        )
      ) {
        cleanedAnswers =
          answers.map((answer) =>
            answer.trim()
          );
      } else if (
        Array.isArray(history)
      ) {
        cleanedAnswers =
          history
            .map((item) =>
              item &&
              typeof item ===
                "object" &&
              typeof item.answer ===
                "string"
                ? item.answer.trim()
                : ""
            )
            .filter(Boolean);
      }

      /* =====================================================
         Required Data
      ===================================================== */

      if (
        cleanedQuestions.length ===
          0 ||
        cleanedAnswers.length ===
          0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Questions and answers are required.",
          code:
            "QUESTIONS_AND_ANSWERS_REQUIRED",
        });
      }

      /* =====================================================
         Array Length
      ===================================================== */

      if (
        cleanedQuestions.length !==
        cleanedAnswers.length
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Questions and answers must contain the same number of items.",
          code:
            "QUESTION_ANSWER_LENGTH_MISMATCH",
        });
      }

      /* =====================================================
         Feedback Limit
      ===================================================== */

      if (
        cleanedQuestions.length >
        MAX_FEEDBACK_QUESTIONS
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Too many interview answers submitted.",
          code:
            "TOO_MANY_INTERVIEW_ANSWERS",
        });
      }

      /* =====================================================
         Skills
      ===================================================== */

      let cleanedSkills =
        cleanStringArray(
          skills
        );

      if (
        cleanedSkills.length === 0 &&
        Array.isArray(history)
      ) {
        cleanedSkills =
          Array.from(
            new Set(
              history
                .map((item) =>
                  item &&
                  typeof item ===
                    "object" &&
                  typeof item.skill ===
                    "string"
                    ? item.skill.trim()
                    : ""
                )
                .filter(Boolean)
            )
          );
      }

      if (
        cleanedSkills.length === 0
      ) {
        cleanedSkills = [
          "General",
        ];
      }

      if (
        cleanedSkills.length >
        MAX_SKILLS
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Too many skills provided.",
          code:
            "TOO_MANY_SKILLS",
        });
      }

      /* =====================================================
         AI Feedback Generation
      ===================================================== */

      const result =
        await generateInterviewFeedback({
          userId,

          questions:
            cleanedQuestions,

          answers:
            cleanedAnswers,

          skills:
            cleanedSkills,

          language,
        });

      /* =====================================================
         Success
      ===================================================== */

      return res.status(200).json({
        success: true,

        data: result,
      });
    } catch (error) {
      console.error(
        "Interview feedback generation error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Interview feedback generation failed.",

        code:
          "INTERVIEW_FEEDBACK_GENERATION_FAILED",
      });
    }
  };