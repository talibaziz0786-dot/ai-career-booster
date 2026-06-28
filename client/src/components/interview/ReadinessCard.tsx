interface Props {
  score: number;
}

export default function ReadinessCard({
  score,
}: Props) {

  return (

    <div
      className="
      rounded-3xl
      bg-cyan-500
      p-8
      text-white
    "
    >

      <h2
        className="
        text-xl
        font-bold
      "
      >
        Recruiter Readiness
      </h2>

      <div
        className="
        mt-4
        text-6xl
        font-black
      "
      >
        {score}%
      </div>

    </div>

  );
}