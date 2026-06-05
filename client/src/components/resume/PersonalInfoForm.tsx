import { useResumeStore } from "../../store/resume-store";

export default function PersonalInfoForm() {
  const { data, updateData } =
    useResumeStore();

  return (
    <div className="space-y-4">
      <input
        value={data.fullName}
        onChange={(e) =>
          updateData({
            fullName:
              e.target.value,
          })
        }
        placeholder="Full Name"
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

      <input
        value={data.email}
        onChange={(e) =>
          updateData({
            email:
              e.target.value,
          })
        }
        placeholder="Email"
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

      <input
        value={data.phone}
        onChange={(e) =>
          updateData({
            phone:
              e.target.value,
          })
        }
        placeholder="Phone"
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

      <input
  value={data.jobTitle}
  onChange={(e) =>
    updateData({
      jobTitle: e.target.value,
    })
  }
  placeholder="Job Title"
  className="
  w-full
  rounded-xl
  border
  border-slate-300
  p-3
  "
/>

       <input
        value={data.location}
        onChange={(e) =>
          updateData({
            location:
              e.target.value,
          })
        }
        placeholder="Location"
        className="w-full rounded-xl border p-3"
      />
      
    </div>
  );
}