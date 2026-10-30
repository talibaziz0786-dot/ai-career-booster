import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

import interviewRoutes from "./routes/interview.routes.js";

import evaluationRoutes from "./routes/evaluation.routes.js";

import dashboardRoutes from "./routes/dashboard.routes.js";

import jobRoutes from "./routes/job.routes.js";

import interviewSessionRoutes from "./routes/interview-session.routes.js";

import careerInsightsRoutes from "./routes/career-insights.routes.js";

import resumeAnalysisRoutes from "./routes/resume-analysis.routes.js";

import resumeUploadRoutes from "./routes/resume-upload.routes.js";

import recruiterRoutes from "./routes/recruiter.routes.js";

import resumeRoutes from "./routes/resume.routes.js";

import resumeBuilderRoutes from "./routes/resume-builder.routes.js";

import subscriptionRoutes from "./routes/subscription.routes.js";

import interviewAIRoutes from "./routes/ai/interview-ai.routes.js";

import paymentRoutes from "./routes/payment.routes.js";

import settingsRoutes from "./routes/settings.routes.js";

import usageRoutes from "./routes/usage.routes.js";

import linkedinRoutes from "./routes/linkedin.routes.js";

import userRoutes from "./routes/user.routes.js";

import adminRoutes from "./routes/admin.routes.js";

/* ==========================================================
   Express App
========================================================== */

const app =
  express();

/* ==========================================================
   CORS Origins
========================================================== */

const configuredOrigins =
  process.env.CORS_ORIGINS
    ?.split(",")
    .map((origin) =>
      origin.trim()
    )
    .filter(Boolean) ?? [];

const allowedOrigins =
  new Set([
    "http://localhost:5173",

    "http://localhost:5174",

    ...configuredOrigins,
  ]);

/* ==========================================================
   CORS
========================================================== */

app.use(
  cors({
    origin:
      (
        requestOrigin,
        callback
      ) => {
        /*
          Allow requests without an Origin header
          such as Postman/server-to-server requests.
        */
        if (!requestOrigin) {
          callback(
            null,
            true
          );

          return;
        }

        if (
          allowedOrigins.has(
            requestOrigin
          )
        ) {
          callback(
            null,
            true
          );

          return;
        }

        callback(
          new Error(
            "CORS origin is not allowed."
          )
        );
      },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/* ==========================================================
   Body Parsers
========================================================== */

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,

    limit: "10mb",
  })
);

/* ==========================================================
   Cookie Parser
========================================================== */

app.use(
  cookieParser()
);

/* ==========================================================
   Authentication
========================================================== */

app.use(
  "/api/auth",
  authRoutes
);

/* ==========================================================
   Usage
========================================================== */

app.use(
  "/api/usage",
  usageRoutes
);

/* ==========================================================
   Interview
========================================================== */

app.use(
  "/api/interview",
  interviewRoutes
);

/* ==========================================================
   Evaluation
========================================================== */

app.use(
  "/api/evaluation",
  evaluationRoutes
);

/* ==========================================================
   Interview Session
========================================================== */

app.use(
  "/api/interview-session",
  interviewSessionRoutes
);

/* ==========================================================
   Resume Analysis
========================================================== */

app.use(
  "/api/resume-analysis",
  resumeAnalysisRoutes
);

/* ==========================================================
   Jobs
========================================================== */

app.use(
  "/api/jobs",
  jobRoutes
);

/* ==========================================================
   Dashboard
========================================================== */

app.use(
  "/api/dashboard",
  dashboardRoutes
);

/* ==========================================================
   Career Insights
========================================================== */

app.use(
  "/api/career-insights",
  careerInsightsRoutes
);

/* ==========================================================
   Resume Upload
========================================================== */

app.use(
  "/api/resume-upload",
  resumeUploadRoutes
);

/* ==========================================================
   Recruiter
========================================================== */

app.use(
  "/api/recruiter",
  recruiterRoutes
);

/* ==========================================================
   Resume
========================================================== */

app.use(
  "/api/resume",
  resumeRoutes
);

/* ==========================================================
   Resume Builder
========================================================== */

app.use(
  "/api/resume-builder",
  resumeBuilderRoutes
);

/* ==========================================================
   Subscription
========================================================== */

app.use(
  "/api/subscription",
  subscriptionRoutes
);

/* ==========================================================
   Payment
========================================================== */

app.use(
  "/api/payment",
  paymentRoutes
);

/* ==========================================================
   LinkedIn Optimizer
========================================================== */

app.use(
  "/api/linkedin",
  linkedinRoutes
);

/* ==========================================================
   AI Interview
========================================================== */

app.use(
  "/api/ai/interview",
  interviewAIRoutes
);

/* ==========================================================
   Settings
========================================================== */

app.use(
  "/api/settings",
  settingsRoutes
);

/* ==========================================================
   User Profile
========================================================== */

app.use(
  "/api/user",
  userRoutes
);

/* ==========================================================
   Admin Routes
========================================================== */

app.use(
  "/api/admin",
  adminRoutes
);

/* ==========================================================
   Export
========================================================== */

export default app;