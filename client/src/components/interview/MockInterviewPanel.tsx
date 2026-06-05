import { useInterviewStore } from "../../store/interview-store";

import InterviewProgress from "./InterviewProgress";
import InterviewQuestion from "./InterviewQuestion";
import AnswerBox from "./AnswerBox";
import InterviewControls from "./InterviewControls";

export default function MockInterviewPanel() {
  const {
    currentQuestion,
    currentStep,
    totalQuestions,
  } = useInterviewStore();

  return (
    <div className="space-y-6">
      <InterviewProgress
        current={currentStep}
        total={totalQuestions}
      />

      <InterviewQuestion
        question={
          currentQuestion
        }
      />

      <AnswerBox />

      <InterviewControls />
    </div>
  );
}