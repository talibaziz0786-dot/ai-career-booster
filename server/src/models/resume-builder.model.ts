import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IResumeBuilder
  extends Document {
  user: mongoose.Types.ObjectId;
  version: number;
  title: string;
  language: string;
  content: unknown;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeBuilderSchema =
  new Schema<IResumeBuilder>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      version: {
        type: Number,
        required: true,
      },

      title: {
        type: String,
        default: "AI Resume",
        trim: true,
      },

      language: {
        type: String,
        default: "english",
        trim: true,
        lowercase: true,
      },

      content: {
        type: Schema.Types.Mixed,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

/*
 * Fast history queries:
 *
 * user → latest versions
 */
ResumeBuilderSchema.index({
  user: 1,
  version: -1,
});

export default mongoose.model<IResumeBuilder>(
  "ResumeBuilder",
  ResumeBuilderSchema
);