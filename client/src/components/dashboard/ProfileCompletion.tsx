import {
  useMemo,
} from "react";

import {
  CheckCircle2,
  CircleUserRound,
} from "lucide-react";

import {
  useAuthStore,
} from "../../store/auth-store";

/* ==========================================================
   Profile Fields
========================================================== */

const PROFILE_FIELDS = [
  "name",
  "bio",
  "title",
  "location",
  "phone",
  "github",
  "linkedin",
  "portfolio",
] as const;

/* ==========================================================
   Component
========================================================== */

export default function ProfileCompletion() {
  const user =
    useAuthStore(
      (state) =>
        state.user
    );

  const percentage =
    useMemo(() => {
      if (!user) {
        return 0;
      }

      const completedFields =
        PROFILE_FIELDS.filter(
          (field) => {
            const value =
              user[field];

            return (
              typeof value ===
                "string" &&
              value.trim()
                .length > 0
            );
          }
        ).length;

      return Math.round(
        (
          completedFields /
          PROFILE_FIELDS.length
        ) * 100
      );
    }, [user]);

  const isComplete =
    percentage === 100;

  return (
    <section
      aria-labelledby="profile-completion-title"
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-lg
        shadow-slate-200/40
        transition-all
        hover:shadow-xl
        dark:border-white/10
        dark:bg-slate-900
        dark:shadow-none
        sm:p-6
        lg:p-8
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-cyan-500/10
              text-cyan-600
              dark:text-cyan-400
            "
          >
            <CircleUserRound
              size={22}
              aria-hidden="true"
            />
          </div>

          <div
            className="
              min-w-0
            "
          >
            <h3
              id="profile-completion-title"
              className="
                truncate
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              Profile Completion
            </h3>

            <p
              className="
                mt-0.5
                text-xs
                leading-5
                text-slate-500
                dark:text-slate-400
              "
            >
              Complete your profile to
              improve recruiter visibility.
            </p>
          </div>
        </div>

        <span
          className="
            shrink-0
            rounded-full
            bg-cyan-500/10
            px-3
            py-1
            text-sm
            font-bold
            text-cyan-600
            dark:text-cyan-400
          "
        >
          {percentage}%
        </span>
      </div>

      <div
        className="
          mt-6
          h-3
          overflow-hidden
          rounded-full
          bg-slate-200
          dark:bg-slate-800
        "
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-label={`Profile completion ${percentage}%`}
      >
        <div
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            transition-[width]
            duration-700
            ease-out
          "
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <p
          className="
            text-sm
            leading-5
            text-slate-500
            dark:text-slate-400
          "
        >
          {isComplete
            ? "Your professional profile is complete."
            : "Add more details to strengthen your profile."}
        </p>

        {isComplete && (
          <CheckCircle2
            size={20}
            className="
              shrink-0
              text-emerald-500
            "
            aria-label="Profile complete"
          />
        )}
      </div>
    </section>
  );
}