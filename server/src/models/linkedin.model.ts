import mongoose, {
  Schema,
  type Document,
  type Model,
} from "mongoose";

/* ==========================================================
   Profile Snapshot
========================================================== */

export interface ILinkedInProfile {
  fullName: string;

  headline: string;

  currentRole: string;

  yearsOfExperience: number;

  location: string;

  summary: string;

  targetRole: string;

  industry: string;

  skills: string[];

  achievements: string[];
}

/* ==========================================================
   Optimization Result
========================================================== */

export interface ILinkedInOptimization {
  optimizedHeadline: string;

  optimizedSummary: string;

  optimizedSkills: string[];

  recruiterKeywords: string[];

  atsKeywords: string[];

  strengths: string[];

  improvements: string[];

  seoSuggestions: string[];

  networkingTips: string[];

  callToAction: string;

  profileScore: number;

  provider: string;

  model: string;
}

/* ==========================================================
   Document
========================================================== */

export interface ILinkedInDocument
  extends Document {
  user: mongoose.Types.ObjectId;

  profile: ILinkedInProfile;

  optimization: ILinkedInOptimization;

  createdAt: Date;

  updatedAt: Date;
}

/* ==========================================================
   Profile Schema
========================================================== */

const profileSchema =
  new Schema<ILinkedInProfile>(
    {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      headline: {
        type: String,
        required: true,
        trim: true,
      },

      currentRole: {
        type: String,
        required: true,
      },

      yearsOfExperience: {
        type: Number,
        required: true,
      },

      location: {
        type: String,
        default: "",
      },

      summary: {
        type: String,
        required: true,
      },

      targetRole: {
        type: String,
        required: true,
      },

      industry: {
        type: String,
        required: true,
      },

      skills: [
        {
          type: String,
          trim: true,
        },
      ],

      achievements: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    {
      _id: false,
    }
  );

/* ==========================================================
   Optimization Schema
========================================================== */

const optimizationSchema =
  new Schema<ILinkedInOptimization>(
    {
      optimizedHeadline: {
        type: String,
        required: true,
      },

      optimizedSummary: {
        type: String,
        required: true,
      },

      optimizedSkills: [
        String,
      ],

      recruiterKeywords: [
        String,
      ],

      atsKeywords: [
        String,
      ],

      strengths: [
        String,
      ],

      improvements: [
        String,
      ],

      seoSuggestions: [
        String,
      ],

      networkingTips: [
        String,
      ],

      callToAction: {
        type: String,
      },

      profileScore: {
        type: Number,
        required: true,
      },

      provider: {
        type: String,
        default: "gemini",
      },

      model: {
        type: String,
        default:
          "gemini-2.5-flash",
      },
    },
    {
      _id: false,
    }
  );

/* ==========================================================
   Main Schema
========================================================== */

const linkedInSchema =
  new Schema<ILinkedInDocument>(
    {
      user: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true,
      },

      profile: {
        type: profileSchema,

        required: true,
      },

      optimization: {
        type:
          optimizationSchema,

        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

/* ==========================================================
   Indexes
========================================================== */

linkedInSchema.index({
  user: 1,

  createdAt: -1,
});

/* ==========================================================
   Model
========================================================== */

const LinkedInOptimization =
  (mongoose.models
    .LinkedInOptimization as
    | Model<ILinkedInDocument>
    | undefined) ??
  mongoose.model<
    ILinkedInDocument
  >(
    "LinkedInOptimization",
    linkedInSchema
  );

export default
  LinkedInOptimization;