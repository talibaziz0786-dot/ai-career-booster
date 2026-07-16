import ResumeTemplateRenderer from "../ResumeTemplateRenderer";

export default function ResumePreview() {
  return (
    <div
      className="
      sticky
      top-24
      h-fit
      rounded-3xl
      border
      border-slate-200
      bg-white
      shadow-xl

      dark:border-white/10
      dark:bg-slate-900
      "
    >
      <ResumeTemplateRenderer />
    </div>
  );
}