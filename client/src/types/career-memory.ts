import type { CareerProfile } from "./career-profile";

import type { SkillTrend, } from "./skill-trend";

export interface CareerMemory {

  resumeProfile: CareerProfile | null;

  interviewHistory: any[];

  strongestSkills: string[];

  weakestSkills: string[];

  recommendedSkills: string[];

   skillTrends: SkillTrend[];

  confidenceTrend: number[];

  technicalTrend: number[];

  communicationTrend: number[];

  overallTrend: number[];

  aiSuggestions: string[];

  lastUpdated: string;

}