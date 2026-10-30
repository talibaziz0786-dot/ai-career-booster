import {
  useEffect,
} from "react";

import {
  X,
  Briefcase,
} from "lucide-react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import { motion } from "framer-motion";

import {
  z,
} from "zod";

import type {
  JobItem,
  JobStatus,
} from "../../types/job/job.types";

import toast from "react-hot-toast";

import {
  useJobTracker,
} from "../../hooks/job/useJobTracker";

/* ==========================================================
   Validation
========================================================== */

const jobSchema = z.object({
  company: z
    .string()
    .min(2),

  position: z
    .string()
    .min(2),

  location: z
    .string()
    .min(2),

    priority: z.enum([
"low",
"medium",
"high",
]),

  employmentType: z.enum([
"full-time",
"part-time",
"internship",
"contract",
"freelance",
]),

  workMode: z.enum([
    "remote",
    "hybrid",
    "onsite",
  ]),

  status: z.custom<JobStatus>(),

  salary: z.string(),

  jobUrl: z
  .string()
  .url()
  .or(z.literal("")),

  notes: z
  .string()
  .max(1000)
});

type JobFormData =
  z.infer<
    typeof jobSchema
  >;
   
  function parseSalary(
  value: string
) {
  if (!value.trim()) {
    return undefined;
  }

  const [
    min,
    max,
  ] = value
    .split("-")
    .map((v) =>
      Number(v.trim())
    );

  if (
    Number.isNaN(min) ||
    Number.isNaN(max)
  ) {
    return undefined;
  }

  return {
    min,
    max,
    currency: "INR",
  };
}
/* ==========================================================
   Props
========================================================== */

interface Props {
  open: boolean;

  job:
    | JobItem
    | null;

  onClose(): void;

  onSuccess(): void;
}

/* ==========================================================
   Component
========================================================== */

export default function JobFormModal({
  open,
  job,
  onClose,
  onSuccess,
}: Props) {
  const {
    register,

    handleSubmit,

    reset,

    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<JobFormData>({
      resolver:
        zodResolver(
          jobSchema
        ),

      defaultValues: {
        company: "",

        position: "",

        location: "",

        priority: "medium",

        employmentType:
          "full-time",

        workMode:
          "remote",

        status:
          "wishlist",

        salary: "",

        jobUrl: "",

        notes: "",
      },
    });

    const {
  createJob,
  editJob,
} = useJobTracker();


   const onSubmit = async (
  values: JobFormData
) => {
  try {
    const payload = {
      ...values,

      salary: parseSalary(
        values.salary
      ),
    };

    if (job) {
       await editJob(
        job.id,
        payload
      );

    } else {
      await createJob(
        payload
      );
    }

    reset();

onSuccess();

onClose();

  } catch (error) {
    console.error(error);

    toast.error(
      "Failed to save job."
    );
  }
};

  useEffect(() => {
    if (!job) {
      reset();

      return;
    }

    reset({
      company:
        job.company,

      position:
        job.position,

      location:
        job.location,

      employmentType:
        job.employmentType,

      workMode:
        job.workMode,

        priority:
  job.priority,

      status:
        job.status,

      salary: job.salary
  ? `${job.salary.min}-${job.salary.max}`
  : "",

      jobUrl:
        job.jobUrl ??
        "",

      notes:
        job.notes ??
        "",
    });
  }, [
    job,
    reset,
  ]);

  if (!open) {
  return null;
}

    return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="
      fixed
      inset-0
      z-[100]
      flex
      items-center
      justify-center
      bg-black/60
      p-5
      backdrop-blur-sm
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
w-full
max-w-3xl
max-h-[90vh]
overflow-hidden
rounded-3xl
border
border-slate-200
bg-white
shadow-2xl
dark:border-slate-800
dark:bg-slate-950
"
      >
        {/* Header */}

        <div
          className="
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          px-8
          py-6

          dark:border-slate-800
          "
        >
          <div
            className="
            flex
            items-center
            gap-4
            "
          >
            <div
              className="
              rounded-2xl
              bg-cyan-500/10
              p-3
              "
            >
              <Briefcase
                className="
                h-6
                w-6
                text-cyan-500
                "
              />
            </div>

            <div>
              <h2
                className="
                text-2xl
                font-bold
                "
              >
                {job
                  ? "Edit Job"
                  : "Add New Job"}
              </h2>

              <p
                className="
                mt-1
                text-sm
                text-slate-500
                "
              >
                Manage your job
                application.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
            rounded-xl
            p-2

            hover:bg-slate-100

            dark:hover:bg-slate-800
            "
          >
            <X />
          </button>
        </div>

        {/* Form */}

      <form
  onSubmit={handleSubmit(onSubmit)}
  className="
    max-h-[calc(90vh-105px)]
    overflow-y-auto
    space-y-6
    p-5
    sm:p-8
  "
>
          <div
            className="
            grid
            gap-5

            md:grid-cols-2
            "
          >
            <div>
              <label
                className="
                mb-2
                block
                text-sm
                font-medium
                "
              >
                Company
              </label>

              <input
                {...register(
                  "company"
                )}
                className="
                w-full
                rounded-2xl
                border
                border-slate-300
                px-4
                py-3

                dark:border-slate-700
                dark:bg-slate-900
                "
              />

              <p
                className="
                mt-1
                text-sm
                text-red-500
                "
              >
                {
                  errors
                    .company
                    ?.message
                }
              </p>
            </div>

            <div>
              <label
                className="
                mb-2
                block
                text-sm
                font-medium
                "
              >
                Position
              </label>

              <input
                {...register(
                  "position"
                )}
                className="
                w-full
                rounded-2xl
                border
                border-slate-300
                px-4
                py-3

                dark:border-slate-700
                dark:bg-slate-900
                "
              />

              <p
                className="
                mt-1
                text-sm
                text-red-500
                "
              >
                {
                  errors
                    .position
                    ?.message
                }
              </p>
            </div>

            <div>
              <label
                className="
                mb-2
                block
                text-sm
                font-medium
                "
              >
                Location
              </label>

              <input
                {...register(
                  "location"
                )}
                className="
                w-full
                rounded-2xl
                border
                border-slate-300
                px-4
                py-3

                dark:border-slate-700
                dark:bg-slate-900
                "
              />

              <p
                className="
                mt-1
                text-sm
                text-red-500
                "
              >
                {
                  errors
                    .location
                    ?.message
                }
              </p>
            </div>

            <div>
              <label
                className="
                mb-2
                block
                text-sm
                font-medium
                "
              >
                Salary
              </label>

              <input
                  inputMode="numeric"
                {...register(
                  "salary"
                )}
                placeholder="60000-80000"
                className="
                w-full
                rounded-2xl
                border
                border-slate-300
                px-4
                py-3

                dark:border-slate-700
                dark:bg-slate-900
                "
              />
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium">
                Employment Type
              </label>

              <select
                {...register("employmentType")}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
              >
                <option value="full-time">
                  Full Time
                </option>

                <option value="part-time">
                  Part Time
                </option>

                <option value="internship">
                  Internship
                </option>

                <option value="contract">
                  Contract
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Work Mode
              </label>

              <select
                {...register("workMode")}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
              >
                <option value="remote">
                  Remote
                </option>

                <option value="hybrid">
                  Hybrid
                </option>

                <option value="onsite">
                  Onsite
                </option>
              </select>
            </div>

<div>
  <label
    className="
    mb-2
    block
    text-sm
    font-medium
    "
  >
    Priority
  </label>

  <select
    {...register("priority")}
    className="
    w-full
    rounded-2xl
    border
    border-slate-300
    px-4
    py-3

    dark:border-slate-700
    dark:bg-slate-900
    "
  >
    <option value="low">
      Low
    </option>

    <option value="medium">
      Medium
    </option>

    <option value="high">
      High
    </option>
  </select>

  <p
    className="
    mt-1
    text-sm
    text-red-500
    "
  >
    {errors.priority?.message}
  </p>
</div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <select
                {...register("status")}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
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

            <div>
              <label className="mb-2 block text-sm font-medium">
                Job URL
              </label>

              <input
                  type="url"
                {...register("jobUrl")}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Notes
            </label>

            <textarea
                 maxLength={1000}
              rows={5}
              {...register("notes")}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

         <div
  className="
    sticky
    bottom-0
    flex
    flex-col-reverse
    gap-3
    border-t
    border-slate-200
    bg-white
    pt-5

    sm:flex-row
    sm:justify-end
    sm:gap-4

    dark:border-slate-800
    dark:bg-slate-950
  "
>
  <button
    type="button"
    onClick={onClose}
    className="
      rounded-2xl
      border
      border-slate-300
      px-6
      py-3
      font-medium
      hover:bg-slate-100

      dark:border-slate-700
      dark:hover:bg-slate-800
    "
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={isSubmitting}
    className="
      rounded-2xl
      bg-cyan-500
      px-6
      py-3
      font-semibold
      text-white
      transition
      hover:bg-cyan-600
      disabled:cursor-not-allowed
      disabled:opacity-60
    "
  >
    {isSubmitting
      ? "Saving..."
      : job
      ? "Update Job"
      : "Create Job"}
  </button>
</div>
        </form>
      </motion.div>
    </motion.div>
  );
}
