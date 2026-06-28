interface Props {
  strongest: string;
  weakest: string;
}

export default function CareerInsightsAI({
  strongest,
  weakest,
}: Props) {

  return (

    <div
      className="
      rounded-3xl
      border
      p-8
    "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-4
      "
      >
        AI Career Insights
      </h2>

      <p>
        Strongest Skill:
        {" "}
        <b>
          {strongest}
        </b>
      </p>

      <p>
        Weakest Skill:
        {" "}
        <b>
          {weakest}
        </b>
      </p>

      <p className="mt-4">

        Focus on improving
        {" "}
        <b>
          {weakest}
        </b>
        {" "}
        to increase your
        interview readiness.

      </p>

    </div>

  );
}