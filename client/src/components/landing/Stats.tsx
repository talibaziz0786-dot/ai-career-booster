
import { motion } from "framer-motion";


export default function Stats() {
  const stats = [
    {
      value: "50K+",
      label: "Resumes Built",
    },
    {
      value: "10K+",
      label: "Interviews",
    },
    {
      value: "98%",
      label: "ATS Success",
    },
    {
      value: "4.9★",
      label: "User Rating",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((item) => (
           <motion.div
  key={item.label}
  whileHover={{
    scale: 1.05,
  }}
  transition={{
    duration: 0.2,
  }}
  className="
  rounded-3xl
  border
  border-slate-200
  bg-white
  dark:border-white/10
  dark:bg-white/5
  p-8
  text-center
"
>
              <h3 className="text-4xl font-bold text-cyan-500">
                {item.value}
              </h3>

              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}