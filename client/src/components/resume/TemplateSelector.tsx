import { useResumeStore } from "../../store/resume-store";

const templates = [
  "modern",
  "corporate",
  "minimal",
] as const;

export default function TemplateSelector() {
  const {
    selectedTemplate,
    setTemplate,
  } = useResumeStore();

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl m-5 mb-15">
      <h3 className="mb-4 text-xl font-bold">
        Resume Template
      </h3>

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
                : "bg-slate-100"
            }
            `}
          >
            {template}
          </button>
        ))}
      </div>
    </div>
  );
}