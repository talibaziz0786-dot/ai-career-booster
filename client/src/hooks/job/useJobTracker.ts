import { useCallback } from "react";

import toast from "react-hot-toast";

import { useJobStore } from "../../store/job-store";
import {
  defaultDashboard,
} from "../../store/job-store";


import {
  useJobsQuery,
  useDashboardQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useUpdateStatusMutation,
   usePrefetchJobs,
} from "./useJobQueries";

import type {
  
  JobStatus,
  CreateJobRequest,
  UpdateJobRequest,
} from "../../types/job/job.types";

/* ==========================================================
   Hook
========================================================== */

export function useJobTracker() {
  const {
    jobs,

    selectedJob,

    filters,

    saving,

    deleting,

    setSaving,

    setDeleting,

    calculateDashboard,

    addJob,

    updateJob,

    removeJob,

    selectJob,
  } = useJobStore();

  const jobsQuery =
  useJobsQuery();

const dashboardQuery =
  useDashboardQuery();

  usePrefetchJobs();

  const createMutation =
  useCreateJobMutation();

const updateMutation =
  useUpdateJobMutation();

const deleteMutation =
  useDeleteJobMutation();

const statusMutation =
  useUpdateStatusMutation();

  /* ==========================================================
     Load Jobs
  ========================================================== */

 const fetchJobs =
  useCallback(async () => {
    await jobsQuery.refetch();

    if (
      jobsQuery.data?.length
    ) {
      selectJob(
        jobsQuery.data[0]
      );
    }

    calculateDashboard();

    return (
      jobsQuery.data ??
      []
    );
  }, [
    jobsQuery,
    calculateDashboard,
    selectJob,
  ]);

  /* ==========================================================
     Dashboard
  ========================================================== */

  const refreshDashboard =
  useCallback(async () => {
    await dashboardQuery.refetch();

    calculateDashboard();
  }, [
    dashboardQuery,
    calculateDashboard,
  ]);

      /* ==========================================================
     Create Job
  ========================================================== */

  

          const createJob = useCallback(
  async (
    payload: CreateJobRequest
  ) => {
    try {
      setSaving(true);

      const createdJob =
  await createMutation.mutateAsync(
    payload
  );

await jobsQuery.refetch();

await dashboardQuery.refetch();

toast.success(
  "Job created successfully."
);

return createdJob;
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to create job."
      );

      throw error;
    } finally {
      setSaving(false);
    }
  },
  [
    createMutation,
    addJob,
    calculateDashboard,
    selectJob,
    setSaving,
  ]
);

  /* ==========================================================
     Update Job
  ========================================================== */
const editJob = useCallback(
  async (
    id: string,
    payload: UpdateJobRequest
  ) => {
    try {
      setSaving(true);

      const updatedJob =
        await updateMutation.mutateAsync({
          id,
          payload,
        });

      await jobsQuery.refetch();

await dashboardQuery.refetch();

      toast.success(
        "Job updated successfully."
      );

      return updatedJob;
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to update job."
      );

      throw error;
    } finally {
      setSaving(false);
    }
  },
  [
    updateMutation,
    updateJob,
    calculateDashboard,
    selectJob,
    setSaving,
  ]
);

  /* ==========================================================
     Delete Job
  ========================================================== */

 const deleteJob = useCallback(
  async (
    id: string
  ) => {
    try {
      setDeleting(true);

      await deleteMutation.mutateAsync(
        id
      );

      await jobsQuery.refetch();

await dashboardQuery.refetch();

      toast.success(
        "Job deleted successfully."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to delete job."
      );

      throw error;
    } finally {
      setDeleting(false);
    }
  },
  [
    deleteMutation,
    removeJob,
    calculateDashboard,
    selectJob,
    setDeleting,
  ]
);

  /* ==========================================================
     Update Status
  ========================================================== */

 const updateJobStatus =
  useCallback(
    async (
      id: string,
      status: JobStatus
    ) => {
      try {
        const updatedJob =
          await statusMutation.mutateAsync({
            id,
            status,
          });

        await jobsQuery.refetch();

await dashboardQuery.refetch();

        toast.success(
          "Status updated."
        );

        return updatedJob;
      } catch (error) {
        console.error(error);

        toast.error(
          "Unable to update status."
        );

        throw error;
      }
    },
    [
      statusMutation,
      updateJob,
      calculateDashboard,
      selectJob,
    ]
  );

      /* ==========================================================
     Select Job
  ========================================================== */

  const selectCurrentJob =
    useCallback(
      (
        id: string
      ) => {

        const job =
          jobs.find(
            (item) =>
              item.id === id
          ) ?? null;

        selectJob(job);
      },
      [
        jobs,
        selectJob,
      ]
    );

  /* ==========================================================
     Get Single Job
  ========================================================== */

  const getJob =
    useCallback(
      (
        id: string
      ) =>
        jobs.find(
          (job) =>
            job.id === id
        ) ?? null,
      [jobs]
    );

  /* ==========================================================
     Public API
  ========================================================== */

  return {

    /* State */

    jobs:
  jobsQuery.data ??
  [],

    selectedJob,

   stats:
dashboardQuery.data ??
defaultDashboard,

    filters,

    loading:
jobsQuery.isLoading ||
dashboardQuery.isLoading ||
saving ||
deleting,

    saving,

    deleting,

    /* Actions */

    fetchJobs,

    refreshDashboard,

    createJob,

    editJob,

    deleteJob,

    updateJobStatus,

    selectCurrentJob,

    getJob,
  };
}