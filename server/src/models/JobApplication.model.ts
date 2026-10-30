import mongoose, {
  Schema,
  type Document,
  type Model,
} from "mongoose";

/* ==========================================================
   Enums
========================================================== */

export const JOB_STATUSES = [
  "wishlist",
  "applied",
  "screening",
  "interview",
  "technical",
  "hr",
  "offer",
  "accepted",
  "rejected",
] as const;

export type JobStatus =
  (typeof JOB_STATUSES)[number];

export const EMPLOYMENT_TYPES = [
  "full-time",
  "part-time",
  "internship",
  "contract",
  "freelance",
] as const;

export type EmploymentType =
  (typeof EMPLOYMENT_TYPES)[number];

export const WORK_MODES = [
  "remote",
  "hybrid",
  "onsite",
] as const;

export type WorkMode =
  (typeof WORK_MODES)[number];

export const JOB_PRIORITIES = [
  "low",
  "medium",
  "high",
] as const;

export type JobPriority =
  (typeof JOB_PRIORITIES)[number];

/* ==========================================================
   Nested Types
========================================================== */

export interface ISalaryRange {
  min: number;
  max: number;
  currency: string;
}

export interface IInterviewSchedule {
  date: string;
  time: string;
  interviewer?: string;
  meetingLink?: string;
  notes?: string;
}

export interface IJobTimelineItem {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
  createdAt: string;
}

/* ==========================================================
   Document
========================================================== */

export interface IJobApplication
  extends Document {
  user: mongoose.Types.ObjectId;
  company: string;
  position: string;
  location: string;
  employmentType: EmploymentType;
  workMode: WorkMode;
  priority: JobPriority;
  status: JobStatus;
  salary?: ISalaryRange;
  appliedDate: string;
  deadline?: string;
  jobUrl?: string;
  description?: string;
  notes?: string;
  interview?: IInterviewSchedule;
  timeline: IJobTimelineItem[];
  createdAt: Date;
  updatedAt: Date;
}

/* ==========================================================
   Schema
========================================================== */

const salarySchema = new Schema<ISalaryRange>(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    currency: {
      type: String,
      required: true,
      default: "INR",
    },
  },
  { _id: false }
);

const interviewSchema =
  new Schema<IInterviewSchedule>(
    {
      date: { type: String, required: true },
      time: { type: String, required: true },
      interviewer: { type: String },
      meetingLink: { type: String },
      notes: { type: String },
    },
    { _id: false }
  );

const timelineSchema =
  new Schema<IJobTimelineItem>(
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      description: {
        type: String,
        default: "",
      },
      status: {
        type: String,
        enum: JOB_STATUSES,
        required: true,
      },
      createdAt: {
        type: String,
        required: true,
      },
    },
    { _id: false }
  );

const jobApplicationSchema =
  new Schema<IJobApplication>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      company: {
        type: String,
        required: true,
        trim: true,
      },

      position: {
        type: String,
        required: true,
        trim: true,
      },

      location: {
        type: String,
        required: true,
        trim: true,
      },

      employmentType: {
        type: String,
        enum: EMPLOYMENT_TYPES,
        required: true,
        default: "full-time",
      },

      workMode: {
        type: String,
        enum: WORK_MODES,
        required: true,
        default: "remote",
      },

      priority: {
        type: String,
        enum: JOB_PRIORITIES,
        required: true,
        default: "medium",
      },

      status: {
        type: String,
        enum: JOB_STATUSES,
        required: true,
        default: "wishlist",
      },

      salary: {
        type: salarySchema,
      },

      appliedDate: {
        type: String,
        required: true,
        default: () =>
          new Date().toISOString(),
      },

      deadline: {
        type: String,
      },

      jobUrl: {
        type: String,
      },

      description: {
        type: String,
      },

      notes: {
        type: String,
      },

      interview: {
        type: interviewSchema,
      },

      timeline: {
        type: [timelineSchema],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

jobApplicationSchema.index({
  user: 1,
  createdAt: -1,
});

const JobApplication =
  (mongoose.models.JobApplication as
    | Model<IJobApplication>
    | undefined) ??
  mongoose.model<IJobApplication>(
    "JobApplication",
    jobApplicationSchema
  );

export default JobApplication;
