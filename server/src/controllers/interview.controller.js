import { askAI } from "../services/ai/ai-manager.service.js";

export const getQuestion = async (req, res) => {
  try {
    const history = req.body.history || [];
    const skills = req.body.skills || [];
    const language = req.body.language || "english";

    const {
  category,
  difficulty,
  interviewType,
} = req.body;

    const result = await askAI(`
You are a senior technical interviewer.

Interview Type:
${interviewType}

Candidate Skills:
${skills.join(", ")}

Previous Questions:
${history.join("\n")}

Interview Language:
${language}

Difficulty:
${difficulty}

Rules:
-Generate the question
strictly in
${language}
language.
- Ask ONLY one interview question
- Use candidate skills
- Rotate between skills
- Do not repeat previous questions
- Maximum 20 words
- Plain text only
- No markdown
- No explanation
- No answer

INTERVIEW MODE:

1. If interviewType = skill
   - Ask ONLY from selected skills
   - Do NOT ask HR questions
   - Focus on practical and technical concepts

2. If interviewType = hr
   - Ask ONLY HR questions
   - Ignore technical skills completely
   - Focus on communication, teamwork,
      strengths, weaknesses, goals,
      leadership and behavior

3. If interviewType = mixed
   - Alternate between HR and skills
   - Use selected skills for technical questions

   IMPORTANT:

   {
  "question": "generated question",
  "skill": "skill used for this question"
}

The skill must be one from:
${skills.join(", ")}

Do not return plain text.
Do not return markdown.
Only JSON.

If language = hindi
ask question in Hindi.

If language = hinglish
ask question in Hinglish.

If language = urdu
ask question in Urdu.

If language = english
ask question in English.

Previous Questions:
${history.join("\n")}
 
Ask only ONE question.

`);

console.log(
  "AI RESPONSE:",
  result.content
);

const rawText =
  result.content || "";

const jsonMatch =
  rawText.match(
    /\{[\s\S]*\}/
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

res.json({
  success: true,
  provider: result.provider,
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
  req,
  res
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

    const result = await askAI(`
You are a senior FAANG Technical Recruiter and Hiring Manager.

Analyze the candidate interview deeply.

Skills:

${safeSkills.join(", ")}

Questions:

${safeQuestions.join("\n")}

Answers:

${safeAnswers.join("\n")}




Evaluate:

1. Technical Knowledge
2. Communication Skill
3. Confidence Level
4. Problem Solving Ability
5. Industry Readiness

For each answer:

- Check correctness
- Check depth
- Check clarity
- Check practical understanding

Scoring Rules:

0-40 = Poor
41-60 = Average
61-80 = Good
81-100 = Excellent




IMPORTANT:

For every question compare answer with expected industry-standard answer.

Do not reward incorrect answers.

If answer is factually wrong:
technicalScore must decrease.

If answer is unrelated:
overallScore cannot exceed 30.

If answer is accurate and detailed:
increase score accordingly.



If candidate gives only:
"yes"
"no"
"ok"
"xyz"

then

technicalScore <= 20
communicationScore <= 20
confidenceScore <= 20

If answer contains detailed explanation,
examples,
code snippets,
real-world reasoning

then increase score accordingly.

Do NOT give random scores.

Scores must depend on actual answers.

If answer is empty:
technicalScore = 0

If answer is partially correct:
score between 40-70

If answer is detailed and correct:
score between 80-100

Return ONLY raw JSON.

Do not write:       "Here is the result"

Do not write:    "Here's the analysis"

Do not write markdown.



Output must start with {

Output must end with }

Return ONLY valid JSON.

{
  "overallScore": 0,
  "technicalScore": 0,
  "communicationScore": 0,
  "confidenceScore": 0,

  "strengths": [],
  "weaknesses": [],
  "improvements": [],

  "recruiterVerdict": ""
}

Return all feedback in this language:

${language}

Language Rules:

english -> Complete English

hindi -> Complete Hindi

hinglish -> Hindi written in English letters

urdu -> Urdu

If interview language is Urdu,
generate Urdu script.

If interview language is Hinglish,
do not use Hindi script.

Use English alphabet only.

Return strengths, weaknesses,
improvements and recruiterVerdict
in the selected language.

Do not add any extra text.
No markdown.
No explanation.
Only JSON.
`);

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
      /\{[\s\S]*\}/
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



res.json({
  success: true,
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