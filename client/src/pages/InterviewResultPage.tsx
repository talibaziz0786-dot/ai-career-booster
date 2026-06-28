import { useInterviewStore } from "../store/interview-store";
import InterviewScoreChart from "../components/interview/results/InterviewScoreChart";

export default function InterviewResultPage() {
  const result = useInterviewStore(
    (state) => state.interviewResult
  );

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">
          No Interview Result Found
        </h1>
      </div>
    );
  }

  const strengths =
    Array.isArray(result.strengths)
      ? result.strengths
      : [];

  const weaknesses =
    Array.isArray(result.weaknesses)
      ? result.weaknesses
      : [];

  const improvements =
    Array.isArray(result.improvements)
      ? result.improvements
      : [];

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-5xl font-black mb-10">
        Interview Report
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="p-6 rounded-3xl bg-cyan-500 text-white">
          Overall
          <div className="text-4xl font-bold">
            {result.overallScore || 0}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-green-500 text-white">
          Technical
          <div className="text-4xl font-bold">
            {result.technicalScore || 0}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-purple-500 text-white">
          Communication
          <div className="text-4xl font-bold">
            {result.communicationScore || 0}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-orange-500 text-white">
          Confidence
          <div className="text-4xl font-bold">
            {result.confidenceScore || 0}
          </div>
        </div>

      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          Strengths
        </h2>

        <ul className="list-disc pl-6 mt-3">
          {strengths.length > 0 ? (
            strengths.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))
          ) : (
            <li>No strengths available</li>
          )}
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          Weaknesses
        </h2>

        <ul className="list-disc pl-6 mt-3">
          {weaknesses.length > 0 ? (
            weaknesses.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))
          ) : (
            <li>No weaknesses available</li>
          )}
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          Improvements
        </h2>

        <ul className="list-disc pl-6 mt-3">
          {improvements.length > 0 ? (
            improvements.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))
          ) : (
            <li>No improvements available</li>
          )}
        </ul>
      </div>

      <div className="mt-10 p-6 rounded-3xl border">
        <h2 className="text-2xl font-bold mb-4">
          Recruiter Verdict
        </h2>

        <p>
          {result.recruiterVerdict ||
            "No verdict available"}
        </p>
      </div>

      <InterviewScoreChart
        result={result}
      />

    </div>
  );
}