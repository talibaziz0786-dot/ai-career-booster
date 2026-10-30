import { useCallback } from "react";

import toast from "react-hot-toast";

import {
  LinkedInAPI,
} from "../../services/linkedin/linkedin.api";

import {
  useLinkedInStore,
} from "../../store/linkedin-store";

import type {
  LinkedInOptimizeRequest,
} from "../../types/linkedin/linkedin.types";

/* ===========================================================
   LinkedIn Optimizer Hook
=========================================================== */

export function useLinkedInOptimizer() {
  const {
    profile,

    result,

    loading,

    error,

    setLoading,

    setError,

    setResult,

    clearResult,

    resetProfile,
  } = useLinkedInStore();

  /* ===========================================================
     Generate AI Optimization
  =========================================================== */

  const optimizeProfile =
    useCallback(
      async (
        payload: Omit<
          LinkedInOptimizeRequest,
          "profile"
        >
      ) => {
        if (loading) {
          return;
        }

        try {
          setLoading(true);

          setError(null);

          clearResult();

          const response =
            await LinkedInAPI.optimizeLinkedInProfile(
              {
                profile,

                ...payload,
              }
            );

          if (!response.success) {
            throw new Error(
              response.message ||
                "Optimization failed."
            );
          }

          setResult(
            response.data
          );

          toast.success(
            "LinkedIn profile optimized successfully."
          );

          return response.data;
        } catch (err: any) {
          const message =
            err?.response?.data
              ?.message ||
            err?.message ||
            "Unable to optimize profile.";

          setError(message);

          toast.error(message);

          throw err;
        } finally {
          setLoading(false);
        }
      },
      [
        profile,

        loading,

        setLoading,

        setError,

        setResult,

        clearResult,
      ]
    );


      /* ===========================================================
     History
  =========================================================== */

  const loadHistory =
    useCallback(async () => {
      try {
        return await LinkedInAPI.getLinkedInHistory();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ??
            "Unable to load history."
        );

        throw error;
      }
    }, []);

  /* ===========================================================
     Delete History
  =========================================================== */

  const deleteHistory =
    useCallback(async (id: string) => {
      try {
        await LinkedInAPI.deleteLinkedInHistory(
          id
        );

        toast.success(
          "History deleted successfully."
        );
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ??
            "Unable to delete history."
        );

        throw error;
      }
    }, []);

  /* ===========================================================
     Export PDF
  =========================================================== */

  const downloadPDF =
    useCallback(async (id: string) => {
      try {
        const blob =
          await LinkedInAPI.exportLinkedInPDF(
            id
          );

        const url =
          window.URL.createObjectURL(blob);

        const link =
          document.createElement("a");

        link.href = url;

        link.download =
          "linkedin-profile.pdf";

        link.click();

        window.URL.revokeObjectURL(url);

        toast.success(
          "PDF downloaded."
        );
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ??
            "Unable to export PDF."
        );

        throw error;
      }
    }, []);

  /* ===========================================================
     Reset
  =========================================================== */

  const resetOptimizer =
    useCallback(() => {
      resetProfile();

      clearResult();

      setError(null);
    }, [
      resetProfile,
      clearResult,
      setError,
    ]);

  /* ===========================================================
     Public API
  =========================================================== */

  return {
    profile,

    result,

    loading,

    error,

    optimizeProfile,

    loadHistory,

    deleteHistory,

    downloadPDF,

    resetOptimizer,
  };
}