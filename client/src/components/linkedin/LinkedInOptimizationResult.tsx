import { motion } from "framer-motion";

import {
  Copy,
  Download,
  CheckCircle2,
} from "lucide-react";

import toast from "react-hot-toast";

interface Props {
  headline: string;

  about: string;

  keywords: string[];

  suggestions: string[];
}

export default function LinkedInOptimizationResult({
  headline,
  about,
  keywords,
  suggestions,
}: Props) {
  const copyToClipboard = async (
    text: string,
    label: string
  ) => {
    await navigator.clipboard.writeText(text);

    toast.success(`${label} copied`);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
      space-y-8
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      shadow-xl

      dark:border-slate-800
      dark:bg-slate-900
      "
    >
      {/* Headline */}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            LinkedIn Headline
          </h2>

          <button
            onClick={() =>
              copyToClipboard(
                headline,
                "Headline"
              )
            }
            className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-cyan-500
            px-4
            py-2
            text-white
            "
          >
            <Copy size={16} />

            Copy
          </button>
        </div>

        <div
          className="
          rounded-2xl
          bg-slate-100
          p-5

          dark:bg-slate-800
          "
        >
          {headline}
        </div>
      </section>

      {/* About */}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            About Section
          </h2>

          <button
            onClick={() =>
              copyToClipboard(
                about,
                "About"
              )
            }
            className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-cyan-500
            px-4
            py-2
            text-white
            "
          >
            <Copy size={16} />

            Copy
          </button>
        </div>

        <div
          className="
          whitespace-pre-wrap
          rounded-2xl
          bg-slate-100
          p-5

          dark:bg-slate-800
          "
        >
          {about}
        </div>
      </section>

      {/* Keywords */}

      <section>
        <h2 className="mb-4 text-xl font-bold">
          ATS Keywords
        </h2>

        <div className="flex flex-wrap gap-3">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="
              rounded-full
              bg-cyan-100
              px-4
              py-2
              text-sm
              font-semibold
              text-cyan-700

              dark:bg-cyan-900/30
              dark:text-cyan-300
              "
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>

      {/* Suggestions */}

      <section>
        <h2 className="mb-4 text-xl font-bold">
          Improvement Suggestions
        </h2>

        <div className="space-y-3">
          {suggestions.map(
            (item, index) => (
              <div
                key={index}
                className="
                flex
                items-start
                gap-3
                rounded-xl
                bg-slate-100
                p-4

                dark:bg-slate-800
                "
              >
                <CheckCircle2
                  className="
                  mt-1
                  text-green-500
                  "
                  size={18}
                />

                <span>{item}</span>
              </div>
            )
          )}
        </div>
      </section>

      {/* Export */}

      <div className="flex justify-end">
        <button
          className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-emerald-600
          px-5
          py-3
          font-semibold
          text-white
          hover:bg-emerald-700
          "
        >
          <Download size={18} />

          Export
        </button>
      </div>
    </motion.div>
  );
}