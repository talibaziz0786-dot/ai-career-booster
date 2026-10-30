import type {
  FC,
} from "react";

interface InterviewControlsProps {
  loading: boolean;

  feedbackLoading: boolean;

  onNextQuestion: () => void;

  onPreviousQuestion: () => void;

  onEndInterview: () => void;
}

const InterviewControls: FC<
  InterviewControlsProps
> = ({
  loading,

  feedbackLoading,

  onNextQuestion,

  onPreviousQuestion,

  onEndInterview,
}) => {
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

          dark:border-cyan-800
          dark:bg-cyan-950
          "
        >
          🤖 AI is generating the
          next interview question...
        </div>
      )}

      <div
        className="
        flex
        flex-wrap
        gap-4
        "
      >

        <button
          type="button"
          onClick={onNextQuestion}
          disabled={loading}
          className={`
            rounded-xl
            px-6
            py-3
            font-semibold
            text-white
            transition-all

            ${
              loading
                ? `
                  cursor-not-allowed
                  bg-slate-400
                  opacity-70
                `
                : `
                  bg-cyan-500
                  hover:bg-cyan-600
                `
            }
          `}
        >
          {loading
            ? "Generating..."
            : "Next Question"}
        </button>

        <button
          type="button"
          onClick={onPreviousQuestion}
          disabled={loading}
          className="
          rounded-xl
          bg-slate-500
          px-6
          py-3
          font-semibold
          text-white
          transition-all

          hover:bg-slate-600
          disabled:cursor-not-allowed
          disabled:opacity-70
          "
        >
          Previous
        </button>

        <button
          type="button"
          onClick={onEndInterview}
          disabled={
            feedbackLoading ||
            loading
          }
          className="
          rounded-xl
          bg-red-500
          px-6
          py-3
          font-semibold
          text-white
          transition-all

          hover:bg-red-600

          disabled:cursor-not-allowed
          disabled:opacity-70
          "
        >
          {feedbackLoading
            ? "Generating Report..."
            : "End Interview"}
        </button>

      </div>

    </div>
  );
};

export default InterviewControls;