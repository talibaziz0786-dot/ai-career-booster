import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import {
  useInterviewQuestion,
} from "../../hooks/interview/useInterviewQuestion";

import {
  useInterviewFeedback,
} from "../../hooks/interview/useInterviewFeedback";

interface InterviewContextValue {
  question: ReturnType<
    typeof useInterviewQuestion
  >;

  feedback: ReturnType<
    typeof useInterviewFeedback
  >;
}

const InterviewContext =
  createContext<InterviewContextValue | null>(
    null
  );

interface Props {
  children: ReactNode;
}

export function InterviewProvider({
  children,
}: Props) {
  const question =
    useInterviewQuestion();

  const feedback =
    useInterviewFeedback();

  return (
    <InterviewContext.Provider
      value={{
        question,
        feedback,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const context =
    useContext(InterviewContext);

  if (!context) {
    throw new Error(
      "useInterview must be used inside InterviewProvider."
    );
  }

  return context;
}