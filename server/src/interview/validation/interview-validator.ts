import type {
  InterviewHistoryItem,
} from "../history/interview-history.types.js";

export interface ValidationResult {

  valid: boolean;

  errors: string[];

}


// ==========================================
// Interview Validation Engine
// ==========================================

export class InterviewValidator {

  static validate(
    history: InterviewHistoryItem[]
  ): ValidationResult {

    const errors: string[] = [];

    // ==========================
    // Empty History
    // ==========================

    if (history.length === 0) {

      errors.push(
        "Interview history cannot be empty."
      );

      return {
        valid: false,
        errors,
      };

    }

    // ==========================
    // Validate Every Item
    // ==========================

    history.forEach(
      (item, index) => {

        const row =
          `History Item ${index + 1}`;

        // Question

        if (
          !item.question?.trim()
        ) {
          errors.push(
            `${row}: Question is required.`
          );
        }

        // Answer

        if (
          !item.answer?.trim()
        ) {
          errors.push(
            `${row}: Answer is required.`
          );
        }

        // Skill

        if (
          !item.skill?.trim()
        ) {
          errors.push(
            `${row}: Skill is required.`
          );
        }

        // Competency Id

        if (
          !item.competencyId?.trim()
        ) {
          errors.push(
            `${row}: Competency ID is required.`
          );
        }

        // Competency Name

        if (
          !item.competencyName?.trim()
        ) {
          errors.push(
            `${row}: Competency name is required.`
          );
        }

        // Difficulty

        if (
          ![
            "beginner",
            "intermediate",
            "advanced",
          ].includes(
            item.difficulty
          )
        ) {
          errors.push(
            `${row}: Invalid difficulty level.`
          );
        }

        // Score Validation

        if (
          item.score !==
          undefined
        ) {

          if (
            Number.isNaN(
              item.score
            )
          ) {

            errors.push(
              `${row}: Score must be numeric.`
            );

          } else if (

            item.score < 0 ||

            item.score > 100

          ) {

            errors.push(
              `${row}: Score must be between 0 and 100.`
            );

          }

        }

      }
    );

    return {

      valid:
        errors.length === 0,

      errors,

    };

  }

}