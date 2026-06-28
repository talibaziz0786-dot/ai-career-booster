import { useInterviewStore } from "../../store/interview-store";
import { api } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

export default function InterviewControls() {
 const {
  
  nextQuestion,
  endInterview,
  previousQuestion,
  setQuestion,
  // currentQuestion,
  currentAnswer,
  setFeedbackLoading,
  setAnswer,
  category,
  difficulty,
  questions,
  answers,
  setLoading,
  loading,
  resumeSkills,
  selectedSkills,
  feedbackLoading,
  
  setCareerInsights,
  
  interviewType,
  questionHistory,
  addQuestionToHistory,
  addQuestion,
   
  addAnswer,
   setInterviewResult,
  //  clearInterviewSession,
   


} = useInterviewStore();

const language =
  useInterviewStore(
    (state) => state.language
  );

const navigate = useNavigate();

const generateInterviewResult =

async () => {


  if (feedbackLoading) return;
  try {

    setFeedbackLoading(true);

    const finalAnswers = [
      ...answers,
      ...(currentAnswer.trim()
        ? [currentAnswer]
        : []),
    ];

  if (
  questions.length === 0 ||
  finalAnswers.length === 0
) {
  alert(
    "Questions or answers missing"
  );
  return;
}

if (
  questions.length !== finalAnswers.length
) {
  alert(
    "Please answer the current question before ending the interview."
  );
  return;
}

     console.log(
 "QUESTIONS COUNT:",
 questions.length
);

console.log(
 "ANSWERS COUNT:",
 finalAnswers.length
);


    console.log(
      "QUESTIONS:",
      questions
    );

    console.log(
      "ANSWERS:",
      finalAnswers
    );

    console.log(
      "SKILLS:",
      selectedSkills
    );

    const response =
      await api.post(
        "/api/interview/feedback",
        {
          questions:
            Array.isArray(
              questions
            )
              ? questions
              : [],

          answers:
            finalAnswers,

          skills:
            selectedSkills.length > 0
              ? selectedSkills
              : resumeSkills,

               language,
        }
      );

    setInterviewResult(
      response.data.feedback
    );


    const insightResponse =
  await api.post(
    "/api/career-insights/generate",
    {
      overallScore:
        response.data.feedback
          .overallScore,

      strengths:
        response.data.feedback
          .strengths,

      weaknesses:
        response.data.feedback
          .weaknesses,
    }
  );

setCareerInsights(
  insightResponse.data.insights
);

    await api.post(
      "/api/interview-session/save",
      {
        category,
        difficulty,

        questions,

        answers:
          finalAnswers,

        ...response.data.feedback,
      }
    );

    endInterview();

    navigate(
      "/interview-result"
    );

  } catch (error) {

    console.error(error);

  } finally {

    setFeedbackLoading(false);

  }
};



  const generateNextQuestion =
  async () => {

if (loading) return;


if (!currentAnswer.trim()) {
  alert(
    "Please answer the current question first."
  );
  return;

}
addAnswer(currentAnswer);


setTimeout(() => {

  const store =
    useInterviewStore.getState();

  console.log(
    store.answers
  );

}, 0);


  console.log(
  "STORE ANSWERS AFTER ADD:",
  useInterviewStore.getState().answers
 );
 


    try {

      setLoading(true);

      const response =
        await api.post(
          "/api/interview/question",
          {
            category,
            difficulty,
              interviewType,
            history:
              questionHistory,

            skills:
  selectedSkills.length > 0
    ? selectedSkills
    : resumeSkills,

            language,
          }
        );

        console.log(response.data);

      addQuestionToHistory(
        response.data.question
      );

      addQuestion(
  response.data.question
);

      if (
 !response.data.question
) {
 throw new Error(
  "Question not received"
 );
}


      

      setQuestion(
        response.data.question
      );

console.log(
  "API SKILL:",
  response.data.skill
);

      setAnswer("");

      nextQuestion();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

 return (
  <div>

    {loading && (
      <div
        className="
        mb-4
        rounded-xl
        border
        border-cyan-300
        bg-cyan-50
        p-3
        text-center
        font-medium
        "
      >
        🤖 AI is generating the next question...
      </div>
    )}

    <div className="flex gap-4">

      <button
        onClick={generateNextQuestion}
        disabled={loading}
        className={`
          rounded-xl
          px-6
          py-3
          font-semibold
          text-white

          ${
            loading
              ? `
                bg-slate-400
                cursor-not-allowed
              `
              : `
                bg-cyan-500
                hover:bg-cyan-600
              `
          }
        `}
      >
        {loading
          ? "⏳ Generating..."
          : "Next Question"}
      </button>

      <button
        onClick={previousQuestion}
        disabled={loading}
        className="
        rounded-2xl
        bg-slate-500
        px-6
        py-3
        font-semibold
        text-white
        "
      >
        Previous
      </button>

      <button
        onClick={generateInterviewResult}
        disabled={
          feedbackLoading ||
          loading
        }
        className="
        rounded-2xl
        bg-red-500
        px-6
        py-3
        font-semibold
        text-white
        "
      >
        {feedbackLoading
          ? "Generating Report..."
          : "End Interview"}
      </button>

    </div>

  </div>
);
}