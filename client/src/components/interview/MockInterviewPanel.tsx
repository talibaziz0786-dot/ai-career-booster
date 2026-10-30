import { useInterviewStore } from "../../store/interview-store";

import InterviewProgress from "./InterviewProgress";
import InterviewQuestion from "./InterviewQuestion";
import AnswerBox from "./AnswerBox";
import InterviewControls from "./InterviewControls";

import {
  useInterviewQuestion,
} from "../../hooks/interview/useInterviewQuestion";

import InterviewLoadingOverlay from "./InterviewLoadingOverlay";

import {
  useInterviewFeedback,
} from "../../hooks/interview/useInterviewFeedback";

export default function MockInterviewPanel() {
  const {
    currentQuestion,
    currentOptions,
    currentAnswer,
    currentStep,
    totalQuestions,
    loading,
    feedbackLoading,
    previousQuestion,
  } = useInterviewStore();

  const {
    generateNextQuestion,
  } = useInterviewQuestion();

  const {
    generateInterviewResult,
  } = useInterviewFeedback();

  const handleOptionSelect = (option: string) => {
    useInterviewStore.setState({ currentAnswer: option });
  };

  return (
    <div className="space-y-6">
      <InterviewProgress
        current={currentStep}
        total={totalQuestions}
      />

      <InterviewQuestion
        question={currentQuestion}
        options={currentOptions}
        selectedAnswer={currentAnswer}
        onOptionSelect={handleOptionSelect}
      />

      <AnswerBox />

      <InterviewControls
        loading={loading}
        feedbackLoading={feedbackLoading}
        onNextQuestion={generateNextQuestion}
        onPreviousQuestion={previousQuestion}
        onEndInterview={generateInterviewResult}
      />

      <InterviewLoadingOverlay
        open={
          loading ||
          feedbackLoading
        }
      />
    </div>
  );
}