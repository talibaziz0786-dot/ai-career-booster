export interface ResumeAnalysisResult {
  profession: string;
  careerLevel: string;
  experienceYears: number;

  atsScore: number;
  resumeScore: number;
  technicalScore: number;
  communicationScore: number;
  leadershipScore: number;
  marketReadinessScore: number;
  promotionReadinessScore: number;
  overallScore: number;

  currentDemand: string;
  futureDemand: string;
  competitionLevel: string;
  automationRisk: string;

  indiaSalary: string;
  remoteSalary: string;
  globalSalary: string;

  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  missingKeywords: string[];

  recommendedTechnologies: string[];
  recommendedFrameworks: string[];
  recommendedCertifications: string[];
  recommendedCourses: string[];
  recommendedBooks: string[];
  recommendedProjects: string[];

  portfolioImprovements: string[];
  githubImprovements: string[];
  linkedinImprovements: string[];
  resumeImprovements: string[];
  interviewPreparation: string[];

  careerAdvice: string;

  roadmap30Days: string[];
  roadmap60Days: string[];
  roadmap90Days: string[];
  roadmap1Year: string[];
  roadmap3Years: string[];
  roadmap5Years: string[];

  recruiterVerdict: string;

  hiringProbability: string;

  focusAreas: string[];

nextBestRole: string;

learningPriority: string[];

marketTrend: string;

personalizedCoachMessage: string;
}