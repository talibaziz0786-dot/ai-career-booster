import {
  useResumeStore,
 type ResumeTemplate,
} from "./../../store/resume-store";

export default function TemplateSwitcher() {
  const {
    selectedTemplate,
    setTemplate,
  } = useResumeStore();

  const templates: ResumeTemplate[] =
    [
      "modern",
      "corporate",
      "minimal",
    ];

  return (
    <div className="flex gap-3">
      {templates.map((template) => (
        <button
          key={template}
          onClick={() =>
            setTemplate(template)
          }
          className={`
          rounded-xl
          px-4
          py-2
          capitalize

          ${
            selectedTemplate ===
            template
              ? "bg-cyan-500 text-white"
              : "bg-white"
          }
          `}
        >
          {template}
        </button>
      ))}
    </div>
  );
}