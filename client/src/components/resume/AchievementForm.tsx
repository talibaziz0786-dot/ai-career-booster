import { useResumeStore } from "../../store/resume-store";

export default function AchievementForm() {
  const { data, updateData } =
    useResumeStore();

  return (
    <textarea
      rows={4}
      placeholder="Achievements"
      value={data.achievements}
      onChange={(e) =>
        updateData({
          achievements: e.target.value,
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