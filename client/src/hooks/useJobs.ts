import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import { api }
from "../lib/axios";

import { getErrorMessage }
from "../utils/getErrorMessage";

export function useJobs() {

  const [jobs,setJobs] =
    useState([]);

  const [loading,setLoading] =
    useState(true);

  const [error,setError] =
    useState<string | null>(null);

  useEffect(() => {

    const fetchJobs =
      async () => {

        try {

          const response =
            await api.get(
              "/api/jobs/all"
            );

          setJobs(
            response.data.jobs
          );

        } catch(error) {

          const message =
            getErrorMessage(
              error,
              "Failed to load jobs"
            );

          setError(message);

          toast.error(message);

        } finally {

          setLoading(false);

        }

      };

    fetchJobs();

  }, []);

  return {
    jobs,
    loading,
    error,
  };
}