export interface ResumeIntelligence {

  // =============================
  // Identity
  // =============================

  profession: string;

  specialization: string;

  industry: string;

  careerLevel: string;

  experienceYears: number;

  currentRole: string;

  targetRole: string;

  education: string[];

  languages: string[];

  // =============================
  // Resume Scores
  // =============================

  atsScore: number;

  resumeScore: number;

  technicalScore: number;

  communicationScore: number;

  leadershipScore: number;

  marketReadinessScore: number;

  promotionReadinessScore: number;

  overallScore: number;

  // =============================
  // Market Intelligence
  // =============================

  currentDemand: string;

  futureDemand: string;

  competitionLevel: string;

  automationRisk: string;

  hiringTrend: string;

  // =============================
  // Salary Intelligence
  // =============================

  indiaSalary: string;

  remoteSalary: string;

  globalSalary: string;

  freelancingPotential: string;

  // =============================
  // Skills
  // =============================

  strengths: string[];

  weaknesses: string[];

  technicalSkills: string[];

  softSkills: string[];

  missingSkills: string[];

  missingKeywords: string[];

  // =============================
  // Learning
  // =============================

  recommendedTechnologies: string[];

  recommendedFrameworks: string[];

  recommendedTools: string[];

  recommendedCourses: string[];

  recommendedBooks: string[];

  recommendedCertifications: string[];

  // =============================
  // Portfolio
  // =============================

  recommendedProjects: string[];

  githubImprovements: string[];

  linkedinImprovements: string[];

  portfolioImprovements: string[];

  resumeImprovements: string[];

  interviewPreparation: string[];

  // =============================
  // Roadmaps
  // =============================

  roadmap30Days: string[];

  roadmap60Days: string[];

  roadmap90Days: string[];

  roadmap1Year: string[];

  roadmap3Years: string[];

  roadmap5Years: string[];

  // =============================
  // Recruiter
  // =============================

  recruiterVerdict: string;

  hiringProbability: string;

  promotionProbability: string;

  // =============================
  // Career Coach
  // =============================

  careerAdvice: string;

  nextLearningGoal: string;

  dreamCompanies: string[];

}