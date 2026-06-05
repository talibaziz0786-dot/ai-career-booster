import ResumeForm from "../components/resume/ResumeForm";
import TemplateSelector from "../components/resume/TemplateSelector";
import  TemplateSwitcher from "../components/resume/TemplateSwitcher";
import ResumeTemplateRenderer from "../components/resume/ResumeTemplateRenderer";
import ResumeScoreCard from "../components/resume/ResumeScoreCard";
import ResumeTemplateOne from "../components/resume/ResumeTemplateOne";
import ExportButtons from "../components/resume/ExportButtons";
import AISuggestions
from "../components/resume/AISuggestions";

export default function ResumeBuilderPage() {
  return (
    <div
      className="
      min-h-screen
      bg-slate-50
      p-8

      dark:bg-slate-950
      "
    >
      <div className="mx-auto max-w-7xl">
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

       <div className="grid gap-8 lg:grid-cols-2">
  <ResumeForm />

  <div className="space-y-6">
    <ResumeScoreCard />

    <AISuggestions />

       

    <ExportButtons />

    <div className="overflow-hidden rounded-3xl shadow-2xl">
      <TemplateSelector />


  <ResumeTemplateRenderer />
    </div>
  </div>
</div>
        
      </div>
    </div>
  );
}