
import {
  useEffect,
} from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { JobAPI } from "../../services/job/job.api";

import type {
  CreateJobRequest,
  UpdateJobRequest,
  JobItem,
  JobStatus,
} from "../../types/job/job.types";

/* ==========================================================
   Query Keys
========================================================== */

export const jobQueryKeys = {
  all: ["jobs"] as const,

  stats: ["job-dashboard"] as const,

  detail: (
    id: string
  ) =>
    [
      "jobs",
      "detail",
      id,
    ] as const,
};

/* ==========================================================
   Cache Types
========================================================== */

type JobCache =
  JobItem[];

/* ==========================================================
   Smart Cache Invalidation
========================================================== */

async function invalidateJobListAndStats(
  queryClient: ReturnType<
    typeof useQueryClient
  >
) {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey:
        jobQueryKeys.all,
    }),

    queryClient.invalidateQueries({
      queryKey:
        jobQueryKeys.stats,
    }),
  ]);
}

/* ==========================================================
   Jobs Query
========================================================== */

export function useJobsQuery() {
  return useQuery({
    queryKey:
      jobQueryKeys.all,

    queryFn:
      JobAPI.getJobs,

    staleTime:
      1000 * 60,

    gcTime:
      1000 * 60 * 30,

    networkMode:
      "offlineFirst",

    refetchOnReconnect:
      true,

    refetchOnWindowFocus:
      true,
  });
}

/* ==========================================================
   Dashboard Query
========================================================== */

export function useDashboardQuery() {
  return useQuery({
    queryKey:
      jobQueryKeys.stats,

    queryFn:
      JobAPI.getDashboardStats,

    staleTime:
      1000 * 60,

    gcTime:
      1000 * 60 * 30,

    networkMode:
      "offlineFirst",

    refetchOnReconnect:
      true,

    refetchOnWindowFocus:
      true,
  });
}

/* ==========================================================
   Create Job Mutation
========================================================== */

export function useCreateJobMutation() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      payload: CreateJobRequest
    ) =>
      JobAPI.createJob(
        payload
      ),

    /* ----------------------------------
       Optimistic Preparation
    ---------------------------------- */

    onMutate: async () => {

      await queryClient.cancelQueries({
        queryKey:
          jobQueryKeys.all,
      });

      const previousJobs =
        queryClient.getQueryData<JobCache>(
          jobQueryKeys.all
        );

      return {
        previousJobs,
      };
    },

    /* ----------------------------------
       Rollback
    ---------------------------------- */

    onError: (
      _error,
      _payload,
      context
    ) => {

      if (
        context?.previousJobs
      ) {
        queryClient.setQueryData<JobCache>(
          jobQueryKeys.all,
          context.previousJobs
        );
      }
    },

    /* ----------------------------------
       Server Success
    ---------------------------------- */

    onSuccess: async (
      createdJob
    ) => {

      /*
       * Keep individual detail cache
       * immediately available.
       */

      queryClient.setQueryData<JobItem>(
        jobQueryKeys.detail(
          createdJob.id
        ),
        createdJob
      );

      /*
       * Server is authoritative.
       * Refresh affected collections.
       */

      await invalidateJobListAndStats(
        queryClient
      );
    },

    /* ----------------------------------
       Final Synchronization
    ---------------------------------- */

    onSettled: async () => {

      await queryClient.invalidateQueries({
        queryKey:
          jobQueryKeys.all,
      });

      await queryClient.invalidateQueries({
        queryKey:
          jobQueryKeys.stats,
      });
    },
  });
}

/* ==========================================================
   Update Job Mutation
========================================================== */

export function useUpdateJobMutation() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;

      payload: UpdateJobRequest;
    }) =>
      JobAPI.updateJob(
        id,
        payload
      ),

    /* ----------------------------------
       Optimistic Update
    ---------------------------------- */

    onMutate: async ({
      id,
      payload,
    }) => {

      await queryClient.cancelQueries({
        queryKey:
          jobQueryKeys.all,
      });

      await queryClient.cancelQueries({
        queryKey:
          jobQueryKeys.detail(
            id
          ),
      });

      const previousJobs =
        queryClient.getQueryData<JobCache>(
          jobQueryKeys.all
        );

      const previousJob =
        queryClient.getQueryData<JobItem>(
          jobQueryKeys.detail(
            id
          )
        );

      /*
       * Optimistically update list.
       */

      queryClient.setQueryData<JobCache>(
        jobQueryKeys.all,
        (
          oldJobs
        ) => {

          if (!oldJobs) {
            return oldJobs;
          }

          return oldJobs.map(
            (
              job
            ) =>
              job.id === id
                ? {
                    ...job,
                    ...payload,
                  }
                : job
          );
        }
      );

      /*
       * Optimistically update
       * individual detail cache.
       */

      if (previousJob) {

        queryClient.setQueryData<JobItem>(
          jobQueryKeys.detail(
            id
          ),
          {
            ...previousJob,
            ...payload,
          }
        );
      }

      return {
        previousJobs,

        previousJob,
      };
    },

    /* ----------------------------------
       Rollback
    ---------------------------------- */

    onError: (
      _error,
      variables,
      context
    ) => {

      if (
        context?.previousJobs
      ) {

        queryClient.setQueryData<JobCache>(
          jobQueryKeys.all,
          context.previousJobs
        );
      }

      if (
        context?.previousJob
      ) {

        queryClient.setQueryData<JobItem>(
          jobQueryKeys.detail(
            variables.id
          ),
          context.previousJob
        );
      }
    },

    /* ----------------------------------
       Server Success
    ---------------------------------- */

    onSuccess: async (
      updatedJob
    ) => {

      /*
       * Server response becomes
       * the source of truth.
       */

      queryClient.setQueryData<JobItem>(
        jobQueryKeys.detail(
          updatedJob.id
        ),
        updatedJob
      );

      await invalidateJobListAndStats(
        queryClient
      );
    },

    /* ----------------------------------
       Final Synchronization
    ---------------------------------- */

    onSettled: async (
      _data,
      _error,
      variables
    ) => {

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey:
            jobQueryKeys.all,
        }),

        queryClient.invalidateQueries({
          queryKey:
            jobQueryKeys.stats,
        }),

        queryClient.invalidateQueries({
          queryKey:
            jobQueryKeys.detail(
              variables.id
            ),
        }),
      ]);
    },
  });
}

/* ==========================================================
   Delete Job Mutation
========================================================== */

export function useDeleteJobMutation() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string
    ) =>
      JobAPI.deleteJob(
        id
      ),

    /* ----------------------------------
       Optimistic Delete
    ---------------------------------- */

    onMutate: async (
      id
    ) => {

      await queryClient.cancelQueries({
        queryKey:
          jobQueryKeys.all,
      });

      const previousJobs =
        queryClient.getQueryData<JobCache>(
          jobQueryKeys.all
        );

      /*
       * Remove immediately from
       * visible job list.
       */

      queryClient.setQueryData<JobCache>(
        jobQueryKeys.all,
        (
          oldJobs
        ) => {

          if (!oldJobs) {
            return oldJobs;
          }

          return oldJobs.filter(
            (
              job
            ) =>
              job.id !== id
          );
        }
      );

      return {
        previousJobs,
      };
    },

    /* ----------------------------------
       Rollback
    ---------------------------------- */

    onError: (
      _error,
      _id,
      context
    ) => {

      if (
        context?.previousJobs
      ) {

        queryClient.setQueryData<JobCache>(
          jobQueryKeys.all,
          context.previousJobs
        );
      }
    },

    /* ----------------------------------
       Server Success
    ---------------------------------- */

    onSuccess: async (
      _data,
      id
    ) => {

      /*
       * Deleted job should no longer
       * exist in detail cache.
       */

      queryClient.removeQueries({
        queryKey:
          jobQueryKeys.detail(
            id
          ),
      });

      await invalidateJobListAndStats(
        queryClient
      );
    },

    /* ----------------------------------
       Final Synchronization
    ---------------------------------- */

    onSettled: async () => {

      await invalidateJobListAndStats(
        queryClient
      );
    },
  });
}

/* ==========================================================
   Update Status Mutation
========================================================== */

export function useUpdateStatusMutation() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;

      status: JobStatus;
    }) =>
      JobAPI.updateJobStatus(
        id,
        status
      ),

    /* ----------------------------------
       Optimistic Status Update
    ---------------------------------- */

    onMutate: async ({
      id,
      status,
    }) => {

      await queryClient.cancelQueries({
        queryKey:
          jobQueryKeys.all,
      });

      await queryClient.cancelQueries({
        queryKey:
          jobQueryKeys.detail(
            id
          ),
      });

      const previousJobs =
        queryClient.getQueryData<JobCache>(
          jobQueryKeys.all
        );

      const previousJob =
        queryClient.getQueryData<JobItem>(
          jobQueryKeys.detail(
            id
          )
        );

      /*
       * Update list immediately.
       */

      queryClient.setQueryData<JobCache>(
        jobQueryKeys.all,
        (
          oldJobs
        ) => {

          if (!oldJobs) {
            return oldJobs;
          }

          return oldJobs.map(
            (
              job
            ) =>
              job.id === id
                ? {
                    ...job,
                    status,
                  }
                : job
          );
        }
      );

      /*
       * Update detail cache immediately.
       */

      if (previousJob) {

        queryClient.setQueryData<JobItem>(
          jobQueryKeys.detail(
            id
          ),
          {
            ...previousJob,
            status,
          }
        );
      }

      return {
        previousJobs,

        previousJob,
      };
    },

    /* ----------------------------------
       Rollback
    ---------------------------------- */

    onError: (
      _error,
      variables,
      context
    ) => {

      if (
        context?.previousJobs
      ) {

        queryClient.setQueryData<JobCache>(
          jobQueryKeys.all,
          context.previousJobs
        );
      }

      if (
        context?.previousJob
      ) {

        queryClient.setQueryData<JobItem>(
          jobQueryKeys.detail(
            variables.id
          ),
          context.previousJob
        );
      }
    },

    /* ----------------------------------
       Server Success
    ---------------------------------- */

    onSuccess: async (
      updatedJob
    ) => {

      queryClient.setQueryData<JobItem>(
        jobQueryKeys.detail(
          updatedJob.id
        ),
        updatedJob
      );

      /*
       * Status affects dashboard
       * statistics, so both caches
       * must be refreshed.
       */

      await invalidateJobListAndStats(
        queryClient
      );
    },

    /* ----------------------------------
       Final Synchronization
    ---------------------------------- */

    onSettled: async (
      _data,
      _error,
      variables
    ) => {

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey:
            jobQueryKeys.all,
        }),

        queryClient.invalidateQueries({
          queryKey:
            jobQueryKeys.stats,
        }),

        queryClient.invalidateQueries({
          queryKey:
            jobQueryKeys.detail(
              variables.id
            ),
        }),
      ]);
    },
  });
}

/* ==========================================================
   Prefetch Jobs
========================================================== */

export function usePrefetchJobs() {
  const queryClient =
    useQueryClient();

  useEffect(() => {

    /*
     * Warm Jobs cache.
     */

    queryClient.prefetchQuery({
      queryKey:
        jobQueryKeys.all,

      queryFn:
        JobAPI.getJobs,

      staleTime:
        1000 * 60 * 5,
    });

    /*
     * Warm Dashboard cache.
     */

    queryClient.prefetchQuery({
      queryKey:
        jobQueryKeys.stats,

      queryFn:
        JobAPI.getDashboardStats,

      staleTime:
        1000 * 60 * 2,
    });

  }, [
    queryClient,
  ]);
}