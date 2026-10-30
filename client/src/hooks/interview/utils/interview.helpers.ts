import { useInterviewStore } from "../../../store/interview-store";

/* ===========================================================
   Clone Interview History
=========================================================== */

export function cloneHistory() {
  return useInterviewStore
    .getState()
    .history.map((item) => ({
      ...item,
    }));
}

/* ===========================================================
   Attach Current Answer
=========================================================== */

export function attachCurrentAnswer(
  currentAnswer: string
) {
  const history = cloneHistory();

  if (
    currentAnswer.trim() &&
    history.length > 0
  ) {
    history[
      history.length - 1
    ] = {
      ...history[
        history.length - 1
      ],
      answer: currentAnswer,
    };
  }

  return history;
}

/* ===========================================================
   Validate History
=========================================================== */

export function validateHistory(
  history: ReturnType<
    typeof cloneHistory
  >
) {
  if (history.length === 0) {
    throw new Error(
      "Interview history is empty."
    );
  }

  const unanswered =
    history.some(
      (item) =>
        !item.answer?.trim()
    );

  if (unanswered) {
    throw new Error(
      "Please answer the current question before ending the interview."
    );
  }
}

/* ===========================================================
   Final Answers
=========================================================== */

export function buildFinalAnswers(
  answers: string[],
  currentAnswer: string
) {
  return [
    ...answers,

    ...(currentAnswer.trim()
      ? [currentAnswer]
      : []),
  ];
}