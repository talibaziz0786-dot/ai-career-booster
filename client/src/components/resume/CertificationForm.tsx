import { useResumeStore } from "../../store/resume-store";

export default function CertificationForm() {
  const { data, updateData } =
    useResumeStore();

  return (
    <textarea
      rows={4}
      placeholder="Certifications"
      value={data.certifications}
      onChange={(e) =>
        updateData({
          certifications: e.target.value,
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