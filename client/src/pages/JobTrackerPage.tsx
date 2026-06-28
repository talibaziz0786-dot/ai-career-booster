import {
  useEffect,
  useState,
} from "react";

import { api }
from "../lib/axios";

import AddJobForm
from "../components/jobs/AddJobForm";

export default function JobTrackerPage() {

  const [
    jobs,
    setJobs,
  ] = useState([]);

 const fetchJobs =
  async () => {

    const response =
      await api.get(
        "/api/jobs/all"
      );

    setJobs(
      response.data.jobs
    );
};

const deleteJob =
  async (id: string) => {

    try {

      await api.delete(
        `/api/jobs/${id}`
      );

      fetchJobs();

    } catch (error) {

      console.error(error);

    }
};

useEffect(() => {
  fetchJobs();
}, []);

  return (

    <div className="p-8">

      <h1
        className="
        mb-8
        text-5xl
        font-black
      "
      >
        Job Tracker
      </h1>
   
   <AddJobForm onCreated={fetchJobs} />

      <div
        className="
        grid
        gap-6
      "
      >

        {jobs.map(
          (job: any) => (

            <div
              key={job._id}
              className="
              rounded-3xl
              border
              p-6
            "
            >

              <h2
                className="
                text-2xl
                font-bold
              "
              >
                {job.company}
              </h2>

              <p>
                {job.role}
              </p>

             <span
  className={`
  inline-block
  rounded-full
  px-4
  py-2
  text-sm
  font-semibold

  ${
    job.status ===
    "Applied"
      ? "bg-blue-100 text-blue-600"
      : ""
  }

  ${
    job.status ===
    "Interview"
      ? "bg-yellow-100 text-yellow-600"
      : ""
  }

  ${
    job.status ===
    "Rejected"
      ? "bg-red-100 text-red-600"
      : ""
  }

  ${
    job.status ===
    "Selected"
      ? "bg-green-100 text-green-600"
      : ""
  }
`}
>
  {job.status}
</span>

<div className="mt-4">

  <button
    onClick={() =>
      deleteJob(job._id)
    }
    className="
    rounded-xl
    bg-red-500
    px-4
    py-2
    text-white
    "
  >
    Delete
  </button>

</div>

            </div>

          )
        )}

      </div>

    </div>

  );
}