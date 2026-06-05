import { useResumeStore } from "../../store/resume-store";

import ModernTemplate from "./templates/ModernTemplate";
import CorporateTemplate from "./templates/CorporateTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

export default function ResumeTemplateRenderer() {
  const selectedTemplate = useResumeStore(
    (state) => state.selectedTemplate
  );

  switch (selectedTemplate) {
    case "corporate":
      return <CorporateTemplate />;

    case "minimal":
      return <MinimalTemplate />;

    default:
      return <ModernTemplate />;
  }
}