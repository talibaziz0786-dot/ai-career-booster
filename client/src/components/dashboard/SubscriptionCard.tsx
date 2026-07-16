import { Crown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { useSubscriptionStore } from "../../store/subscription-store";

export default function SubscriptionCard() {
  const {
    plan,
    status,
    trialEnd,
  } = useSubscriptionStore();

  const planLabel =
    plan === "free"
      ? "Free Plan"
      : plan === "trial"
      ? "Trial Plan"
      : plan === "pro-monthly"
      ? "Pro Monthly"
      : "Pro Yearly";

  return (
    <div
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-xl

      dark:border-white/10
      dark:bg-slate-900
      "
    >
      <div className="flex items-center gap-3">
        <Crown
          className="text-yellow-500"
          size={26}
        />

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Subscription
        </h2>
      </div>

      <div className="mt-6 space-y-3">

        <div>
          <p className="text-sm text-slate-500">
            Current Plan
          </p>

          <p className="text-lg font-bold text-cyan-500">
            {planLabel}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Status
          </p>

          <p
            className={
              status === "active"
                ? "font-semibold text-green-500"
                : "font-semibold text-red-500"
            }
          >
            {status}
          </p>
        </div>

        {plan === "trial" && trialEnd && (
          <div>
            <p className="text-sm text-slate-500">
              Trial Ends
            </p>

            <p className="font-semibold text-orange-500">
              {new Date(trialEnd).toLocaleDateString()}
            </p>
          </div>
        )}

      </div>

      <Link
        to="/subscription"
        className="
        mt-8
        flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        bg-cyan-500
        py-3
        font-semibold
        text-white
        transition
        hover:bg-cyan-400
        "
      >
        <Sparkles size={18} />
        Manage Subscription
      </Link>
    </div>
  );
}