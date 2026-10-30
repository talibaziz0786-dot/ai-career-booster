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
    resumeText: string,
    language = "english"
  ) => {
    try {
      setLoading(true);

      const analysisData =
        await analyzeResume(resumeText, language);

      setResult(analysisData);

      return analysisData;
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