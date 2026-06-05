import { useResumeStore }
from "../../store/resume-store";

export default function AISuggestions() {
  const { data } =
    useResumeStore();

  const suggestions = [];

  if (!data.summary)
    suggestions.push(
      "Add Professional Summary"
    );

  if (!data.projects)
    suggestions.push(
      "Add Projects Section"
    );

  if (!data.linkedin)
    suggestions.push(
      "Add LinkedIn Profile"
    );

  if (!data.github)
    suggestions.push(
      "Add GitHub Profile"
    );

  return (
    <div
      className="
      rounded-3xl
      bg-white
      p-6
      shadow-xl
      "
    >
      <h3 className="font-bold">
        AI Suggestions
      </h3>

      <ul className="mt-4 space-y-2">
        {suggestions.map(
          (item) => (
            <li
              key={item}
              className="
              text-sm
              text-slate-600
              "
            >
              • {item}
            </li>
          )
        )}
      </ul>
    </div>
  );
}