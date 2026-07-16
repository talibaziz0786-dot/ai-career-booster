import { analyzeResume } from "../services/resume-api";
import { useResumeAnalysisStore } from "../store/resume-analysis-store";

export const useResumeAnalyzer = () => {
  const {
    loading,
    setLoading,
    result,
    setResult,
  } = useResumeAnalysisStore();

  const analyze = async (
    resumeText: string
  ) => {
    try {
      setLoading(true);

      const response =
        await analyzeResume(resumeText);

      setResult(response.analysis);

      return response.analysis;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    result,
    analyze,
  };
};