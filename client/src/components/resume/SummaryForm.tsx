import { useResumeStore } from "../../store/resume-store";

export default function SummaryForm() {
  const { data, updateData } =
    useResumeStore();

  return (
    <textarea
      rows={5}
      placeholder="Professional Summary"
      value={data.summary}
      onChange={(e) =>
        updateData({
          summary: e.target.value,
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