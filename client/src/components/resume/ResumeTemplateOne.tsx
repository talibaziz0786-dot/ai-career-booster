import { useResumeStore }
from "../../store/resume-store";

import ModernTemplate
from "./templates/ModernTemplate";

import CorporateTemplate
from "./templates/CorporateTemplate";

import MinimalTemplate
from "./templates/MinimalTemplate";

export default function ResumeTemplateOne() {

  

  const {
    selectedTemplate,
  } = useResumeStore();

  if (
    selectedTemplate ===
    "corporate"
  ) {
    return <CorporateTemplate />;
  }

  if (
    selectedTemplate ===
    "minimal"
  ) {
    return <MinimalTemplate />;
  }

  return <ModernTemplate />;
}