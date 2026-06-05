import { useResumeStore } from "../../../store/resume-store";

export default function CorporateTemplate() {
  const { data } = useResumeStore();

  return (
    <div
      id="resume-template"
      className="min-h-[1123px] bg-white text-slate-900"
    >
      {/* Header */}
      <div className="bg-slate-900 p-10 text-white">
        <h1 className="text-5xl font-black">
          {data.fullName}
        </h1>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p>{data.location}</p>
          <p>{data.linkedin}</p>
          <p>{data.github}</p>
          <p>{data.portfolio}</p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-3 gap-8 p-10">

        {/* Left */}
        <div className="space-y-8">

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Skills
            </h2>

            <p>{data.skills}</p>
          </div>

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Certifications
            </h2>

            <p>{data.certifications}</p>
          </div>

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Languages
            </h2>

            <p>{data.languages}</p>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-2 space-y-8">

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Professional Summary
            </h2>

            <p>{data.summary}</p>
          </div>

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Experience
            </h2>

            <p>{data.experience}</p>
          </div>

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Projects
            </h2>

            <p>{data.projects}</p>
          </div>

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Education
            </h2>

            <p>{data.education}</p>
          </div>

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Achievements
            </h2>

            <p>{data.achievements}</p>
          </div>

        </div>
      </div>
    </div>
  );
}