import type {
  InterviewHistoryItem,
} from "./interview-history.types.js";

export interface UpdateHistoryAnswerInput {
  answer: string;
}

export interface UpdateHistoryEvaluationInput {
  score?: number;

  feedback?: string;

  strengths?: string[];

  weaknesses?: string[];
}

export interface UpdateHistoryMetadataInput {
  provider?: string;

  model?: string;
}

export class InterviewHistoryUpdater {
  /**
   * Updates candidate answer.
   */
  static updateAnswer(
    item: InterviewHistoryItem,
    input: UpdateHistoryAnswerInput
  ): InterviewHistoryItem {
    return {
      ...item,

      answer: input.answer.trim(),
    };
  }

  /**
   * Updates AI evaluation.
   */
  static updateEvaluation(
    item: InterviewHistoryItem,
    input: UpdateHistoryEvaluationInput
  ): InterviewHistoryItem {
    return {
      ...item,

      score:
        input.score ?? item.score,

      feedback:
        input.feedback ?? item.feedback,

      strengths:
        input.strengths ??
        item.strengths,

      weaknesses:
        input.weaknesses ??
        item.weaknesses,
    };
  }

  /**
   * Updates AI provider metadata.
   */
  static updateMetadata(
    item: InterviewHistoryItem,
    input: UpdateHistoryMetadataInput
  ): InterviewHistoryItem {
    return {
      ...item,

      provider:
        input.provider ??
        item.provider,

      model:
        input.model ??
        item.model,
    };
  }

  /**
   * Generic updater.
   * Future-safe for new fields.
   */
  static merge(
    item: InterviewHistoryItem,
    updates: Partial<InterviewHistoryItem>
  ): InterviewHistoryItem {
    return {
      ...item,
      ...updates,
    };
  }
}