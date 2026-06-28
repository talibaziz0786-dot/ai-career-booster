import {
  useJobs,
} from "../../hooks/useJobs";

export default function JobStatsCard() {

  const {
    jobs,
  } = useJobs();

  const applied =
    jobs.filter(
      (j:any) =>
        j.status === "Applied"
    ).length;

  const interview =
    jobs.filter(
      (j:any) =>
        j.status === "Interview"
    ).length;

  const selected =
    jobs.filter(
      (j:any) =>
        j.status === "Selected"
    ).length;

  return (

    <div
      className="
      rounded-3xl
      border
      p-6
      "
    >

      <h2
        className="
        mb-4
        text-xl
        font-bold
      "
      >
        Job Statistics
      </h2>

      <div className="space-y-2">

        <p>
          Applied:
          {applied}
        </p>

        <p>
          Interview:
          {interview}
        </p>

        <p>
          Selected:
          {selected}
        </p>

      </div>

    </div>

  );

}