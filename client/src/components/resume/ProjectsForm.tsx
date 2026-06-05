import { useResumeStore } from "../../store/resume-store";

export default function ProjectsForm() {
  const { data, updateData } =
    useResumeStore();

  return (
    <textarea
      rows={5}
      placeholder="Projects"
      value={data.projects}
      onChange={(e) =>
        updateData({
          projects: e.target.value,
        })
      }
      className="
      mt-4
      w-full
      rounded-xl
      border
      border-slate-300
      p-3
      "
    />
  );
}