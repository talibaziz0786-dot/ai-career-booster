import PersonalInfoForm from "./PersonalInfoForm";
import SkillsForm from "./SkillsForm";
import SummaryForm from "./SummaryForm";
import ExperienceForm from "./ExperienceForm";
import ProjectsForm from "./ProjectsForm";
import EducationForm from "./EducationForm";
import CertificationForm from "./CertificationForm";
import AchievementForm from "./AchievementForm";
import PhotoUpload from "./PhotoUpload";

import SocialLinksForm from "./SocialLinksForm";
import LanguagesForm from "./LanguagesForm";

import { useEffect, useState, } from "react";

import { useResumeStore } from "../../store/resume-store";

import { generateResume } from "../../services/resume-builder.service";

import { mapAIResumeToResumeData } from "../../utils/resumeMapper";

import FormSection from "./form/FormSection";
import {
  saveResumeSnapshot,
  ResumeHistoryStorageError,
} from "../../services/resume-history.service";



export default function ResumeForm() {

  const [loading, setLoading] = useState(false);

const {
  data,
  updateData,
  setAIResume,
  
  setLastSaved,
  lastSaved,
} = useResumeStore();

const handleGenerateResume = async () => {
  try {
    setLoading(true);

    const result = await generateResume({
      resumeText: JSON.stringify(data),
      language: "english",
    });

    /*
     * AI only enhances/generates the relevant
     * resume sections.
     *
     * DO NOT replace the entire user's resume
     * with AI output.
     */
    const mappedAI =
      mapAIResumeToResumeData(result);

    /*
     * Critical:
     *
     * Preserve the user's existing information
     * and merge only valid AI-generated fields.
     *
     * This prevents personal information,
     * photo, education, etc. from disappearing.
     */
    const finalResume = {
      ...data,

      summary:
        mappedAI.summary?.trim()
          ? mappedAI.summary
          : data.summary,

      skills:
        mappedAI.skills?.trim()
          ? mappedAI.skills
          : data.skills,

      experience:
        mappedAI.experience?.trim()
          ? mappedAI.experience
          : data.experience,

      projects:
        mappedAI.projects?.trim()
          ? mappedAI.projects
          : data.projects,

      achievements:
        mappedAI.achievements?.trim()
          ? mappedAI.achievements
          : data.achievements,
    };

    /*
     * Update current resume.
     */
    updateData(finalResume);

    setAIResume(finalResume);

    /*
     * Save COMPLETE resume snapshot
     * locally for Resume History.
     *
     * MongoDB is NOT used here.
     */
    try {
      saveResumeSnapshot(finalResume);
    } catch (error) {
      if (
        error instanceof
        ResumeHistoryStorageError
      ) {
        alert(
          "AI Resume created successfully, but Resume History storage is full. Delete an old history version to save this new version."
        );
      } else {
        throw error;
      }
    }

    alert(
      "✅ AI Resume Generated Successfully"
    );
  } catch (error) {
    console.error(
      "Resume generation failed:",
      error
    );

    alert(
      "Resume generation failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {

  const timer =
    setTimeout(() => {

      localStorage.setItem(
        "resume-data",
        JSON.stringify(data)
      );

      setLastSaved();

    }, 2000);

  return () =>
    clearTimeout(timer);

}, [
  data,
  setLastSaved,
]);


  return (
    <div
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8

      dark:border-white/10
      dark:bg-white/5
      "
    >
      <h2
        className="
        mb-8
        text-2xl
        font-bold
        text-slate-900

        dark:text-white
        "
      >
        Resume Builder
        
      </h2>

      <p
className="
mb-6
text-sm
text-green-600
dark:text-green-400
"
>
Draft Saved

{

new Date(
lastSaved
).toLocaleTimeString()

}

</p>

      <div className="border border-slate-400 p-5 rounded-2xl my-4">
        <PhotoUpload />
           </div>
  
   <FormSection
title="Personal Information" defaultOpen >
      <PersonalInfoForm />

</FormSection>

<FormSection
title="Social Links">
<SocialLinksForm />
</FormSection>

      <div className="mt-8">

        <FormSection
title="Skills"> 
        <SkillsForm />
      </FormSection>  

       <FormSection
title="Professional Summary"> 
         <SummaryForm />
            </FormSection>
            
      <FormSection
title="Work Experience" >
<ExperienceForm />
        </FormSection>      
            
            <FormSection title="Projects" >
      <ProjectsForm />
              </FormSection>
            
            <FormSection title="Education" >
                <EducationForm />
                </FormSection>

    <FormSection title="Certifications" >
 <CertificationForm />
    </FormSection>        
           
           <FormSection title="Achievements" >
  <AchievementForm />
  </FormSection>
           
     <FormSection title="Languages" >
        <LanguagesForm />
        </FormSection>
            
      </div>

      <div className="mt-8">
  <button
    type="button"
    onClick={handleGenerateResume}
    disabled={loading}
    className="
      w-full
      rounded-xl
      bg-blue-600
      px-5
      py-4
      font-semibold
      text-white
      transition

      hover:bg-blue-700

      disabled:cursor-not-allowed
      disabled:opacity-50
    "
  >
    {loading
      ? "Generating Resume..."
      : "Generate AI Resume"}
  </button>
</div>

    </div>
  );
}