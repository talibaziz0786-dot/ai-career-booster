import { api } from "../../lib/axios";

import type {
  JobItem,
  JobResponse,
  JobListResponse,
  DashboardStatsResponse,
  CreateJobRequest,
  UpdateJobRequest,
  JobStatus,
  InterviewSchedule,
  JobTimelineItem,
} from "../../types/job/job.types";

/* ==========================================================
   Base Endpoint
========================================================== */

const BASE_URL = "/api/jobs";

/* ==========================================================
   Get All Jobs
========================================================== */

async function getJobs(): Promise<JobItem[]> {
  const { data } =
    await api.get<JobListResponse>(
      BASE_URL
    );

  return data.data;
}

/* ==========================================================
   Get Single Job
========================================================== */

async function getJob(
  id: string
): Promise<JobItem> {
  const { data } =
    await api.get<JobResponse>(
      `${BASE_URL}/${id}`
    );

  return data.data;
}

/* ==========================================================
   Dashboard Stats
========================================================== */

async function getDashboardStats() {
  const { data } =
    await api.get<DashboardStatsResponse>(
      `${BASE_URL}/stats`
    );

  return data.data;
}

/* ==========================================================
   Create Job
========================================================== */

async function createJob(
  payload: CreateJobRequest
): Promise<JobItem> {
  const { data } =
    await api.post<JobResponse>(
      BASE_URL,
      payload
    );

  return data.data;
}

/* ==========================================================
   Update Job
========================================================== */

async function updateJob(
  id: string,
  payload: UpdateJobRequest
): Promise<JobItem> {
  const { data } =
    await api.put<JobResponse>(
      `${BASE_URL}/${id}`,
      payload
    );

  return data.data;
}

/* ==========================================================
   Delete Job
========================================================== */

async function deleteJob(
  id: string
): Promise<void> {
  await api.delete(
    `${BASE_URL}/${id}`
  );
}

/* ==========================================================
   Update Status
========================================================== */

async function updateJobStatus(
  id: string,
  status: JobStatus
): Promise<JobItem> {
  const { data } =
    await api.patch<JobResponse>(
      `${BASE_URL}/${id}/status`,
      {
        status,
      }
    );

  return data.data;
}

/* ==========================================================
   Schedule Interview
========================================================== */

async function scheduleInterview(
  id: string,
  interview: InterviewSchedule
): Promise<JobItem> {
  const { data } =
    await api.patch<JobResponse>(
      `${BASE_URL}/${id}/interview`,
      {
        interview,
      }
    );

  return data.data;
}

/* ==========================================================
   Add Timeline Event
========================================================== */

async function addTimelineEvent(
  id: string,
  timelineItem: JobTimelineItem
): Promise<JobItem> {
  const { data } =
    await api.patch<JobResponse>(
      `${BASE_URL}/${id}/timeline`,
      {
        timelineItem,
      }
    );

  return data.data;
}

/* ==========================================================
   Export Service
========================================================== */

export const JobAPI = {
  getJobs,

  getJob,

  getDashboardStats,

  createJob,

  updateJob,

  deleteJob,

  updateJobStatus,

  scheduleInterview,

  addTimelineEvent,
};

export default JobAPI;