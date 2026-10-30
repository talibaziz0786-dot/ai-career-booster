import { useState } from "react";

import {
  motion,
} from "framer-motion";

import {
  Sparkles,
  
  Loader2,
} from "lucide-react";

import {
  FaLinkedin,
} from "react-icons/fa";

import {
  useLinkedInStore,
} from "../store/linkedin-store";

import {
  useLinkedInOptimizer,
} from "../hooks/linkedin/useLinkedInOptimizer";

import type {
  LinkedInOptimizeRequest,
} from "../types/linkedin/linkedin.types";

export default function LinkedInOptimizerPage() {
  const {
    profile,

    updateField,

    result,
  } =
    useLinkedInStore();

  const {
    optimizeProfile,

    loading,
  } =
    useLinkedInOptimizer();

  const [
    tone,
    setTone,
  ] =
    useState<
      LinkedInOptimizeRequest["tone"]
    >(
      "professional"
    );

  const [
    language,
    setLanguage,
  ] =
    useState<
      LinkedInOptimizeRequest["language"]
    >(
      "english"
    );

  async function handleGenerate() {
    await optimizeProfile({
      tone,

      language,
    });
  }

  return (
    <div
      className="
      min-h-screen
      bg-slate-50
      px-6
      py-12

      dark:bg-slate-950
      "
    >
      <div
        className="
        mx-auto
        max-w-7xl
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <div
            className="
            mb-8
            flex
            items-center
            gap-4
            "
          >
            <FaLinkedin
              className="
              h-10
              w-10
              text-cyan-500
              "
            />

            <div>
              <h1
                className="
                text-4xl
                font-black
                "
              >
                AI LinkedIn Optimizer
              </h1>

              <p
                className="
                mt-2
                text-slate-500
                "
              >
                Generate an ATS-friendly,
                recruiter-focused LinkedIn
                profile using AI.
              </p>
            </div>
          </div>

          <div
            className="
            grid
            gap-8

            lg:grid-cols-2
            "
          >

                        {/* ==========================================
                Left Panel
            ========================================== */}

            <div
              className="
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
              <div className="space-y-5">

                <input
                  placeholder="Full Name"
                  value={profile.fullName}
                  onChange={(e) =>
                    updateField(
                      "fullName",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-transparent p-3 dark:border-slate-700"
                />

                <input
                  placeholder="Headline"
                  value={profile.headline}
                  onChange={(e) =>
                    updateField(
                      "headline",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-transparent p-3 dark:border-slate-700"
                />

                <input
                  placeholder="Current Role"
                  value={profile.currentRole}
                  onChange={(e) =>
                    updateField(
                      "currentRole",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-transparent p-3 dark:border-slate-700"
                />

                <input
                  type="number"
                  placeholder="Years of Experience"
                  value={profile.yearsOfExperience}
                  onChange={(e) =>
                    updateField(
                      "yearsOfExperience",
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-transparent p-3 dark:border-slate-700"
                />

                <input
                  placeholder="Location"
                  value={profile.location}
                  onChange={(e) =>
                    updateField(
                      "location",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-transparent p-3 dark:border-slate-700"
                />

                <input
                  placeholder="Target Role"
                  value={profile.targetRole}
                  onChange={(e) =>
                    updateField(
                      "targetRole",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-transparent p-3 dark:border-slate-700"
                />

                <input
                  placeholder="Industry"
                  value={profile.industry}
                  onChange={(e) =>
                    updateField(
                      "industry",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-transparent p-3 dark:border-slate-700"
                />

                <textarea
                  rows={6}
                  placeholder="Professional Summary"
                  value={profile.summary}
                  onChange={(e) =>
                    updateField(
                      "summary",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-transparent p-3 dark:border-slate-700"
                />

                <input
                  placeholder="Skills (comma separated)"
                  value={profile.skills.join(", ")}
                  onChange={(e) =>
                    updateField(
                      "skills",
                      e.target.value
                        .split(",")
                        .map((item) =>
                          item.trim()
                        )
                        .filter(Boolean)
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-transparent p-3 dark:border-slate-700"
                />

                <textarea
                  rows={4}
                  placeholder="Achievements (one per comma)"
                  value={profile.achievements.join(", ")}
                  onChange={(e) =>
                    updateField(
                      "achievements",
                      e.target.value
                        .split(",")
                        .map((item) =>
                          item.trim()
                        )
                        .filter(Boolean)
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-transparent p-3 dark:border-slate-700"
                />

                <div className="grid grid-cols-2 gap-4">

                  <select
                    value={tone}
                    onChange={(e) =>
                      setTone(
                        e.target.value as LinkedInOptimizeRequest["tone"]
                      )
                    }
                    className="rounded-xl border border-slate-300 bg-transparent p-3 dark:border-slate-700"
                  >
                    <option value="professional">
                      Professional
                    </option>

                    <option value="friendly">
                      Friendly
                    </option>

                    <option value="executive">
                      Executive
                    </option>
                  </select>

                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(
                        e.target.value as LinkedInOptimizeRequest["language"]
                      )
                    }
                    className="rounded-xl border border-slate-300 bg-transparent p-3 dark:border-slate-700"
                  >
                    <option value="english">
                      English
                    </option>

                    <option value="hindi">
                      Hindi
                    </option>

                    <option value="hinglish">
                      Hinglish
                    </option>
                  </select>

                </div>

                <button
                  onClick={
                    handleGenerate
                  }
                  disabled={loading}
                  className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-cyan-500
                  px-6
                  py-4
                  font-bold
                  text-white
                  transition

                  hover:bg-cyan-600
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  "
                >
                  {loading ? (
                    <>
                      <Loader2
                        className="
                        h-5
                        w-5
                        animate-spin
                        "
                      />

                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Sparkles
                        className="
                        h-5
                        w-5
                        "
                      />

                      Optimize LinkedIn Profile
                    </>
                  )}
                </button>

              </div>
            </div>

                        {/* ==========================================
                Right Panel
            ========================================== */}

            <div
              className="
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
              {!result ? (
                <div
                  className="
                  flex
                  h-full
                  min-h-[650px]
                  items-center
                  justify-center
                  text-center
                  "
                >
                  <div>
                    <Sparkles
                      className="
                      mx-auto
                      mb-5
                      h-14
                      w-14
                      text-cyan-500
                      "
                    />

                    <h2
                      className="
                      text-2xl
                      font-bold
                      "
                    >
                      AI Results
                    </h2>

                    <p
                      className="
                      mt-4
                      text-slate-500
                      "
                    >
                      Generate your optimized
                      LinkedIn profile to see
                      recruiter-ready suggestions.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">

                  <div>
                    <h2 className="text-xl font-bold">
                      Optimized Headline
                    </h2>

                    <p className="mt-3">
                      {result.optimizedHeadline}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Professional Summary
                    </h2>

                    <p className="mt-3 whitespace-pre-line">
                      {result.optimizedSummary}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Profile Score
                    </h2>

                    <div
                      className="
                      mt-4
                      rounded-2xl
                      bg-cyan-500
                      px-6
                      py-4
                      text-4xl
                      font-black
                      text-white
                      "
                    >
                      {result.profileScore}/100
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      ATS Keywords
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {result.atsKeywords.map((item) => (
                        <span
                          key={item}
                          className="
                          rounded-full
                          bg-cyan-100
                          px-4
                          py-2
                          text-sm
                          dark:bg-cyan-900
                          "
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Recruiter Keywords
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {result.recruiterKeywords.map((item) => (
                        <span
                          key={item}
                          className="
                          rounded-full
                          bg-emerald-100
                          px-4
                          py-2
                          text-sm
                          dark:bg-emerald-900
                          "
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Strengths
                    </h2>

                    <ul className="mt-4 list-disc space-y-2 pl-6">
                      {result.strengths.map((item) => (
                        <li key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Improvements
                    </h2>

                    <ul className="mt-4 list-disc space-y-2 pl-6">
                      {result.improvements.map((item) => (
                        <li key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      SEO Suggestions
                    </h2>

                    <ul className="mt-4 list-disc space-y-2 pl-6">
                      {result.seoSuggestions.map((item) => (
                        <li key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Networking Tips
                    </h2>

                    <ul className="mt-4 list-disc space-y-2 pl-6">
                      {result.networkingTips.map((item) => (
                        <li key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Call To Action
                    </h2>

                    <p className="mt-3">
                      {result.callToAction}
                    </p>
                  </div>

                </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}