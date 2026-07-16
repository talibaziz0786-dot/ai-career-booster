export interface CompanySimulation {
  company: string;
  hiringProbability: number;
  decision:
    | "Strong Hire"
    | "Hire"
    | "Maybe"
    | "Reject";

  reasonsToHire: string[];
  rejectionReasons: string[];
  missingRequirements: string[];
}

export interface RecruiterSimulationResult {
  profession: string;
  industry: string;
  role: string;

  hiringProbability: number;

  recruiterConfidence: number;

  overallDecision:
    | "Strong Hire"
    | "Hire"
    | "Maybe"
    | "Reject";

  strongestAreas: string[];

  weakestAreas: string[];

  criticalImprovements: string[];

  recommendedCompanies: CompanySimulation[];

  recommendedIndustries: string[];

  promotionPotential: string;

  leadershipPotential: string;

  marketStanding: string;

  competitionLevel: string;

  recruiterVerdict: string;
}