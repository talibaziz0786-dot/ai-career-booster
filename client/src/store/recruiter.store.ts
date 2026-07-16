import { create } from "zustand";

export interface CompanySimulation {

  company: string;

  hiringProbability: number;

  decision: string;

  reasonsToHire: string[];

  rejectionReasons: string[];

  missingRequirements: string[];

}

export interface RecruiterSimulation {

  profession: string;

  industry: string;

  role: string;

  hiringProbability: number;

  recruiterConfidence: number;

  overallDecision: string;

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

interface RecruiterStore {

  loading: boolean;

  simulation: RecruiterSimulation | null;

  setLoading: (
    loading: boolean
  ) => void;

  setSimulation: (
    simulation: RecruiterSimulation
  ) => void;

  clearSimulation: () => void;

}

export const useRecruiterStore =
create<RecruiterStore>((set) => ({

  loading: false,

  simulation: null,

  setLoading: (loading) =>
    set({
      loading,
    }),

  setSimulation: (
    simulation
  ) =>
    set({
      simulation,
    }),

  clearSimulation: () =>
    set({
      simulation: null,
    }),

}));