import { create } from "zustand";

import type {
  JobItem,
  JobFilter,
  JobDashboardStats,
  CreateJobRequest,
  
  JobTimelineItem,
  InterviewSchedule,
} from "../types/job/job.types";

/* ==========================================================
   Helpers
========================================================== */

function calculateDashboardStats(
  jobs: JobItem[]
): JobDashboardStats {
  return {
    total: jobs.length,

    wishlist: jobs.filter(
      (job) => job.status === "wishlist"
    ).length,

    applied: jobs.filter(
      (job) => job.status === "applied"
    ).length,

    interviews: jobs.filter(
      (job) =>
        job.status === "interview" ||
        job.status === "technical" ||
        job.status === "hr"
    ).length,

    offers: jobs.filter(
      (job) => job.status === "offer"
    ).length,

    accepted: jobs.filter(
      (job) => job.status === "accepted"
    ).length,

    rejected: jobs.filter(
      (job) => job.status === "rejected"
    ).length,
  };
}

/* ==========================================================
   Store Interface
========================================================== */

interface JobStore {
  jobs: JobItem[];

  selectedJob: JobItem | null;

  loading: boolean;

  saving: boolean;

  deleting: boolean;

  filters: JobFilter;

  dashboardStats: JobDashboardStats;

  setLoading(
    value: boolean
  ): void;

  setSaving(
    value: boolean
  ): void;

  setDeleting(
    value: boolean
  ): void;

  setJobs(
    jobs: JobItem[]
  ): void;

  addJob(
    job: JobItem
  ): void;

  updateJob(
    id: string,
    job: JobItem
  ): void;

  removeJob(
    id: string
  ): void;

  selectJob(
    job: JobItem | null
  ): void;

  setFilters(
    filters: Partial<JobFilter>
  ): void;

  clearFilters(): void;

  calculateDashboard(): void;

  addTimelineEvent(
    jobId: string,
    event: JobTimelineItem
  ): void;

  scheduleInterview(
    jobId: string,
    interview: InterviewSchedule
  ): void;

  createJob(
    payload: CreateJobRequest
  ): JobItem;
}

/* ==========================================================
   Defaults
========================================================== */

const defaultFilter: JobFilter = {
  search: "",

  status: "all",

  workMode: "all",

  employmentType: "all",

  priority: "all",

  sortBy: "latest",
};

export const defaultDashboard: JobDashboardStats = {

  total: 0,

  wishlist: 0,

  applied: 0,

  interviews: 0,

  offers: 0,

  accepted: 0,

  rejected: 0,
};

/* ==========================================================
   Store
========================================================== */

export const useJobStore =
  create<JobStore>((set) => ({

    /* ======================================================
       Initial State
    ====================================================== */

    jobs: [],

    selectedJob: null,

    loading: false,

    saving: false,

    deleting: false,

    filters: defaultFilter,

    dashboardStats:
      defaultDashboard,

    /* ======================================================
       Loading States
    ====================================================== */

    setLoading: (
      value
    ) =>
      set({
        loading: value,
      }),

    setSaving: (
      value
    ) =>
      set({
        saving: value,
      }),

    setDeleting: (
      value
    ) =>
      set({
        deleting: value,
      }),

    /* ======================================================
       Jobs
    ====================================================== */

    setJobs: (
      jobs
    ) =>
      set({
        jobs,

        dashboardStats:
          calculateDashboardStats(
            jobs
          ),
      }),

    addJob: (
      job
    ) =>
      set((state) => {

        const jobs = [
          job,
          ...state.jobs,
        ];

        return {

          jobs,

          dashboardStats:
            calculateDashboardStats(
              jobs
            ),
        };
      }),

    updateJob: (
      id,
      updatedJob
    ) =>
      set((state) => {

        const jobs =
          state.jobs.map(
            (job) =>
              job.id === id
                ? updatedJob
                : job
          );

        return {

          jobs,

          selectedJob:
            state.selectedJob
              ?.id === id
              ? updatedJob
              : state.selectedJob,

          dashboardStats:
            calculateDashboardStats(
              jobs
            ),
        };
      }),

    removeJob: (
      id
    ) =>
      set((state) => {

        const jobs =
          state.jobs.filter(
            (job) =>
              job.id !== id
          );

        return {

          jobs,

          selectedJob:
            state.selectedJob
              ?.id === id
              ? null
              : state.selectedJob,

          dashboardStats:
            calculateDashboardStats(
              jobs
            ),
        };
      }),

    /* ======================================================
       Selected Job
    ====================================================== */

    selectJob: (
      job
    ) =>
      set({
        selectedJob: job,
      }),

    /* ======================================================
       Filters
    ====================================================== */

    setFilters: (
      filters
    ) =>
      set((state) => ({
        filters: {
          ...state.filters,
          ...filters,
        },
      })),

    clearFilters: () =>
      set({
        filters:
          defaultFilter,
      }),

    /* ======================================================
       Dashboard
    ====================================================== */

    calculateDashboard: () =>
      set((state) => ({
        dashboardStats:
          calculateDashboardStats(
            state.jobs
          ),
      })),

          /* ======================================================
       Timeline
    ====================================================== */

    addTimelineEvent: (
      jobId,
      event
    ) =>
      set((state) => {

        const jobs =
          state.jobs.map(
            (job) => {

              if (
                job.id !== jobId
              ) {
                return job;
              }

              return {
                ...job,

                timeline: [
                  ...job.timeline,
                  event,
                ],

                updatedAt:
                  new Date().toISOString(),
              };
            }
          );

        return {

          jobs,

          selectedJob:
            state.selectedJob
              ?.id === jobId
              ? jobs.find(
                  (job) =>
                    job.id ===
                    jobId
                ) ?? null
              : state.selectedJob,

          dashboardStats:
            calculateDashboardStats(
              jobs
            ),
        };
      }),

    /* ======================================================
       Interview
    ====================================================== */

    scheduleInterview: (
      jobId,
      interview
    ) =>
      set((state) => {

        const jobs =
          state.jobs.map(
            (job) => {

              if (
                job.id !== jobId
              ) {
                return job;
              }

              return {
                ...job,

                interview,

                updatedAt:
                  new Date().toISOString(),
              };
            }
          );

        return {

          jobs,

          selectedJob:
            state.selectedJob
              ?.id === jobId
              ? jobs.find(
                  (job) =>
                    job.id ===
                    jobId
                ) ?? null
              : state.selectedJob,

          dashboardStats:
            calculateDashboardStats(
              jobs
            ),
        };
      }),

    /* ======================================================
       Job Factory
    ====================================================== */

    createJob: (
      payload
    ): JobItem => {

      const now =
        new Date().toISOString();

      return {

        id:
          crypto.randomUUID(),

        company:
          payload.company,

        position:
          payload.position,

        location:
          payload.location,

        employmentType:
          payload.employmentType,

        workMode:
          payload.workMode,

        priority:
          payload.priority ??
          "medium",

        status:
          payload.status ??
          "wishlist",

        salary:
          payload.salary,

        appliedDate:
          now,

        deadline:
          payload.deadline,

        jobUrl:
          payload.jobUrl,

        description:
          payload.description,

        notes:
          payload.notes,

        interview:
          undefined,

        timeline: [
          {
            id:
              crypto.randomUUID(),

            title:
              "Job Added",

            description:
              "Job created inside tracker.",

            status:
              payload.status ??
              "wishlist",

            createdAt:
              now,
          },
        ],

        createdAt:
          now,

        updatedAt:
          now,
      };
    },
  }));
