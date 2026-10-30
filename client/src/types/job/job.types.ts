/* ==========================================================
   Job Status
========================================================== */

export type JobStatus =
  | "wishlist"
  | "applied"
  | "screening"
  | "interview"
  | "technical"
  | "hr"
  | "offer"
  | "accepted"
  | "rejected";

/* ==========================================================
   Employment Type
========================================================== */

export type EmploymentType =
  | "full-time"
  | "part-time"
  | "internship"
  | "contract"
  | "freelance";

/* ==========================================================
   Work Mode
========================================================== */

export type WorkMode =
  | "remote"
  | "hybrid"
  | "onsite";

/* ==========================================================
   Priority
========================================================== */

export type JobPriority =
  | "low"
  | "medium"
  | "high";

/* ==========================================================
   Timeline Event
========================================================== */

export interface JobTimelineItem {
  id: string;

  title: string;

  description: string;

  status: JobStatus;

  createdAt: string;
}

/* ==========================================================
   Interview Schedule
========================================================== */

export interface InterviewSchedule {
  date: string;

  time: string;

  interviewer?: string;

  meetingLink?: string;

  notes?: string;
}

/* ==========================================================
   Salary
========================================================== */

export interface SalaryRange {
  min: number;

  max: number;

  currency: string;
}

/* ==========================================================
   Main Job Model
========================================================== */

export interface JobItem {
  id: string;

  company: string;

  position: string;

  location: string;

  employmentType: EmploymentType;

  workMode: WorkMode;

  priority: JobPriority;

  status: JobStatus;

  salary?: SalaryRange;

  appliedDate: string;

  deadline?: string;

  jobUrl?: string;

  description?: string;

  notes?: string;

  interview?: InterviewSchedule;

  timeline: JobTimelineItem[];

  createdAt: string;

  updatedAt: string;
}

/* ==========================================================
   Dashboard Statistics
========================================================== */

export interface JobDashboardStats {
  total: number;

  applied: number;

  interviews: number;

  offers: number;

  accepted: number;

  rejected: number;

  wishlist: number;
}

/* ==========================================================
   Filters
========================================================== */

export interface JobFilter {
  search: string;

  status: JobStatus | "all";

  workMode: WorkMode | "all";

  employmentType:
    | EmploymentType
    | "all";

  priority:
    | JobPriority
    | "all";

  sortBy:
    | "latest"
    | "oldest"
    | "deadline"
    | "salary";
}

/* ==========================================================
   Create Request
========================================================== */

export interface CreateJobRequest {
  company: string;

  position: string;

  location: string;

  employmentType: EmploymentType;

  workMode: WorkMode;

  priority?: JobPriority;

  status?: JobStatus;

  salary?: SalaryRange;

  deadline?: string;

  jobUrl?: string;

  description?: string;

  notes?: string;
}

/* ==========================================================
   Update Request
========================================================== */

export interface UpdateJobRequest
  extends Partial<CreateJobRequest> {
  status?: JobStatus;

  interview?: InterviewSchedule;
}


/* ==========================================================
   API Response
========================================================== */

export interface JobResponse {
  success: boolean;

  message: string;

  data: JobItem;
}

export interface JobListResponse {
  success: boolean;

  message: string;

  data: JobItem[];
}

export interface DashboardStatsResponse {
  success: boolean;

  message: string;

  data: JobDashboardStats;
}