






/* ==========================================
   LinkedIn Profile
========================================== */

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

/* ==========================================
   AI Optimization Request
========================================== */

export interface LinkedInOptimizeRequest {
  profile: LinkedInProfileInput;

  tone:
    | "professional"
    | "friendly"
    | "executive";

  language:
    | "english"
    | "hindi"
    | "hinglish";
}

/* ==========================================
   AI Response
========================================== */

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

/* ==========================================
   API Response
========================================== */

export interface LinkedInOptimizeResponse {
  success: boolean;

  message: string;

  data: LinkedInOptimizationResult;
}