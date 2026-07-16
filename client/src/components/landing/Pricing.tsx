import SectionHeading from "../common/SectionHeading";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store";

const plans = [
  {
    name: "Free",
    price: "$0",
    popular: false,
    features: ["Basic Resume Builder", "ATS Checker", "3 Resume Exports"],
  },
  {
    name: "Pro",
    price: "$19",
    popular: true,
    features: [
      "Unlimited Resumes",
      "AI Cover Letters",
      "Interview Prep",
      "LinkedIn Optimizer",
      "Priority Support",
    ],
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <section id="pricing" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          badge="Pricing"
          title="Choose Your Plan"
          description="Start free and upgrade when you're ready."
        />

        <div className="mt-20 grid gap-8 md:grid-cols-2 ">
          {plans.map((plan) => (
            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              transition={{
                duration: 0.2,
              }}
              key={plan.name}
              className={`relative rounded-3xl border p-10 backdrop-blur-xl ${
                plan.popular
                  ? "border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-500/10 dark:to-blue-500/10"
                  : "border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-white/5"
              }`}
            >
              {plan.popular && (
                <span className="absolute right-6 top-6 rounded-full bg-cyan-500 px-3 py-1 text-xs font-bold text-white">
                  MOST POPULAR
                </span>
              )}

              <h3
                className="
                        text-2xl
                        font-bold
                        text-slate-900
                        dark:text-white
                        "
              >
                {plan.name}
              </h3>

              <p className="mt-4 text-6xl font-black text-cyan-400">
                {plan.price}
              </p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="
  text-slate-700
  dark:text-slate-300
  "
                  >
                    ✓ {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/register");
                    return;
                  }

                  navigate("/subscription");
                }}
                className="mt-10 w-full rounded-2xl bg-cyan-500 py-4 font-semibold text-white"
              >
                {plan.name === "Free" ? "Start Free" : "Upgrade Now"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
