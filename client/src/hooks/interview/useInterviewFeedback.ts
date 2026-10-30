import { useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { useInterviewStore } from "../../store/interview-store";

import {
  InterviewAPI,
} from "../../services/interview/interview.api";

import toast from "react-hot-toast";

export function useInterviewFeedback() {

  const navigate =
    useNavigate();

  const {

    category,

    difficulty,

    interviewType,

    language,

    history,

    answers,

    currentAnswer,

    resumeSkills,

    selectedSkills,

    feedbackLoading,

    setFeedbackLoading,

    setCareerInsights,

    setInterviewResult,

    updateHistoryEvaluation,

    endInterview,

  } = useInterviewStore();

  const generateInterviewResult =
    useCallback(async () => {

      if (
        feedbackLoading
      ) {
        return;
      }

      try {

        setFeedbackLoading(
          true
        );

        /* =====================================
           Answers
        ===================================== */

        const finalAnswers = [

          ...answers,

          ...(currentAnswer.trim()

            ? [currentAnswer]

            : []),

        ];

        /* =====================================
           History
        ===================================== */

        const finalHistory =
          history.map(
            (item) => ({
              ...item,
            })
          );

        if (

          currentAnswer.trim() &&

          finalHistory.length > 0

        ) {

          finalHistory[
            finalHistory.length - 1
          ] = {

            ...finalHistory[
              finalHistory.length - 1
            ],

            answer:
              currentAnswer,

          };

        }

        if (
          finalHistory.length === 0
        ) {

         toast.error(
  "Interview history is empty."
);

return;
        }

        if (

          finalHistory.some(
            (item) =>
              !item.answer?.trim()
          )

        ) {

          toast.error(
  "Please answer all questions before ending the interview."
);

return;

        }

        /* =====================================
           Feedback
        ===================================== */

        const feedback =
          await InterviewAPI.generateInterviewFeedback({

            history:
              finalHistory,

            answers:
              finalAnswers,

            language,

            skills:

              selectedSkills.length > 0

                ? selectedSkills

                : resumeSkills,

          });

        setInterviewResult(
          feedback.data
        );

        if (
          finalHistory.length > 0
        ) {

          updateHistoryEvaluation(

            finalHistory.length - 1,

            {

              score:
                feedback.data.overallScore,

              feedback:
                feedback.data.recruiterVerdict,

              strengths:
                feedback.data.strengths,

              weaknesses:
                feedback.data.weaknesses,

            }

          );

        }

        /* =====================================
           Career Insights
        ===================================== */

        const insights =
          await InterviewAPI.generateCareerInsights({

            overallScore:
              feedback.data.overallScore,

            strengths:
              feedback.data.strengths,

            weaknesses:
              feedback.data.weaknesses,

          });

        setCareerInsights(
          insights.insights
        );

        /* =====================================
           Save Session
        ===================================== */

        await InterviewAPI.saveInterviewSession({

          category,

          difficulty,

          interviewType,

          language,

          skills:

            selectedSkills.length > 0

              ? selectedSkills

              : resumeSkills,

          history:
            finalHistory,

          overallScore:
            feedback.data.overallScore,

          recruiterVerdict:
            feedback.data.recruiterVerdict,

          strengths:
            feedback.data.strengths,

          weaknesses:
            feedback.data.weaknesses,

          recommendations:
            feedback.data.recommendations,

        });

        toast.success(
  "Interview completed successfully."
);

endInterview();

navigate(
  "/interview-result"
);

      } catch (error) {

       console.error(error);

toast.error(
  "Unable to generate interview report."
);

      } finally {

        setFeedbackLoading(
          false
        );

      }

    }, [

      answers,

      category,

      currentAnswer,

      difficulty,

      endInterview,

      feedbackLoading,

      history,

      interviewType,

      language,

      navigate,

      resumeSkills,

      selectedSkills,

      setCareerInsights,

      setFeedbackLoading,

      setInterviewResult,

      updateHistoryEvaluation,

    ]);

  return {

    generateInterviewResult,

    feedbackLoading,

  };

}