/* ==========================================
   Cover Letter Input
========================================== */

export interface CoverLetterInput {
  fullName: string;

  email: string;

  phone: string;

  companyName: string;

  hiringManager: string;

  jobTitle: string;

  experience: string;

  skills: string[];

  achievements: string[];

  projects: string[];

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
   AI Request
========================================== */

export interface GenerateCoverLetterRequest {
  data: CoverLetterInput;
}

/* ==========================================
   AI Result
========================================== */

export interface CoverLetterResult {
  title: string;

  greeting: string;

  introduction: string;

  body: string;

  closing: string;

  signature: string;

  recruiterScore: number;

  atsKeywords: string[];

  improvements: string[];
}

/* ==========================================
   API Response
========================================== */

export interface GenerateCoverLetterResponse {
  success: boolean;

  message: string;

  data: CoverLetterResult;
}

