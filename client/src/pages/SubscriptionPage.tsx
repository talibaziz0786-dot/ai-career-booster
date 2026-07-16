import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

import {
  useSubscriptionStore,
} from "../store/subscription-store";

import {
  getSubscription,
} from "../api/subscription.api";

const freeFeatures = [
  "Resume Builder",
  "Basic ATS Score",
  "2 AI Interviews",
  "Limited AI Credits",
];

const proFeatures = [
  "Unlimited Resume Builder",
  "Unlimited ATS Analysis",
  "Unlimited AI Interviews",
  "Premium AI Resume",
  "Premium AI Cover Letter",
  "LinkedIn Optimizer",
  "Job Tracker",
  "Priority Support",
];

export default function SubscriptionPage() {
  const {
  plan,
  status,
  trialEnd,
  setSubscription,
} =
useSubscriptionStore();

useEffect(() => {

  async function loadSubscription() {

    try {

      const response =
        await getSubscription();

      setSubscription({

        plan:
          response.subscription.plan,

        status:
          response.subscription.status,

        expiresAt:
          response.subscription.expiresAt ??
          null,

        trialEnd:
          response.subscription.trialEnd ??
          null,

      });

    } catch (error) {

      console.error(error);

    }

  }

  loadSubscription();

}, [setSubscription]);


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6">

      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <h1 className="text-5xl font-black text-slate-900 dark:text-white">
            Choose Your Plan
          </h1>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
            Start free. Upgrade only when you love CareerBoost AI.
          </p>

        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-2">

          {/* FREE */}

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl dark:border-white/10 dark:bg-slate-900"
          >

            <h2 className="text-3xl font-bold">
              Free
            </h2>

            <p className="mt-3 text-6xl font-black">
              ₹0
            </p>

            <p className="mt-3 text-slate-500">
              Forever Free
            </p>

            <div className="mt-10 space-y-4">

              {freeFeatures.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    className="text-green-500"
                    size={18}
                  />

                  {item}

                </div>

              ))}

            </div>

            <button
              className="
              mt-12
              w-full
              rounded-2xl
              bg-slate-900
              py-4
              font-semibold
              text-white
              dark:bg-white
              dark:text-black
              "
            >
             {plan === "free"
  ? "Current Plan"
  : "Choose Free"}
            </button>

          </motion.div>

          {/* PRO */}

          <motion.div
            whileHover={{ y: -8 }}
            className="
            relative
            rounded-3xl
            border-2
            border-cyan-500
            bg-gradient-to-br
            from-cyan-500/10
            to-blue-500/10
            p-10
            shadow-2xl
            "
          >

            <div
              className="
              absolute
              right-6
              top-6
              rounded-full
              bg-cyan-500
              px-4
              py-1
              text-sm
              font-bold
              text-white
              "
            >
              MOST POPULAR
            </div>

            <h2 className="text-3xl font-bold text-white">
              Pro
            </h2>

            <p className="mt-3 text-6xl font-black text-white">
              ₹299
            </p>

            <p className="mt-3 text-cyan-200">
              / month
            </p>

            <div className="mt-6 rounded-xl bg-green-500 px-4 py-3 text-center font-semibold text-white">
              {plan === "trial" ? (

<div
className="
mt-6
rounded-xl
bg-green-500
px-4
py-3
text-center
font-semibold
text-white
"
>

🎁 Trial Active

</div>

) : (

<div
className="
mt-6
rounded-xl
bg-cyan-600
px-4
py-3
text-center
font-semibold
text-white
"
>

Upgrade Anytime

</div>

)}
            </div>

            <div className="mt-10 space-y-4 text-white">

              {proFeatures.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    className="text-green-400"
                    size={18}
                  />

                  {item}

                </div>

              ))}

            </div>

            <button
              className="
              mt-12
              w-full
              rounded-2xl
              bg-cyan-500
              py-4
              font-bold
              text-white
              hover:bg-cyan-400
              transition
              "
            >
              {plan === "pro-monthly" ||
plan === "pro-yearly"

? "Current Plan"

: "Upgrade to Pro"}
            </button>

          </motion.div>

        </div>

      </div>

    </div>
  );
}