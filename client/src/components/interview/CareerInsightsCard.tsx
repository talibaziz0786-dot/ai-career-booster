import { useInterviewStore }
from "../../store/interview-store";

export default function CareerInsightsCard() {

  const insights =
    useInterviewStore(
      (state) =>
        state.careerInsights
    );

  if (!insights) {
    return (
      <div
        className="
        rounded-3xl
        bg-white
        p-6
        shadow-lg
        "
      >
        <h3 className="font-bold">
          AI Career Insight
        </h3>

        <p className="mt-3">
          Complete an interview
          to generate insights.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      rounded-3xl
      bg-white
      p-6
      shadow-lg

      dark:bg-slate-900
      "
    >
      <h3
        className="
        text-xl
        font-bold
        mb-4
        "
      >
        AI Career Insight
      </h3>

      <h4 className="font-semibold">
        Focus Areas
      </h4>

      <ul className="mb-4 mt-2">
        {insights.focusAreas.map(
          (item, index) => (
            <li key={index}>
              • {item}
            </li>
          )
        )}
      </ul>

      <h4 className="font-semibold">
        Recommended Projects
      </h4>

      <ul className="mb-4 mt-2">
        {insights.recommendedProjects.map(
          (item, index) => (
            <li key={index}>
              • {item}
            </li>
          )
        )}
      </ul>

      <h4 className="font-semibold">
        Career Advice
      </h4>

      <p className="mt-2">
        {insights.careerAdvice}
      </p>
    </div>
  );
}