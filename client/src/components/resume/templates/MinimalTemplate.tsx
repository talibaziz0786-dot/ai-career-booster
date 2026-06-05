import { useResumeStore } from "../../../store/resume-store";

export default function MinimalTemplate() {
  const { data } = useResumeStore();

  return (
    <div
      id="resume-template"
      className="
      min-h-[1123px]
      bg-white
      p-14
      text-slate-900
      "
    >
      <div className="border-b pb-6">
        <h1 className="text-5xl font-bold">
          {data.fullName}
        </h1>

        <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-600">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Summary
        </h2>

        <p className="mt-3">
          {data.summary}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Skills
        </h2>

        <p className="mt-3">
          {data.skills}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Experience
        </h2>

        <p className="mt-3">
          {data.experience}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Projects
        </h2>

        <p className="mt-3">
          {data.projects}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Education
        </h2>

        <p className="mt-3">
          {data.education}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Certifications
        </h2>

        <p className="mt-3">
          {data.certifications}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Achievements
        </h2>

        <p className="mt-3">
          {data.achievements}
        </p>
      </section>
    </div>
  );
}