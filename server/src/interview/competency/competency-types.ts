export type DifficultyLevel =
  | "beginner"
  | "intermediate"
  | "advanced";

export interface Competency {
  id: string;

  name: string;

  description: string;

  difficulty: DifficultyLevel;

  tags: string[];

  keywords: string[];

  prerequisites?: string[];
}

export interface SkillCompetencyMap {
  skill: string;

  competencies: Competency[];
}

export interface CoveredCompetency {
  id: string;

  name: string;
}

export interface CompetencySelectionResult {
  currentSkill: string;

  availableCompetencies: Competency[];

  coveredCompetencies: CoveredCompetency[];

  nextCompetency?: Competency;
}