import { useResumeStore } from "../../store/resume-store";

export default function ResumeScoreCard() {
  const { data } =
    useResumeStore();



 const fields = Object.values(data);

let score = 0;

if (data.fullName) score += 10;
if (data.email) score += 10;
if (data.phone) score += 10;
if (data.location) score += 5;

if (data.summary.length > 50) score += 10;

if (data.skills.length > 20) score += 15;

if (data.experience.length > 30) score += 15;

if (data.projects.length > 20) score += 10;

if (data.education) score += 10;

if (data.linkedin) score += 5;

if (data.github) score += 5;

if (data.certifications) score += 5;

  return (
    <div
      className="
      rounded-3xl
      border
      border-cyan-500/20
      bg-white
      p-8
      shadow-xl
      "
    >
      <h2 className="text-xl font-bold">
        ATS Resume Score
      </h2>

      <p
        className={`
        mt-4
        text-6xl
        font-black
        ${ score >= 85
          ? "text-green-500"
          : score >= 65
          ? "text-yellow-400"
          : "text-red-500"}
        `}
      >
        {score}%
      </p>

      <p className="mt-2 text-slate-500">
        Complete more sections to
        improve your ATS score.
      </p>
    </div>
  );
}