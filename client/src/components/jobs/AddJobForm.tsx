import { useState } from "react";
import { api } from "../../lib/axios";
import toast from "react-hot-toast";

export default function AddJobForm({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [company, setCompany] =
    useState("");

  const [role, setRole] =
    useState("");

  const [status, setStatus] =
    useState("Applied");

  const submitHandler = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {

    await api.post(
      "/api/jobs/create",
      {
        company,
        role,
        status,
      }
    );

    toast.success(
      "Job Added Successfully"
    );

    setCompany("");
    setRole("");
    setStatus("Applied");

    onCreated();

  } catch (error) {

    console.error(error);

    toast.error(
      "Failed To Add Job"
    );
  }
};

  return (
    <form
      onSubmit={submitHandler}
      className="
      mb-8
      rounded-3xl
      border
      p-6
      "
    >
      <div className="grid gap-4">

        <input
          value={company}
          onChange={(e) =>
            setCompany(
              e.target.value
            )
          }
          placeholder="Company"
          className="
          rounded-xl
          border
          p-3
          "
        />

        <input
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value
            )
          }
          placeholder="Role"
          className="
          rounded-xl
          border
          p-3
          "
        />

        <select 
        aria-label="job-status"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="
          rounded-xl
          border
          p-3
          "
        >
          <option>
            Applied
          </option>

          <option>
            Interview
          </option>

          <option>
            Rejected
          </option>

          <option>
            Selected
          </option>
        </select>

        <button
          className="
          rounded-xl
          bg-cyan-500
          p-3
          font-bold
          text-white
          "
        >
          Add Job
        </button>

      </div>
    </form>
  );
}