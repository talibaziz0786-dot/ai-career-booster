import {
  askAI,
} from "../../lib/ai/ai-orchestrator.js";

import LinkedInOptimization from "../../models/linkedin.model.js";

import type {
  LinkedInOptimizeRequest,
  LinkedInOptimizationResult,
  LinkedInProfileInput,
} from "../../types/linkedin/linkedin.types.js";

/* ==========================================================
   LinkedIn Optimizer Service
========================================================== */

function asStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildPrompt(
  profile: LinkedInProfileInput,
  tone: string,
  language: string
): string {
  return `
You are a senior LinkedIn personal branding strategist,
recruiter, and ATS optimization expert.

Optimize the user's LinkedIn profile for the target role.

TONE:
${tone}

LANGUAGE:
${language}

FULL NAME:
${profile.fullName}

CURRENT HEADLINE:
${profile.headline}

CURRENT ROLE:
${profile.currentRole}

YEARS OF EXPERIENCE:
${profile.yearsOfExperience}

LOCATION:
${profile.location}

INDUSTRY:
${profile.industry}

TARGET ROLE:
${profile.targetRole}

ABOUT / SUMMARY:
${profile.summary}

ACHIEVEMENTS:
${profile.achievements.join("\n")}

SKILLS:
${profile.skills.join(", ")}

OPTIMIZATION REQUIREMENTS:

1. Create a concise, high-impact LinkedIn headline.
2. Rewrite the About/summary professionally.
3. Preserve factual information provided by the user.
4. Do not invent companies, titles, achievements, or years.
5. Improve recruiter discoverability with relevant keywords.
6. Keep writing natural and human.
7. Avoid keyword stuffing.
8. Return a realistic profile score from 0 to 100.
9. Return ONLY valid JSON.
10. Do NOT use Markdown or code fences.

RETURN EXACTLY THIS JSON STRUCTURE:

{
  "optimizedHeadline": "",
  "optimizedSummary": "",
  "optimizedSkills": [],
  "recruiterKeywords": [],
  "atsKeywords": [],
  "profileScore": 0,
  "strengths": [],
  "improvements": [],
  "seoSuggestions": [],
  "networkingTips": [],
  "callToAction": ""
}
`;
}

function parseOptimization(
  raw: unknown
): LinkedInOptimizationResult {
  if (!raw || typeof raw !== "object") {
    throw new Error(
      "Invalid LinkedIn optimization response."
    );
  }

  const response = raw as Record<string, unknown>;

  if (
    typeof response.optimizedHeadline !==
      "string" ||
    typeof response.optimizedSummary !==
      "string" ||
    typeof response.profileScore !== "number" ||
    typeof response.callToAction !== "string"
  ) {
    throw new Error(
      "AI returned an incomplete LinkedIn optimization response."
    );
  }

  return {
    optimizedHeadline:
      response.optimizedHeadline.trim(),
    optimizedSummary:
      response.optimizedSummary.trim(),
    optimizedSkills: asStringArray(
      response.optimizedSkills
    ),
    recruiterKeywords: asStringArray(
      response.recruiterKeywords
    ),
    atsKeywords: asStringArray(
      response.atsKeywords
    ),
    profileScore: Math.min(
      100,
      Math.max(
        0,
        Math.round(response.profileScore)
      )
    ),
    strengths: asStringArray(response.strengths),
    improvements: asStringArray(
      response.improvements
    ),
    seoSuggestions: asStringArray(
      response.seoSuggestions
    ),
    networkingTips: asStringArray(
      response.networkingTips
    ),
    callToAction: response.callToAction.trim(),
  };
}

export async function optimizeLinkedInProfile(
  payload: LinkedInOptimizeRequest,
  userId: string
): Promise<LinkedInOptimizationResult> {
  const {
    profile,
    tone = "professional",
    language = "english",
  } = payload;

  const prompt = buildPrompt(
    profile,
    tone,
    language
  );

  const aiResult = await askAI({
    userId,
    prompt,
    module: "linkedin-optimizer",
    enforceQuota: true,
  });

  let parsedResponse: unknown;

  try {
    parsedResponse = JSON.parse(aiResult.content);
  } catch (error) {
    console.error(
      "LinkedIn AI JSON Parse Error:",
      error
    );

    throw new Error(
      "AI returned an invalid LinkedIn optimization response."
    );
  }

  const optimization =
    parseOptimization(parsedResponse);

  await LinkedInOptimization.create({
    user: userId,
    profile,
    optimization: {
      ...optimization,
      provider: aiResult.provider,
      model: aiResult.model,
    },
  });

  return optimization;
}

export async function getLinkedInHistory(
  userId: string
) {
  const docs = await LinkedInOptimization.find({
    user: userId,
  })
    .sort({ createdAt: -1 })
    .lean();

  return docs.map((doc) => ({
    id: doc._id.toString(),
    profile: doc.profile,
    optimization: doc.optimization,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }));
}

export async function deleteLinkedInHistory(
  userId: string,
  id: string
) {
  const deleted =
    await LinkedInOptimization.findOneAndDelete({
      _id: id,
      user: userId,
    });

  return Boolean(deleted);
}
