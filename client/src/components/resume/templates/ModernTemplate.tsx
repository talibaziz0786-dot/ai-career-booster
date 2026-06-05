import { useResumeStore } from "../../../store/resume-store";

export default function ModernTemplate() {
  const { data } = useResumeStore();

  const skills =
    data.skills?.split(",") || [];

  return (
    <div
      id="resume-template"
      className="
      min-h-[1123px]
      bg-white
      text-slate-900
      "
    >
      {/* Header */}

      <div className="bg-cyan-600 p-8 text-white">
        <div className="flex items-center gap-6">
          {data.photo && (
            <img
              src={data.photo}
              alt="Profile"
              className="
              h-28
              w-28
              rounded-full
              border-4
              border-white
              object-cover
              "
            />
          )}

          <div>
            <h1 className="text-5xl font-black">
              {data.fullName ||
                "Your Name"}
            </h1>

           {data.jobTitle && (
  <p className="mt-2 text-xl text-white font-semibold">
    {data.jobTitle}
  </p>
)}
          </div>
        </div>
      </div>

      {/* Main Layout */}

      <div className="grid grid-cols-3">
        {/* Left Sidebar */}

        <div className="bg-slate-100 p-6">
          <h3 className="mb-4 font-bold uppercase">
            Contact
          </h3>

          <div className="space-y-2 text-sm">
            <p>{data.email}</p>

            <p>{data.phone}</p>

            <p>{data.location}</p>

            <p>{data.linkedin}</p>

            <p>{data.github}</p>

            <p>{data.portfolio}</p>
          </div>

          {/* Skills */}

          <div className="mt-10">
            <h3 className="mb-4 font-bold uppercase">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="
                  rounded-full
                  bg-cyan-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-cyan-700
                  "
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}

          <div className="mt-10">
            <h3 className="mb-4 font-bold uppercase">
              Languages
            </h3>

            <p>{data.languages}</p>
          </div>

          {/* Certifications */}

          <div className="mt-10">
            <h3 className="mb-4 font-bold uppercase">
              Certifications
            </h3>

            <p>{data.certifications}</p>
          </div>
        </div>

        {/* Right Content */}

        <div className="col-span-2 p-8">
          {/* Summary */}

          <section>
            <h2
              className="
              border-b-2
              border-cyan-500
              pb-2
              text-xl
              font-bold
              uppercase
              "
            >
              Professional Summary
            </h2>

            <p className="mt-4">
              {data.summary}
            </p>
          </section>

          {/* Experience */}

          <section className="mt-8">
            <h2
              className="
              border-b-2
              border-cyan-500
              pb-2
              text-xl
              font-bold
              uppercase
              "
            >
              Experience
            </h2>

            <p className="mt-4">
              {data.experience}
            </p>
          </section>

          {/* Projects */}

          <section className="mt-8">
            <h2
              className="
              border-b-2
              border-cyan-500
              pb-2
              text-xl
              font-bold
              uppercase
              "
            >
              Projects
            </h2>

            <p className="mt-4">
              {data.projects}
            </p>
          </section>

          {/* Education */}

          <section className="mt-8">
            <h2
              className="
              border-b-2
              border-cyan-500
              pb-2
              text-xl
              font-bold
              uppercase
              "
            >
              Education
            </h2>

            <p className="mt-4">
              {data.education}
            </p>
          </section>

          {/* Achievements */}

          <section className="mt-8">
            <h2
              className="
              border-b-2
              border-cyan-500
              pb-2
              text-xl
              font-bold
              uppercase
              "
            >
              Achievements
            </h2>

            <p className="mt-4">
              {data.achievements}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}