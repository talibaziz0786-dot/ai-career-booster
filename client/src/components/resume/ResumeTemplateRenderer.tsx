import { useResumeStore } from "../../store/resume-store";

import ModernTemplate from "./templates/ModernTemplate";
import CorporateTemplate from "./templates/CorporateTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

export default function ResumeTemplateRenderer() {
  const selectedTemplate = useResumeStore(
    (state) => state.selectedTemplate
  );

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "corporate":
        return <CorporateTemplate />;

      case "minimal":
        return <MinimalTemplate />;

      default:
        return <ModernTemplate />;
    }
  };

  return (
    <div
      className="
      flex
      justify-center
      items-start

      overflow-auto

      rounded-[28px]

      bg-gradient-to-br
      from-slate-200
      to-slate-100

      p-8

      dark:from-slate-900
      dark:to-slate-950
      "
    >
      <div
        className="
        rounded-xl

        bg-white

        shadow-[0_25px_80px_rgba(0,0,0,.22)]

        ring-1
        ring-slate-200

        dark:ring-white/10

        transition-all
        duration-300

        origin-top

        scale-[0.72]

        xl:scale-[0.80]

        2xl:scale-100
        "
      >
        {renderTemplate()}
      </div>
    </div>
  );
}