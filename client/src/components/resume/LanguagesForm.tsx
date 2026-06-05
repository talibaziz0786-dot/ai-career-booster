import { useResumeStore } from "../../store/resume-store";

export default function LanguagesForm() {
  const { data, updateData } =
    useResumeStore();

  return (
    <div className="mt-8">
      <h3 className="mb-3 font-bold text-xl">
        Languages
      </h3>

      <textarea
        rows={3}
        placeholder="English, Hindi..."
        value={data.languages}
        onChange={(e) =>
          updateData({
            languages: e.target.value,
          })
        }
        className="w-full rounded-xl border p-3"
      />
    </div>
  );
}