import {
  useCallback,
} from "react";

import {
  useInterviewStore,
} from "../../store/interview-store";

import toast from "react-hot-toast";

import {
  InterviewAPI,
} from "../../services/interview/interview.api";

import {
  showInterviewError,
} from "../../utils/interview/interview-error";

export function useInterviewQuestion() {
  const {
    category,
    difficulty,
    interviewType,
    language,
    customTopic,

    history,

    currentStep,
    currentAnswer,

    loading,
    setLoading,

    resumeSkills,
    selectedSkills,

    interviewStarted,
    startInterview,

    addAnswer,
    updateHistoryAnswer,

    addQuestion,
    addHistoryItem,
    createHistoryItem,

    setQuestion,
    setAnswer,

    nextQuestion,
  } = useInterviewStore();

  /* =========================================================
     Start Interview
  ========================================================= */

  const startInterviewSession =
    useCallback(
      async () => {
        if (loading) {
          return;
        }

        try {
          setLoading(true);

          const response =
            await InterviewAPI.generateInterviewQuestion({
              category,

              difficulty,

              interviewType,

              language,

              history: [],

              skills:
                customTopic
                  ? [customTopic]
                  : selectedSkills.length > 0
                    ? selectedSkills
                    : resumeSkills,
            });

          const question =
            response.data;

          if (
            !question.question
          ) {
            throw new Error(
              "Question not received."
            );
          }

          addQuestion(
            question.question
          );

          const historyItem =
            createHistoryItem({
              question:
                question.question,

              skill:
                question.skill ??
                (customTopic ? customTopic : (selectedSkills[0] ?? resumeSkills[0] ?? category)),

              competencyId:
                question.competencyId ??
                "general",

              competencyName:
                question.competencyName ??
                question.skill ??
                "General",

              difficulty,

              provider:
                question.provider ??
                "Gemini",

              model:
                question.model ??
                "gemini-2.5-flash",
            });

          addHistoryItem(
            historyItem
          );

          setQuestion(
            question.question
          );

          startInterview();

          console.log(
            "Interview Started",
            {
              interviewType,
              question,
            }
          );
        } catch (error) {
          showInterviewError(
            error
          );
        } finally {
          setLoading(false);
        }
      },
      [
        addHistoryItem,
        addQuestion,
        category,
        createHistoryItem,
        customTopic,
        difficulty,
        interviewType,
        language,
        loading,
        resumeSkills,
        selectedSkills,
        setLoading,
        setQuestion,
        startInterview,
      ]
    );

  /* =========================================================
     Generate Next Question
  ========================================================= */

  const generateNextQuestion =
    useCallback(
      async () => {
        if (loading) {
          return;
        }

        if (
          !currentAnswer.trim()
        ) {
          toast.error(
            "Please answer the current question first."
          );

          return;
        }

        addAnswer(
          currentAnswer
        );

        updateHistoryAnswer(
          currentStep - 1,
          currentAnswer
        );

        try {
          setLoading(true);

          const response =
            await InterviewAPI.generateInterviewQuestion({
              category,

              difficulty,

              interviewType,

              skills:
                customTopic
                  ? [customTopic]
                  : selectedSkills.length > 0
                    ? selectedSkills
                    : resumeSkills,

              language,

              history,
            });

          const question =
            response.data;

          if (
            !question.question
          ) {
            toast.error(
              "Question generation failed."
            );

            return;
          }

          addQuestion(
            question.question
          );

          const historyItem =
            createHistoryItem({
              question:
                question.question,

              skill:
                question.skill ??
                (customTopic ? customTopic : (selectedSkills[0] ?? resumeSkills[0] ?? category)),

              competencyId:
                question.competencyId ??
                "general",

              competencyName:
                question.competencyName ??
                question.skill ??
                "General",

              difficulty,

              provider:
                question.provider ??
                "Gemini",

              model:
                question.model ??
                "gemini-2.5-flash",
            });

          addHistoryItem(
            historyItem
          );

          setQuestion(
            question.question
          );

          setAnswer("");

          nextQuestion();
        } catch (error) {
          showInterviewError(
            error
          );

          toast.error(
            "Unable to generate next question."
          );
        } finally {
          setLoading(false);
        }
      },
      [
        addAnswer,
        addHistoryItem,
        addQuestion,
        category,
        createHistoryItem,
        currentAnswer,
        currentStep,
        customTopic,
        difficulty,
        history,
        interviewType,
        language,
        loading,
        nextQuestion,
        resumeSkills,
        selectedSkills,
        setAnswer,
        setLoading,
        setQuestion,
        updateHistoryAnswer,
      ]
    );

  return {
    interviewStarted,

    loading,

    startInterviewSession,

    generateNextQuestion,
  };
}
