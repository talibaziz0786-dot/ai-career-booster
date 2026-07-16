import ResumeForm from "../components/resume/ResumeForm";
import TemplateSelector from "../components/resume/TemplateSelector";

import ResumeTemplateRenderer from "../components/resume/ResumeTemplateRenderer";
import ResumeScoreCard from "../components/resume/ResumeScoreCard";

import ExportButtons from "../components/resume/ExportButtons";
import AISuggestions
from "../components/resume/AISuggestions";

import ResumeHistory
from "../components/resume/ResumeHistory";

import ResumePreviewContainer from "../components/resume/preview/ResumePreviewContainer";

import ResumeWorkspace from "../components/resume/layout/ResumeWorkspace";

export default function ResumeBuilderPage() {
  return (
    <div
      className="
      min-h-screen
      bg-slate-50
      px-6
      py-8

      dark:bg-slate-950
      "
    >
       <div className="mx-auto max-w-[1700px]">
        <h1
          className="
          mb-10
          text-5xl
          font-black

          text-slate-900

          dark:text-white
          "
        >
          AI Resume Builder
                </h1>
  <ResumeWorkspace
  left={
    <>
      <ResumeHistory />

      <ResumeScoreCard />

      <AISuggestions />

      <ExportButtons />
    </>
  }
  center={<ResumeForm />}
  right={
    <div className="space-y-5">
      <TemplateSelector />

     <div
  className="
  overflow-hidden
  rounded-3xl
  border
  border-slate-200
  bg-white
  shadow-xl
  dark:border-white/10
  dark:bg-slate-900
  "
>
 <ResumePreviewContainer>
  <ResumeTemplateRenderer />
</ResumePreviewContainer>
</div>
    </div>
  }
/>
        
      </div>
    </div>
  );
}