import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Is CareerBoost AI free?",
    answer:
      "Yes. We provide a free plan with limited usage.",
  },
  {
    question: "Does ATS Checker improve scores?",
    answer:
      "Yes. AI suggests improvements and optimization.",
  },
  {
    question: "Can I export PDF resumes?",
    answer:
      "Yes. PDF export is supported.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-32">
      <div className="mx-auto max-w-4xl px-6">
        <h2
  className="
  text-center
  text-5xl
  font-black
  text-slate-900
  dark:text-white
  "
>
          FAQ
        </h2>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="
rounded-2xl
border
border-slate-200
bg-white
shadow-lg

dark:border-white/10
dark:bg-white/5
"
            >
              <button
                type="button"
                onClick={() =>
                  setActive(
                    active === index ? null : index
                  )
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span
  className="
  font-semibold
  text-slate-900
  dark:text-white
  "
>
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition ${
                    active === index
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {active === index && (
                <AnimatePresence>
  {active === index && (
    <motion.div
      initial={{
        height: 0,
        opacity: 0,
      }}
      animate={{
        height: "auto",
        opacity: 1,
      }}
      exit={{
        height: 0,
        opacity: 0,
      }}
      className="
      overflow-hidden
      px-6
      pb-6
      text-slate-600
      dark:text-slate-400
    "
    >
      {faq.answer}
    </motion.div>
  )}
</AnimatePresence>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}