import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UpgradeModal({
  open,
  onClose,
}: UpgradeModalProps) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-md
        p-5
        "
      >
        <motion.div
          initial={{
            scale: 0.9,
            opacity: 0,
            y: 40,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: 0.9,
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
          relative
          w-full
          max-w-2xl
          overflow-hidden
          rounded-3xl

          border
          border-slate-200

          bg-white

          shadow-2xl

          dark:border-white/10
          dark:bg-slate-950
          "
        >
          <button
            onClick={onClose}
            className="
            absolute
            right-5
            top-5

            rounded-xl

            p-2

            hover:bg-slate-100

            dark:hover:bg-white/10
            "
          >
            <X size={20} />
          </button>

          <div className="p-10">

            <div className="flex justify-center">
              <div
                className="
                flex
                h-20
                w-20
                items-center
                justify-center

                rounded-full

                bg-gradient-to-r
                from-cyan-500
                to-blue-600

                text-white
                "
              >
                <Crown size={36} />
              </div>
            </div>

            <h2
              className="
              mt-8
              text-center
              text-4xl
              font-black
              "
            >
              Unlock Pro AI
            </h2>

            <p
              className="
              mt-4
              text-center
              text-slate-500
              dark:text-slate-400
              "
            >
              You've reached today's free AI limit.
              Upgrade to continue with unlimited AI.
            </p>

            <div
              className="
              mt-10

              rounded-2xl

              bg-gradient-to-r

              from-green-500
              to-emerald-500

              p-5

              text-center

              font-bold

              text-white
              "
            >
              🎁 Start with 3 Days FREE Trial
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">

              <div
                className="
                rounded-2xl
                border
                border-slate-200
                p-6

                dark:border-white/10
                "
              >
                <h3 className="text-2xl font-bold">
                  Monthly
                </h3>

                <p className="mt-3 text-5xl font-black">
                  ₹299
                </p>

                <div className="mt-6 space-y-3">

                  <Feature text="Unlimited AI Resume" />

                  <Feature text="Unlimited ATS Score" />

                  <Feature text="Unlimited Interviews" />

                  <Feature text="Premium AI Models" />

                </div>

                <Link
                  to="/subscription"
                  className="
                  mt-8
                  block
                  rounded-2xl
                  bg-cyan-500
                  py-4
                  text-center
                  font-bold
                  text-white
                  hover:bg-cyan-600
                  "
                >
                  Upgrade Now
                </Link>

              </div>

              <div
                className="
                rounded-2xl

                border-2

                border-cyan-500

                bg-gradient-to-br

                from-cyan-500/10

                to-blue-500/10

                p-6
                "
              >
                <div
                  className="
                  inline-flex

                  items-center

                  gap-2

                  rounded-full

                  bg-cyan-500

                  px-3

                  py-1

                  text-xs

                  font-bold

                  text-white
                  "
                >
                  <Sparkles size={14} />

                  BEST VALUE
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  Yearly
                </h3>

                <p className="mt-3 text-5xl font-black">
                  ₹1999
                </p>

                <p className="mt-2 text-green-500 font-semibold">
                  Save 44%
                </p>

                <div className="mt-6 space-y-3">

                  <Feature text="Everything in Monthly" />

                  <Feature text="Priority AI Queue" />

                  <Feature text="Future AI Features" />

                  <Feature text="Early Access" />

                </div>

                <Link
                  to="/subscription"
                  className="
                  mt-8
                  block

                  rounded-2xl

                  bg-cyan-500

                  py-4

                  text-center

                  font-bold

                  text-white

                  hover:bg-cyan-600
                  "
                >
                  Go Yearly
                </Link>

              </div>

            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2
        className="text-green-500"
        size={18}
      />

      <span>{text}</span>
    </div>
  );
}