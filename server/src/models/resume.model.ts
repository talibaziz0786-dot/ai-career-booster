import mongoose, { Schema, Document } from "mongoose";

export interface IResume extends Document {
  user: mongoose.Types.ObjectId;

  title: string;

  template: string;

  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    portfolio?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    summary: string;
  };

  education: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    grade?: string;
    description?: string;
  }[];

  experience: {
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
  }[];

  projects: {
    title: string;
    technologies: string[];
    description: string[];
    github?: string;
    live?: string;
  }[];

  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
    languages: string[];
  };

  certifications: {
    name: string;
    issuer: string;
    issueDate?: string;
    credentialId?: string;
  }[];

  achievements: string[];

  interests: string[];

  references: {
    name: string;
    designation: string;
    company: string;
    email: string;
    phone: string;
  }[];

  atsScore: number;

  resumeScore: number;

  recruiterScore: number;

  aiImproved: boolean;

  version: number;

  isDeleted: boolean;

  createdAt: Date;

  updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      default: "My Resume",
    },

    template: {
      type: String,
      default: "ats",
    },

    personal: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      location: String,
      portfolio: String,
      linkedin: String,
      github: String,
      website: String,
      summary: String,
    },

    education: [
      {
        institution: String,
        degree: String,
        field: String,
        startDate: String,
        endDate: String,
        grade: String,
        description: String,
      },
    ],

    experience: [
      {
        company: String,
        position: String,
        location: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        description: [String],
      },
    ],

    projects: [
      {
        title: String,
        technologies: [String],
        description: [String],
        github: String,
        live: String,
      },
    ],

    skills: {
      technical: [String],
      soft: [String],
      tools: [String],
      languages: [String],
    },

    certifications: [
      {
        name: String,
        issuer: String,
        issueDate: String,
        credentialId: String,
      },
    ],

    achievements: [String],

    interests: [String],

    references: [
      {
        name: String,
        designation: String,
        company: String,
        email: String,
        phone: String,
      },
    ],

    atsScore: {
      type: Number,
      default: 0,
    },

    resumeScore: {
      type: Number,
      default: 0,
    },

    recruiterScore: {
      type: Number,
      default: 0,
    },

    aiImproved: {
      type: Boolean,
      default: false,
    },

    version: {
      type: Number,
      default: 1,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ResumeSchema.index({
  user: 1,
  updatedAt: -1,
});

const Resume =
  mongoose.models.Resume ||
  mongoose.model<IResume>(
    "Resume",
    ResumeSchema
  );

export default Resume;