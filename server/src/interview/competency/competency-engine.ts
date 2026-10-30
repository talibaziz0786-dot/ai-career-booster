// server/src/interview/competency/competency-engine.ts

import {
  COMPETENCY_MAP,
} from "./competency-map.js";

import type {
  Competency,
  CompetencySelectionResult,
} from "./competency-types.js";

import {
  generateAICompetencies,
} from "./ai-competency-generator.js";

import type {
  InterviewType,
  InterviewDifficulty,
  InterviewLanguage,
} from "../types/interview.types.js";

export interface CompetencyEngineInput {
  userId: string;

  profession: string;

  interviewType: InterviewType;

  difficulty: InterviewDifficulty;

  language: InterviewLanguage;

  skills: string[];

  coveredCompetencies?: string[];
}

export class CompetencyEngine {
  static async getNextCompetency({
    userId,
    profession,
    interviewType,
    difficulty,
    language,
    skills,
    coveredCompetencies = [],
  }: CompetencyEngineInput): Promise<
    CompetencySelectionResult | null
  > {
    if (
      !Array.isArray(skills) ||
      skills.length === 0
    ) {
      return null;
    }

    const normalizedCovered =
      new Set(
        coveredCompetencies
          .filter(Boolean)
          .map((id) =>
            id.trim().toLowerCase()
          )
      );

    for (const rawSkill of skills) {
      const skill =
        rawSkill
          ?.toLowerCase()
          .trim();

      if (!skill) {
        continue;
      }

      let competencies: Competency[] =
        [];

      const map =
        COMPETENCY_MAP[skill];

      /*
       * Static competency map has priority.
       */
      if (map) {
        competencies =
          map.competencies.filter(
            (competency) =>
              competency.difficulty ===
              difficulty
          );
      } else {
        /*
         * Unknown skill -> AI generation.
         *
         * Do not silently swallow the error.
         */
        try {
          competencies =
            await generateAICompetencies({
              userId,

              profession,

              skill,

              interviewType,

              difficulty,

              language,
            });
        } catch (error) {
          console.error(
            `[Interview][CompetencyEngine] Failed to generate competencies for skill "${skill}":`,
            error instanceof Error
              ? error.message
              : error
          );

          /*
           * Try the next skill instead of
           * immediately killing the interview.
           */
          continue;
        }
      }

      if (!competencies.length) {
        continue;
      }

      const remaining =
        competencies.filter(
          (competency) =>
            !normalizedCovered.has(
              competency.id
                .trim()
                .toLowerCase()
            )
        );

      return {
        currentSkill:
          skill,

        availableCompetencies:
          competencies,
 
        coveredCompetencies:
          competencies
            .filter((competency) =>
              normalizedCovered.has(
                competency.id
                  .trim()
                  .toLowerCase()
              )
            )
            .map(
              (competency) => ({
                id:
                  competency.id,

                name:
                  competency.name,
              })
            ),

        nextCompetency:
          remaining.length > 0
            ? remaining[0]
            : undefined,
      };
    }

    return null;
  }

  static hasStaticCompetency(
    skill: string
  ): boolean {
    return Boolean(
      COMPETENCY_MAP[
        skill
          .toLowerCase()
          .trim()
      ]
    );
  }

  static getCompetencies(
    skill: string
  ): Competency[] {
    return (
      COMPETENCY_MAP[
        skill
          .toLowerCase()
          .trim()
      ]?.competencies ?? []
    );
  }
}