import { useResumeStore } from "../../store/resume-store";

export default function SocialLinksForm() {
  const { data, updateData } =
    useResumeStore();

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-xl">
        Social Links
      </h3>

      <input
        type="text"
        placeholder="LinkedIn URL"
        value={data.linkedin}
        onChange={(e) =>
          updateData({
            linkedin: e.target.value,
          })
        }
        className="w-full rounded-xl border p-3"
      />

      <input
        type="text"
        placeholder="GitHub URL"
        value={data.github}
        onChange={(e) =>
          updateData({
            github: e.target.value,
          })
        }
        className="w-full rounded-xl border p-3"
      />

      <input
        type="text"
        placeholder="Portfolio URL"
        value={data.portfolio}
        onChange={(e) =>
          updateData({
            portfolio: e.target.value,
          })
        }
        className="w-full rounded-xl border p-3"
      />
    </div>
  );
}