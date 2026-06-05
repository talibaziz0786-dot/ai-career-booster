import { useResumeStore } from "../../store/resume-store";

export default function SkillsForm() {
  const { data, updateData } =
    useResumeStore();

  return (
    <textarea
      value={data.skills}
      onChange={(e) =>
        updateData({
          skills:
            e.target.value,
        })
      }

      
      placeholder="React, TypeScript, Node.js..."
      rows={6}
      className="
      w-full
      rounded-xl
      border
      border-slate-300
      bg-white
      p-3
      text-slate-900

      dark:border-white/10
      dark:bg-slate-900
      dark:text-white
      "
    />
  );
}