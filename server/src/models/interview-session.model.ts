import mongoose from "mongoose";

const interviewSessionSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      category: {
        type: String,
      },

      difficulty: {
        type: String,
      },

      questions: [
        {
          type: String,
        },
      ],

      answers: [
        {
          type: String,
        },
      ],

      overallScore: Number,

      technicalScore: Number,

      communicationScore:
        Number,

      confidenceScore:
        Number,

      strengths: [String],

      weaknesses: [String],

      improvements: [String],

      recruiterVerdict:
        String,
    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "InterviewSession",
  interviewSessionSchema
);