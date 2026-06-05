import { useResumeStore } from "../../store/resume-store";

export default function PhotoUpload() {
  const { updateData } =
    useResumeStore();

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {
      updateData({
        photo:
          reader.result as string,
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="mb-2 block font-semibold">
        Profile Photo
      </label>

      <input 
      aria-label="upload image"
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />
    </div>
  );
}