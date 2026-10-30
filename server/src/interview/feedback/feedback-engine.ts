import {
  InterviewValidator,
} from "../validation/interview-validator.js";

import type {
  FeedbackAnalysis,
  FeedbackEngineInput,
} from "./feedback-types.js";

import type {
  CompetencyScore,
} from "./feedback-types.js";

import {
  CommunicationScorer,
} from "./communication-scorer.js";

import {
  CompetencyScorer,
} from "./competency-scorer.js";

import {
  TechnicalScorer,
} from "./technical-scorer.js";

import {
  ConfidenceScorer,
} from "./confidence-scorer.js";

import {
  RecommendationEngine,
} from "./recommendation-engine.js";

import {
  RecruiterVerdictEngine,
} from "./recruiter-verdict.js";

export async function
analyzeInterview(
  input: FeedbackEngineInput
) {

  const {
    history,
  } = input;

  // ==========================
// Interview Validation
// ==========================

const validationResult =
  InterviewValidator.validate(
    history
  );

if (
  !validationResult.valid
) {
  throw new Error(
    validationResult.errors.join(
      "\n"
    )
  );
}

  if (
    history.length === 0
  ) {
    throw new Error(
      "Interview history is empty."
    );
  }

 
// ==========================
// Competency Analysis
// ==========================

const competencyScores =
  CompetencyScorer.score(
    history
  );

// ==========================
// Communication Analysis
// ==========================

const communication =
  CommunicationScorer.score(
    history
  );

// ==========================
// Technical Analysis
// ==========================

const technical =
  TechnicalScorer.score(
    history
  );

// ==========================
// Confidence Analysis
// ==========================

const confidence =
  ConfidenceScorer.score(
    history
  );

// ==========================
// Overall Score
// ==========================

const overallScore =
  Math.round(
    (
      technical.score +
      communication.score +
      confidence.score
    ) / 3
  );

  const strengths =
  competencyScores.flatMap(
    (
      competency: CompetencyScore
    ) => competency.strengths
  );

const weaknesses =
  competencyScores.flatMap(
    (
      competency: CompetencyScore
    ) => competency.weaknesses
  );

 const recommendations =
  RecommendationEngine.generate({

    competencyScores,

    communication,

    confidence,

    technical,

    strengths,

    weaknesses,

    recommendations: [],

    recruiterVerdict: "",

    overallScore,

  });

const recruiterSummary =
  RecruiterVerdictEngine.evaluate({

    competencyScores,

    communication,

    confidence,

    technical,

    strengths,

    weaknesses,

    recommendations,

    recruiterVerdict: "",

    overallScore,

  });



  const analysis: FeedbackAnalysis = {

  competencyScores,

  communication,

  confidence,

  technical,

  strengths,

  weaknesses,

  recommendations,

  recruiterVerdict:
    recruiterSummary.summary,

  recruiterSummary,

  overallScore,

};

return analysis;
}