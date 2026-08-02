import { analyzeResume } from "../services/resume.service";
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

      const analysis =
        await analyzeResume(resumeText);

      setResult(analysis);

      return analysis;
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