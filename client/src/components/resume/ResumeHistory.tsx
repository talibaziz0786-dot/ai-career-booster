import { useEffect } from "react";

import {
  getMyResumes,
} from "../../services/resume-builder.service";

import {
  useResumeStore,
} from "../../store/resume-store";

import {
  getResume,
} from "../../services/resume-builder.service";

import {
  mapAIResumeToResumeData,
} from "../../utils/resumeMapper";




export default function ResumeHistory() {
 const {
  resumeList,
  setResumeList,
  loadResume,
  setAIResume,
} = useResumeStore();

  useEffect(() => {
    async function loadResumes() {
      try {
        const resumes =
          await getMyResumes();

        setResumeList(resumes);
      } catch (error) {
        console.error(error);
      }
    }

    

    loadResumes();
  }, [setResumeList]);

  async function handleOpenResume(
  id: string
) {
  try {

    const resume =
      await getResume(id);

    const mapped =
      mapAIResumeToResumeData(
        resume.content
      );

    loadResume(mapped);

    setAIResume(mapped);

  } catch (error) {

    console.error(error);

  }
}

  return (
    <div
      className="
      rounded-2xl
      border
      bg-white
      p-5

      dark:bg-slate-900
      dark:border-white/10
      "
    >
      <h2 className="mb-4 text-xl font-bold">
        Resume History
      </h2>

      <div className="space-y-3">

        {resumeList.length === 0 && (
          <p className="text-sm text-slate-500">
            No resumes found.
          </p>
        )}

        {resumeList.map(
          (resume: any) => (
            <div
                key={resume._id}
                onClick={() =>
                       handleOpenResume( resume._id )
                }
                className="
                cursor-pointer
                rounded-xl
                border
                p-4
                transition

                hover:bg-slate-100

                dark:hover:bg-slate-800
                "
                >


              <h3 className="font-semibold">
                {resume.title}
              </h3>

              <p className="text-sm text-slate-500">
                Version {resume.version}
              </p>

            </div>
          )
        )}

      </div>
    </div>
  );
}