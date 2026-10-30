import { useEffect, useMemo, useState } from "react";
import JobStatsCards from "../components/job/JobStatsCards";
import JobFilters from "../components/job/JobFilters";
import JobList from "../components/job/JobList";
import JobTimeline from "../components/job/JobTimeline";
import LoadingJobSkeleton from "../components/job/LoadingJobSkeleton";
import EmptyJobState from "../components/job/EmptyJobState";
import {
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import JobFormModal from "../components/job/JobFormModal";
import { useJobTracker } from "../hooks/job/useJobTracker";

import type {
  JobItem,
  JobStatus,
} from "../types/job/job.types";

export default function JobTrackerPage() {
 const {
  jobs,

  stats,

  loading,

  saving,

  deleting,

  fetchJobs,

  deleteJob,

  updateJobStatus,

  selectedJob,

  selectCurrentJob,
} = useJobTracker();

  

    const [
  modalOpen,
  setModalOpen,
] = useState(false);

const [
  editingJob,
  setEditingJob,
] =
  useState<JobItem | null>(
    null
  );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    status,
    setStatus,
  ] =
    useState<
      JobStatus | "all"
    >("all");

 useEffect(() => {
 void fetchJobs();
}, []);

  const filteredJobs =
    useMemo(() => {
      return jobs.filter(
        (job) => {
          const matchesSearch =
            job.company
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            job.position
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesStatus =
            status === "all"
              ? true
              : job.status ===
                status;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      jobs,
      search,
      status,
    ]);

  if (
  loading ||
  saving ||
  deleting
) {
    return (
      <LoadingJobSkeleton />
    );
  }

  if (!loading && !jobs.length) {
  return (
    <EmptyJobState
      onCreate={() => {
        setEditingJob(null);
        setModalOpen(true);
      }}
    />
  );
}

 return (
  <motion.div
    initial={{
      opacity: 0,
      y: 18,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      duration: 0.35,
    }}
      className="
      min-h-screen
      bg-slate-50
     px-5
py-8

md:px-8

xl:px-10 

      dark:bg-slate-950
      "
    >
      <div
        className="
        mb-8
        flex
        items-center
        flex-col
gap-6

md:flex-row
md:items-center
md:justify-between
        "
      >
        <div>
         <h1
className="
text-4xl
font-black
tracking-tight
text-slate-900

dark:text-white
"
>
Job Tracker
</h1>

          <p
className="
mt-3
max-w-2xl
text-slate-500

dark:text-slate-400
"
>
            Manage your job
            applications,
            interviews and
            offers.
          </p>
        </div>

                    <button
            onClick={() => {
                setEditingJob(null);

                setModalOpen(true);
            }}
            className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-cyan-500
            px-6
            py-3
            font-semibold
            text-white

           shadow-lg
            shadow-cyan-500/20

            hover:scale-[1.03]
            hover:bg-cyan-600

            active:scale-95

            transition-all
            "
            >
            <Plus size={18} />

            Add Job
            </button>
      </div>

      <JobStatsCards
        stats={stats}
      />

      <div
        className="
        mt-8
        "
      >
        <JobFilters
          search={search}
          status={status}
          onSearchChange={
            setSearch
          }
          onStatusChange={
            setStatus
          }
        />
      </div>


            <div
        className="
        mt-8
        grid
        gap-8
           2xl:gap-10

        xl:grid-cols-3
        "
      >
        {/* Left Side */}
        <div
          className="
          xl:col-span-2
          "
        >
          <JobList
  jobs={filteredJobs}
  onSelectJob={(job) =>
    selectCurrentJob(
      job.id
    )
  }
/>
        </div>

        {/* Right Side */}
        <div>
          <motion.div
initial={{
opacity:0,
x:25,
}}

animate={{
opacity:1,
x:0,
}}

transition={{
delay:0.15,
duration:0.35,
}}

className="
sticky
top-8
rounded-3xl
shadow-sm

border
border-slate-200
bg-white
p-7

dark:border-slate-800
dark:bg-slate-900
"
>
            {!selectedJob ? (
              <div
                className="
                py-16
                text-center
                "
              >
                <h2
                  className="
                  text-xl
                  font-bold
                  "
                >
                  Select an Application
                </h2>

                <p
                  className="
                  mt-3
                  text-sm
                  text-slate-500
                  "
                >
                  Choose any application from
the left panel to view
its timeline, details,
status and actions.
                </p>
              </div>
            ) : (
              <>
                <div
                  className="
                  border-b
                  border-slate-200
                  pb-5

                  dark:border-slate-800
                  "
                >
                  <h2
                    className="
                    text-2xl
                    font-bold
                    "
                  >
                    {
                      selectedJob.position
                    }
                  </h2>

                  <p
                    className="
                    mt-2
                    text-slate-500
                    "
                  >
                    {
                      selectedJob.company
                    }
                  </p>
                </div>

                <div
                  className="
                  mt-6
                  space-y-6
                  "
                >
                  <div>
                    <p
                      className="
                      text-xs
                      uppercase
                      tracking-wider
                      text-slate-500
                      "
                    >
                      Location
                    </p>

                    <h4
                      className="
                      mt-1
                      font-semibold
                      "
                    >
                      {
                        selectedJob.location
                      }
                    </h4>
                  </div>

                  <div>
                    <p
                      className="
                      text-xs
                      uppercase
                      tracking-wider
                      text-slate-500
                      "
                    >
                      Employment
                    </p>

                    <h4
                      className="
                      mt-1
                      font-semibold
                      "
                    >
                      {
                        selectedJob.employmentType
                      }
                    </h4>
                  </div>

                  <div>
                    <p
                      className="
                      text-xs
                      uppercase
                      tracking-wider
                      text-slate-500
                      "
                    >
                      Work Mode
                    </p>

                    <h4
                      className="
                      mt-1
                      font-semibold
                      "
                    >
                      {
                        selectedJob.workMode
                      }
                    </h4>
                  </div>

                  <div>
   <div
className="
border-t
border-slate-200
pt-6

dark:border-slate-800
"
>
  <button
    onClick={() => {
      setEditingJob(
        selectedJob
      );

      setModalOpen(true);
    }}
    className="
    flex
    items-center
    gap-2
    rounded-2xl
    bg-amber-500
    px-4
    py-2
    text-white

    hover:bg-amber-600
    "
  >
    <Pencil size={16} />

    Edit
  </button>

  <button
    onClick={async () => {
      if (
        !selectedJob
      )
        return;

      if (
        !window.confirm(
          "Delete this job?"
        )
      )
        return;

     await deleteJob(
  selectedJob.id
);
    }}
    className="
    flex
    items-center
    gap-2
    rounded-2xl
    bg-red-500
    px-4
    py-2
    text-white

    hover:bg-red-600
    "
  >
    <Trash2
      size={16}
    />

    Delete
  </button>
</div>

                    <p
                      className="
                      mb-4
                      text-xs
                      uppercase
                      tracking-wider
                      text-slate-500
                      "
                    >
                      Timeline
                    </p>

                    <JobTimeline
                      timeline={
                        selectedJob.timeline
                      }
                    />
                  </div>

                  <div className="pt-6">
  <p
    className="
    mb-3
    text-xs
    uppercase
    tracking-wider
    text-slate-500
    "
  >
    Update Status
  </p>

  <select
    aria-label="Update Job Status"
    value={
      selectedJob.status
    }
    onChange={async (
      e
    ) => {
      if (
        !selectedJob
      )
        return;

     const newStatus =
  e.target.value as JobStatus;

await updateJobStatus(
  selectedJob.id,
  newStatus
);

    }}
    className="
    w-full
    rounded-2xl
    border
    border-slate-300
    bg-white
    px-4
    py-3

    dark:border-slate-700
    dark:bg-slate-900
    "
  >
    <option value="wishlist">
      Wishlist
    </option>

    <option value="applied">
      Applied
    </option>

    <option value="screening">
      Screening
    </option>

    <option value="interview">
      Interview
    </option>

    <option value="technical">
      Technical
    </option>

    <option value="hr">
      HR
    </option>

    <option value="offer">
      Offer
    </option>

    <option value="accepted">
      Accepted
    </option>

    <option value="rejected">
      Rejected
    </option>
  </select>
</div>
                </div>
              </>
            )}

      
          </motion.div>
        </div>
      </div>


      <JobFormModal
  open={modalOpen}
  job={editingJob}
  onClose={() => {
    setModalOpen(false);
    setEditingJob(null);
  }}
  onSuccess={() => {

  setModalOpen(
    false
  );

  setEditingJob(
    null
  );
}}
/>

</motion.div>
 );
}