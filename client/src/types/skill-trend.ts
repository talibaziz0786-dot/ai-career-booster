export interface SkillTrend {

  skill: string;

  currentScore: number;

  previousScore: number;

  improvement: number;

  trend:

    | "improving"

    | "stable"

    | "declining";

  recommendation: string;

}