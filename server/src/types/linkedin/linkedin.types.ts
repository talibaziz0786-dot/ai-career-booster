/* ==========================================================
   LinkedIn Optimizer Types
========================================================== */

export interface LinkedInProfileInput {
  fullName: string;
  headline: string;
  currentRole: string;
  yearsOfExperience: number;
  location: string;
  skills: string[];
  summary: string;
  achievements: string[];
  targetRole: string;
  industry: string;
}

export interface LinkedInOptimizeRequest {
  profile: LinkedInProfileInput;
  tone?: "professional" | "friendly" | "executive";
  language?: "english" | "hindi" | "hinglish" | string;
}

export interface LinkedInOptimizationResult {
  optimizedHeadline: string;
  optimizedSummary: string;
  optimizedSkills: string[];
  recruiterKeywords: string[];
  atsKeywords: string[];
  profileScore: number;
  strengths: string[];
  improvements: string[];
  seoSuggestions: string[];
  networkingTips: string[];
  callToAction: string;
}

/** @deprecated Use LinkedInOptimizeRequest */
export type LinkedInOptimizerRequest =
  LinkedInOptimizeRequest;

/** @deprecated Use LinkedInOptimizationResult */
export type LinkedInOptimizerResponse =
  LinkedInOptimizationResult;
