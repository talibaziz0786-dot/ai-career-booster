import { useResumeStore } from "../../store/resume-store";

export default function ExperienceForm() {
  const { data, updateData } =
    useResumeStore();

  return (
    <textarea
      rows={5}
      placeholder="Work Experience"
      value={data.experience}
      onChange={(e) =>
        updateData({
          experience: e.target.value,
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