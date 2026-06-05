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


export default function ResumeForm() {
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

      <div className="border border-slate-400 p-5 rounded-2xl my-4"><PhotoUpload />
           </div>
  
  <PhotoUpload />  

      <PersonalInfoForm />

<SocialLinksForm />

      <div className="mt-8">
        <SkillsForm />
        
            <SummaryForm />
            
            <ExperienceForm />
            <ProjectsForm />
            <EducationForm />
            <CertificationForm />
            <AchievementForm />

            <LanguagesForm />
      </div>
    </div>
  );
}