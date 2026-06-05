import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aman Sharma",
    role: "Frontend Developer",
    text: "My ATS score improved from 52% to 94%.",
  },
  {
    name: "Sara Khan",
    role: "UI Designer",
    text: "Got interview calls within one week.",
  },
  {
    name: "Rahul Verma",
    role: "Software Engineer",
    text: "The resume builder is incredibly powerful.",
  },
];

export default function Testimonials() {
  return (
    <section className="pt-32 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
             <h2
                className="
                text-5xl
                font-black
                text-slate-900
                dark:text-white
                -mt-10
                "
              >

            Success Stories
          </h2>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
           <motion.div
  whileHover={{
    y: -8,
  }}
  transition={{
    duration: 0.2,
  }}
              key={item.name}
              className="rounded-3xl border border-black dark:border-white/10  bg-white/5 p-8 backdrop-blur-xl"
            >
              <p
  className="
  text-slate-700
  dark:text-slate-300
  "
>
                "{item.text}"
              </p>

              <div className="mt-6">
               <h4
  className="
  font-bold
  text-slate-900
  dark:text-white
  "
>
                  {item.name}
                </h4>

                <p className="text-slate-400">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}