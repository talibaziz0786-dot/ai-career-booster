import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";

import { askAI } from "../services/ai/ai-manager.service.js";
import { buildInterviewFeedbackPrompt } from "../prompts/interview-feedback.prompt.js";


export const getQuestion = async (
    req: AuthRequest,
    res: Response
) => {
  try {
    const history = req.body.history || [];
    const skills = req.body.skills || [];
    const language = req.body.language || "english";

    const {
  category,
  difficulty,
  interviewType,
} = req.body;

  const result = await askAI({
  userId: req.user!.id,

  prompt: `
You are an expert Senior Software Engineer, FAANG Interviewer, Staff Engineer and Technical Hiring Manager.

Your responsibility is to conduct a professional mock interview.

====================================
Candidate Information
====================================

Interview Type:
${interviewType}

Candidate Skills:
${skills.join(", ")}

Difficulty:
${difficulty}

Interview Language:
${language}

Previously Asked Questions:
${history.join("\n")}

====================================
Interview Rules
====================================

Generate EXACTLY ONE interview question.

Never generate multiple questions.

Never generate greetings.

Never explain anything.

Never provide hints.

Never provide answers.

Never provide markdown.

Never provide code fences.

Never write paragraphs.

Return ONLY valid JSON.

====================================
Question Rules
====================================

If interviewType = "skill"

• Ask ONLY technical questions.

• Use ONLY candidate skills.

• Focus on practical software engineering.

• Rotate skills naturally.

• Never repeat previous questions.

• Prefer real-world scenarios.

====================================

If interviewType = "hr"

Ignore all technical skills.

Ask ONLY HR questions.

Examples:

Leadership

Conflict Resolution

Communication

Weaknesses

Strengths

Career Goals

Pressure Handling

Decision Making

====================================

If interviewType = "mixed"

Alternate naturally between

Technical

HR

Behavioral

System Design

Problem Solving

====================================

Difficulty Rules

Beginner

Simple concepts

Basic syntax

Definitions

Intermediate

Real-world coding

Architecture

Debugging

Optimization

Advanced

Distributed Systems

Scalability

Performance

System Design

Concurrency

Cloud

Security

====================================

Language Rules

english
Return complete English.

hindi
Return complete Hindi.

hinglish
Use ONLY English alphabet.

Never use Hindi script.

urdu
Return Urdu script.

====================================

JSON Format

Return ONLY this object.

{
  "question":"...",
  "skill":"..."
}

The skill MUST be one of:

${skills.join(", ")}

Do not return anything except JSON.
`,
});

console.log(
  "AI RESPONSE:",
  result.content
);

const rawText =
  result.content || "";

const jsonMatch =
rawText.match(
    /\{[\s\S]*\}/m
);

if (!jsonMatch) {
  throw new Error(
    "No JSON returned"
  );
}

const parsed =
  JSON.parse(
    jsonMatch[0]
  );

return res.json({

success:true,

provider:
result.provider,

model:
result.model ?? null,

question:
parsed.question,

skill:
parsed.skill,

});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate question",
    });
  }
};



export const generateFeedback = async (
    req: AuthRequest,
    res: Response
) => {

  try {

        const {
      questions = [],
      answers = [],
      skills = [],
      language = "english",
    } = req.body;

    const safeSkills =
      Array.isArray(skills)
        ? skills
        : [];

    const safeQuestions =
      Array.isArray(questions)
        ? questions
        : [];

    const safeAnswers =
      Array.isArray(answers)
        ? answers
        : [];

    console.log(
      "QUESTIONS:",
      safeQuestions
    );

    console.log(
      "ANSWERS:",
      safeAnswers
    );

    console.log(
      "SKILLS:",
      safeSkills
    );
const prompt = buildInterviewFeedbackPrompt({
  questions: safeQuestions,
  answers: safeAnswers,
  skills: safeSkills,
  language,
});

const result = await askAI({
  userId: req.user!.id,
  prompt,
});

console.log(
  "RAW AI FEEDBACK:",
  result.content
);

 let feedback;

try {

  const rawText =
    result.content || "";

  const jsonMatch =
rawText.match(
    /\{[\s\S]*\}/m
);

  if (!jsonMatch) {
    throw new Error(
      "No JSON found in AI response"
    );
  }

  feedback = JSON.parse(
    jsonMatch[0]
  );

} catch (error) {

  console.error(
    "JSON Parse Failed:",
    result.content
  );

  return res.status(500).json({
    success: false,
    message:
      "AI returned invalid JSON",
  });
}



return res.json({

success:true,

provider:
result.provider,

model:
result.model ?? null,

feedback,

});



  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Feedback generation failed",
    });
  }
};