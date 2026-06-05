import { useResumeStore } from "../../store/resume-store";

export default function EducationForm() {
  const { data, updateData } =
    useResumeStore();

  return (
    <textarea
      rows={4}
      placeholder="Education"
      value={data.education}
      onChange={(e) =>
        updateData({
          education: e.target.value,
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