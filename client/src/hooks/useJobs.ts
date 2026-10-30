import {
  useEffect,
  useState,
} from "react";

import { JobAPI } from "../services/job/job.api";

import type {
  JobItem,
} from "../types/job/job.types";

export function useJobs() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await JobAPI.getJobs();
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchJobs();
  }, []);

  return {
    jobs,
    loading,
  };
}
