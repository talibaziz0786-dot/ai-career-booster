import { useResumeStore } from "../../../store/resume-store";

export default function MinimalTemplate() {
  const {
  data,
  aiResume,
} = useResumeStore();

const resume =
  aiResume ?? data;

 return (
  <div className="flex justify-center py-10">
   <div
id="resume-template"
className="
w-[794px]
min-h-[1123px]
mx-auto
overflow-hidden
rounded-md
bg-white
shadow-2xl
"
>
      <div className="border-b pb-6">
        <h1 className="text-5xl font-bold">
          {resume.fullName}
        </h1>

        <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-600">
          <span>{resume.email}</span>
          <span>{resume.phone}</span>
          <span>{resume.location}</span>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Summary
        </h2>

        <p className="mt-3">
          {resume.summary}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Skills
        </h2>

        <p className="mt-3">
          {resume.skills}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Experience
        </h2>

        <p className="mt-3">
          {resume.experience}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Projects
        </h2>

        <p className="mt-3">
          {resume.projects}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Education
        </h2>

        <p className="mt-3">
          {resume.education}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Certifications
        </h2>

        <p className="mt-3">
          {resume.certifications}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-bold uppercase tracking-wider">
          Achievements
        </h2>

        <p className="mt-3">
          {resume.achievements}
        </p>
      </section>
    </div>
    </div>
  );
}