import mongoose from "mongoose";

const jobApplicationSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      company: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        required: true,
      },

      status: {
        type: String,

        enum: [
          "Applied",
          "Interview",
          "Rejected",
          "Selected",
        ],

        default:
          "Applied",
      },

      notes: {
        type: String,
      },
    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "JobApplication",
  jobApplicationSchema
);