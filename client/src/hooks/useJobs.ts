import { useFetchOnMount } from "./useFetchOnMount";

interface JobsResponse {
  jobs: unknown[];
}

export function useJobs() {
  const { data: jobs, loading } =
    useFetchOnMount<unknown[], JobsResponse>(
      "/api/jobs/all",
      [],
      (payload) => payload.jobs
    );

  return {
    jobs,
    loading,
  };
}
