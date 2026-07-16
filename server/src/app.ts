import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import evaluationRoutes
from "./routes/evaluation.routes.js";

import dashboardRoutes
from "./routes/dashboard.routes.js";

import jobRoutes
from "./routes/job.routes.js";

import interviewSessionRoutes
from "./routes/interview-session.routes.js";

import careerInsightsRoutes
from "./routes/career-insights.routes.js";

import resumeAnalysisRoutes from "./routes/resume-analysis.routes.js";

import resumeUploadRoutes from "./routes/resume-upload.routes.js";

import recruiterRoutes from "./routes/recruiter.routes.js";

import resumeRoutes from "./routes/resume.routes.js";

import resumeBuilderRoutes from "./routes/resume-builder.routes.js";

import subscriptionRoutes from "./routes/subscription.routes.js";
import interviewAIRoutes from "./routes/ai/interview-ai.routes.js";
import paymentRoutes
from "./routes/payment.routes.js";
import usageRoutes from "./routes/usage.routes.js";


const app = express();



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.1.5:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(
  "/api/usage",
  usageRoutes
);

app.use("/api/interview", interviewRoutes);

app.use(
  "/api/evaluation",
  evaluationRoutes
);

app.use(
  "/api/interview-session",
  interviewSessionRoutes
);

app.use(
  "/api/resume-analysis",
  resumeAnalysisRoutes
);


app.use(
  "/api/jobs",
  jobRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/career-insights",
  careerInsightsRoutes
);

app.use(
  "/api/resume-upload",
  resumeUploadRoutes
);

app.use(
  "/api/recruiter",
  recruiterRoutes
);

app.use("/api/resume", resumeRoutes);

app.use(

  "/api/resume-builder",

  resumeBuilderRoutes

);

app.use(
  "/api/subscription",
  subscriptionRoutes
);

app.use(
"/api/payment",
paymentRoutes
);

app.use(
  "/api/ai/interview",
  interviewAIRoutes
);

export default app;