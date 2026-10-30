import type {
  Response,
} from "express";

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

// ============================================================
// Interview Types
// ============================================================

type InterviewType =
  | "skill"
  | "hr"
  | "mixed";

type InterviewDifficulty =
  | "beginner"
  | "intermediate"
  | "advanced";

type InterviewLanguage =
  | "english"
  | "hindi"
  | "hinglish"
  | "urdu";

// ============================================================
// Allowed Values
// ============================================================

const INTERVIEW_TYPES:
  readonly InterviewType[] = [
    "skill",
    "hr",
    "mixed",
  ];

const DIFFICULTIES:
  readonly InterviewDifficulty[] = [
    "beginner",
    "intermediate",
    "advanced",
  ];

const LANGUAGES:
  readonly InterviewLanguage[] = [
    "english",
    "hindi",
    "hinglish",
    "urdu",
  ];

// ============================================================
// Type Guards
// ============================================================

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

function isInterviewType(
  value: unknown
): value is InterviewType {
  return (
    isString(value) &&
    INTERVIEW_TYPES.includes(
      value as InterviewType
    )
  );
}

function isDifficulty(
  value: unknown
): value is InterviewDifficulty {
  return (
    isString(value) &&
    DIFFICULTIES.includes(
      value as InterviewDifficulty
    )
  );
}

function isLanguage(
  value: unknown
): value is InterviewLanguage {
  return (
    isString(value) &&
    LANGUAGES.includes(
      value as InterviewLanguage
    )
  );
}

// ============================================================
// History Validation
// ============================================================

function validateHistory(
  value: unknown
): value is InterviewHistoryItem[] {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof item.question ===
        "string" &&
      typeof item.skill ===
        "string" &&
      typeof item.competencyId ===
        "string" &&
      typeof item.competencyName ===
        "string" &&
      typeof item.difficulty ===
        "string" &&
      typeof item.createdAt ===
        "string"
  );
}

// ============================================================
// User ID
// ============================================================

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

  return userId;
}

// ============================================================
// Generate Question
// ============================================================

export const getQuestion =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const userId =
        getUserId(req);

      const {
        profession: rawProfession,

        category,

        role,

        interviewType =
          "skill",

        skills,

        difficulty =
          "intermediate",

        language =
          "english",

        history = [],
      } = req.body ?? {};

      // ======================================================
      // Profession
      // ======================================================

      const profession =
        (
          isString(
            rawProfession
          ) &&
          rawProfession.trim()
        ) ||
        (
          isString(category) &&
          category.trim()
        ) ||
        "Software Engineer";

      // ======================================================
      // Interview Type
      // ======================================================

      if (
        !isInterviewType(
          interviewType
        )
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid interview type.",
        });
      }

      // ======================================================
      // Skills
      // ======================================================

      let parsedSkills:
        string[] = [];

      if (
        isStringArray(skills) &&
        skills.length > 0
      ) {
        parsedSkills =
          skills
            .map(
              (skill) =>
                skill.trim()
            )
            .filter(Boolean);
      }

      if (
        parsedSkills.length === 0
      ) {
        parsedSkills = [
          profession,
        ];
      }

      if (
        parsedSkills.length > 30
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Too many skills provided.",
        });
      }

      // ======================================================
      // Difficulty
      // ======================================================

      if (
        !isDifficulty(
          difficulty
        )
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid interview difficulty.",
        });
      }

      // ======================================================
      // Language
      // ======================================================

      if (
        !isLanguage(language)
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid interview language.",
        });
      }

      // ======================================================
      // History
      // ======================================================

      if (
        !validateHistory(
          history
        )
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid interview history.",
        });
      }

      if (
        history.length > 100
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Interview history is too large.",
        });
      }

      // ======================================================
      // Generate Question
      // ======================================================

      const result =
        await generateInterviewQuestion({
          userId,

          profession,

          role:
            isString(role)
              ? role.trim()
              : undefined,

          interviewType,

          skills:
            parsedSkills,

          difficulty,

          language,

          history,
        });

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
      });
    }
  };

// ============================================================
// Generate Feedback
// ============================================================

export const generateFeedback =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const userId =
        getUserId(req);

      const {
        questions,

        answers,

        skills,

        language =
          "english",

        history,
      } = req.body ?? {};

      // ======================================================
      // Questions
      // ======================================================

      let cleanedQuestions:
        string[] = [];

      if (
        isStringArray(
          questions
        )
      ) {
        cleanedQuestions =
          questions
            .map(
              (question) =>
                question.trim()
            )
            .filter(Boolean);
      } else if (
        Array.isArray(history)
      ) {
        cleanedQuestions =
          history
            .map(
              (item) =>
                typeof item?.question ===
                "string"
                  ? item.question.trim()
                  : ""
            )
            .filter(Boolean);
      }

      // ======================================================
      // Answers
      // ======================================================

      let cleanedAnswers:
        string[] = [];

      if (
        isStringArray(
          answers
        )
      ) {
        cleanedAnswers =
          answers.map(
            (answer) =>
              answer.trim()
          );
      } else if (
        Array.isArray(history)
      ) {
        cleanedAnswers =
          history
            .map(
              (item) =>
                typeof item?.answer ===
                "string"
                  ? item.answer.trim()
                  : ""
            )
            .filter(Boolean);
      }

      // ======================================================
      // Validate
      // ======================================================

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
        });
      }

      if (
        cleanedQuestions.length !==
        cleanedAnswers.length
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Questions and answers must contain the same number of items.",
        });
      }

      if (
        cleanedQuestions.length >
        50
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Too many interview answers submitted.",
        });
      }

      // ======================================================
      // Skills
      // ======================================================

      let cleanedSkills:
        string[] = [];

      if (
        isStringArray(skills) &&
        skills.length > 0
      ) {
        cleanedSkills =
          skills
            .map(
              (skill) =>
                skill.trim()
            )
            .filter(Boolean);
      } else if (
        Array.isArray(history)
      ) {
        cleanedSkills =
          Array.from(
            new Set(
              history
                .map(
                  (item) =>
                    typeof item?.skill ===
                    "string"
                      ? item.skill.trim()
                      : ""
                )
                .filter(Boolean)
            )
          );
      }

      if (
        cleanedSkills.length ===
        0
      ) {
        cleanedSkills = [
          "General",
        ];
      }

      // ======================================================
      // Language
      // ======================================================

      if (
        !isLanguage(language)
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid interview language.",
        });
      }

      // ======================================================
      // Generate Feedback
      // ======================================================

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
      });
    }
  };