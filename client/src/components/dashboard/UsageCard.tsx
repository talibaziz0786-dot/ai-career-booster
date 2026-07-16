import { Link } from "react-router-dom";
import { useUsageStore } from "../../store/usage-store";

export default function UsageCard() {
  const {
    plan,
    usage,
    limits,
  } = useUsageStore();

  const unlimited =
    plan !== "free";

  const items = [
    {
      label: "Resume",
      used: usage.resumeToday,
      limit: limits?.resume ?? 0,
    },
    {
      label: "ATS",
      used: usage.atsToday,
      limit: limits?.ats ?? 0,
    },
    {
      label: "Interview",
      used: usage.interviewToday,
      limit: limits?.interview ?? 0,
    },
    {
      label: "Cover Letter",
      used: usage.coverLetterToday,
      limit: limits?.coverLetter ?? 0,
    },
  ];

  return (
    <div
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      shadow-xl

      dark:border-white/10
      dark:bg-slate-900
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            AI Usage
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Current Plan:
            {" "}
            <span className="font-semibold capitalize">
              {plan.replace("-", " ")}
            </span>
          </p>

        </div>

        {!unlimited && (
          <Link
            to="/subscription"
            className="
            rounded-xl
            bg-cyan-500
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-cyan-400
            "
          >
            Upgrade
          </Link>
        )}

      </div>

      {unlimited ? (

        <div className="mt-8 rounded-2xl bg-green-500/10 p-6">

          <h3 className="text-xl font-bold text-green-500">
            Unlimited AI Access
          </h3>

          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Resume ✔
            <br />
            ATS ✔
            <br />
            Interview ✔
            <br />
            Cover Letter ✔
          </p>

        </div>

      ) : (

        <div className="mt-8 space-y-6">

          {items.map((item) => {

            const percentage =
              (item.used / item.limit) * 100;

            return (

              <div key={item.label}>

                <div className="mb-2 flex justify-between">

                  <span className="font-medium">
                    {item.label}
                  </span>

                  <span>
                    {item.used} / {item.limit}
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">

                  <div
                    className="h-full rounded-full bg-cyan-500 transition-all"
                    style={{
                      width: `${Math.min(
                        percentage,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}