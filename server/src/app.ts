import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import interviewRoutes from "./routes/interview.routes";
import evaluationRoutes
from "./routes/evaluation.routes";

import dashboardRoutes
from "./routes/dashboard.routes.js";

import jobRoutes
from "./routes/job.routes";

import interviewSessionRoutes
from "./routes/interview-session.routes";

import careerInsightsRoutes
from "./routes/career-insights.routes.js";


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


export default app;