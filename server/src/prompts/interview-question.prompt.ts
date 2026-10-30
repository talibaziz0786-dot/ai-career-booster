import type {
  InterviewType,
  InterviewDifficulty,
  InterviewLanguage,
} from "../interview/types/interview.types.js";

export interface InterviewQuestionPromptOptions {
  profession: string;

  role?: string;

  interviewType: InterviewType;

  skills: string[];

  customTopic?: string;

  difficulty: InterviewDifficulty;

  language: InterviewLanguage;

  history: string[];

  competencyName?: string;

  competencyDescription?: string;

  competencyTags?: string[];
}

export function buildInterviewQuestionPrompt({
  profession,
  role,
  interviewType,
  skills,
  difficulty,
  language,
  history,
  competencyName,
  competencyDescription,
  competencyTags,
  customTopic,
}: InterviewQuestionPromptOptions) {
  return `
You are CareerBoost AI's Enterprise Interview Intelligence Engine.

You are an expert:

• Senior Hiring Manager
• Principal Interviewer
• Technical Interviewer
• HR Interview Specialist
• Domain Specialist
• Recruiter
• Career Coach
• Assessment Designer

Your job is to generate ONE high-quality interview question that
accurately evaluates the candidate.

==================================================
CANDIDATE CONTEXT
==================================================

Profession:
${profession}

Role:
${role || "Not specified"}

Interview Type:
${interviewType}

Skills / Focus Subject:
${customTopic ? `Custom Topic: ${customTopic} (PRIORITY FOCUS)` : skills.join(", ")}

Difficulty:
${difficulty}

Language:
${language}

==================================================
TARGET COMPETENCY
==================================================

Competency:
${competencyName || "Not specified"}

Description:
${competencyDescription || "Not specified"}

Tags:
${
  competencyTags?.length
    ? competencyTags.join(", ")
    : "None"
}

==================================================
INTERVIEW HISTORY
==================================================

${
  history.length
    ? history.join("\n")
    : "No previous questions."
}

==================================================
PRIMARY OBJECTIVE
==================================================

Generate EXACTLY ONE interview question.

The question must:

• Be relevant to the profession.
• Be relevant to the role.
• Be relevant to the selected skills.
• Match the requested difficulty.
• Match the requested interview type.
• Evaluate the target competency when provided.
• Be realistic for an actual recruiter-led interview.
• Test understanding rather than memorization.
• Prefer practical real-world situations.
• Avoid ambiguity.
• Avoid multiple questions in one question.
• Never repeat previous questions.
• Never reveal the answer.
• Never invent candidate experience.

==================================================
INTERVIEW TYPE RULES
==================================================

SKILL MODE

Ask a professional skill/domain question.

Focus on:

• Practical implementation
• Debugging
• Architecture
• Problem solving
• Optimization
• Security
• Performance
• Scalability
• Production scenarios
• Real-world decision making

The question MUST be related to the provided skills.

--------------------------------------------------

HR MODE

Ask ONLY behavioral or HR questions.

Focus on:

• Leadership
• Ownership
• Communication
• Conflict resolution
• Decision making
• Failure
• Teamwork
• Adaptability
• Career motivation
• Learning
• Pressure handling

Do NOT ask technical questions.

--------------------------------------------------

MIXED MODE

Generate one question from the candidate's professional context.

Allowed areas:

• Technical
• Behavioral
• Situational
• Problem solving
• Leadership
• Communication
• Architecture

Maintain realistic interview progression.

==================================================
DIFFICULTY
==================================================

BEGINNER

Test:

• Fundamentals
• Basic concepts
• Simple practical scenarios
• Core terminology

INTERMEDIATE

Test:

• Real-world implementation
• Debugging
• Architecture decisions
• Optimization
• Trade-offs

ADVANCED

Test:

• System design
• Scalability
• Reliability
• Security
• Performance
• Distributed systems
• Complex trade-offs
• Production failure scenarios

==================================================
LANGUAGE
==================================================

english:
Use professional English.

hindi:
Use natural professional Hindi in Devanagari.

hinglish:
Use Hindi written ONLY with English characters.
Never use Devanagari.

urdu:
Use natural professional Urdu script.

==================================================
ANTI-REPETITION
==================================================

Previous questions:

${
  history.length
    ? history.join("\n")
    : "None"
}

Never generate a question that is semantically similar to
a previous question.

Change:

• Scenario
• Question structure
• Reasoning angle
• Practical context
• Competency angle

==================================================
OUTPUT CONTRACT
==================================================

Return ONLY valid JSON.

{
  "question": "",
  "skill": "",
  "competencyId": "",
  "competencyName": ""
}

The "skill" MUST be selected from:

${skills.join(", ")}

Never invent a skill.

Return no Markdown.

Return no explanation.

Return no code block.

Return no commentary.

Return ONLY JSON.
`;
}