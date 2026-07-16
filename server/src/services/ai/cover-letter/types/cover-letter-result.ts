export interface CoverLetterResult {
  companyName: string;

  position: string;

  candidateName: string;

  greeting: string;

  introduction: string;

  experienceSummary: string;

  achievements: string[];

  whyCompany: string;

  valueProposition: string;

  closingParagraph: string;

  closing: string;

  signature: string;

  tone:
    | "professional"
    | "startup"
    | "executive";

  wordCount: number;
}