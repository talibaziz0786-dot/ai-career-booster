import { useResumeStore } from "../../../store/resume-store";

export default function CorporateTemplate() {
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
overflow-hidden
mx-auto
rounded-md
bg-white
shadow-2xl
"
>
      {/* Header */}
      <div className="bg-slate-900 p-10 text-white">
        <h1 className="text-5xl font-black">
          {resume.fullName}
        </h1>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <p>{resume.email}</p>
          <p>{resume.phone}</p>
          <p>{resume.location}</p>
          <p>{resume.linkedin}</p>
          <p>{resume.github}</p>
          <p>{resume.portfolio}</p>
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

            <p>{resume.skills}</p>
          </div>

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Certifications
            </h2>

            <p>{resume.certifications}</p>
          </div>

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Languages
            </h2>

            <p>{resume.languages}</p>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-2 space-y-8">

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Professional Summary
            </h2>

            <p>{resume.summary}</p>
          </div>

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Experience
            </h2>

            <p>{resume.experience}</p>
          </div>

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Projects
            </h2>

            <p>{resume.projects}</p>
          </div>

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Education
            </h2>

            <p>{resume.education}</p>
          </div>

          <div>
            <h2 className="mb-3 border-b pb-2 text-lg font-bold">
              Achievements
            </h2>

            <p>{resume.achievements}</p>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
}