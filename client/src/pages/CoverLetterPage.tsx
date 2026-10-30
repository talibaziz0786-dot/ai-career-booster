import {
  Sparkles,
  FileText,
  Loader2,
} from "lucide-react";

import {
  useCoverLetter,
} from "../hooks/cover-letter/useCoverLetter";

import {
  useCoverLetterStore,
} from "../store/cover-letter-store";

export default function CoverLetterPage() {
  const {
    input,

    loading,

    updateField,
  } = useCoverLetterStore();

 const {
  generateCoverLetter,

  copyToClipboard,

  exportPDF,

  exportDOCX,

  result,

  history,
} = useCoverLetter();

  return (
    <div
      className="
      min-h-screen
      bg-slate-50
      px-6
      py-10

      dark:bg-slate-950
      "
    >
      <div
        className="
        mx-auto
        max-w-7xl
        "
      >
        {/* ==========================
            Header
        ========================== */}

        <div
          className="
          mb-10
          flex
          items-center
          gap-4
          "
        >
          <div
            className="
            rounded-2xl
            bg-cyan-500/10
            p-4
            "
          >
            <Sparkles
              className="
              h-8
              w-8
              text-cyan-500
              "
            />
          </div>

          <div>
            <h1
              className="
              text-4xl
              font-black
              "
            >
              AI Cover Letter Generator
            </h1>

            <p
              className="
              mt-1
              text-slate-500

              dark:text-slate-400
              "
            >
              Generate recruiter-ready,
              ATS-friendly cover letters
              instantly.
            </p>
          </div>
        </div>

        {/* ==========================
            Main Grid
        ========================== */}

        <div
          className="
          grid
          gap-8

          lg:grid-cols-2
          "
        >
          {/* ==========================
              Left Card
          ========================== */}

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
            <h2
              className="
              mb-6
              text-2xl
              font-bold
              "
            >
              Candidate Information
            </h2>

            <div
              className="
              grid
              gap-5
              "
            >
              <input
                placeholder="Full Name"
                value={input.fullName}
                onChange={(e) =>
                  updateField(
                    "fullName",
                    e.target.value
                  )
                }
                className="
                rounded-xl
                border
                border-slate-300
                px-4
                py-3

                dark:border-slate-700
                dark:bg-slate-950
                "
              />

              <input
                placeholder="Email"
                value={input.email}
                onChange={(e) =>
                  updateField(
                    "email",
                    e.target.value
                  )
                }
                className="
                rounded-xl
                border
                border-slate-300
                px-4
                py-3

                dark:border-slate-700
                dark:bg-slate-950
                "
              />

              <input
                placeholder="Phone"
                value={input.phone}
                onChange={(e) =>
                  updateField(
                    "phone",
                    e.target.value
                  )
                }
                className="
                rounded-xl
                border
                border-slate-300
                px-4
                py-3

                dark:border-slate-700
                dark:bg-slate-950
                "
              />

              <input
                placeholder="Company Name"
                value={input.companyName}
                onChange={(e) =>
                  updateField(
                    "companyName",
                    e.target.value
                  )
                }
                className="
                rounded-xl
                border
                border-slate-300
                px-4
                py-3

                dark:border-slate-700
                dark:bg-slate-950
                "
              />

              <input
                placeholder="Job Title"
                value={input.jobTitle}
                onChange={(e) =>
                  updateField(
                    "jobTitle",
                    e.target.value
                  )
                }
                className="
                rounded-xl
                border
                border-slate-300
                px-4
                py-3

                dark:border-slate-700
                dark:bg-slate-950
                "
              />




                            <input
                placeholder="Hiring Manager"
                value={input.hiringManager}
                onChange={(e) =>
                  updateField(
                    "hiringManager",
                    e.target.value
                  )
                }
                className="
                rounded-xl
                border
                border-slate-300
                px-4
                py-3

                dark:border-slate-700
                dark:bg-slate-950
                "
              />

              <textarea
                placeholder="Professional Experience"
                rows={5}
                value={input.experience}
                onChange={(e) =>
                  updateField(
                    "experience",
                    e.target.value
                  )
                }
                className="
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                resize-none

                dark:border-slate-700
                dark:bg-slate-950
                "
              />

              <input
                placeholder="Skills (Comma Separated)"
                value={input.skills.join(", ")}
                onChange={(e) =>
                  updateField(
                    "skills",
                    e.target.value
                      .split(",")
                      .map((skill) =>
                        skill.trim()
                      )
                      .filter(Boolean)
                  )
                }
                className="
                rounded-xl
                border
                border-slate-300
                px-4
                py-3

                dark:border-slate-700
                dark:bg-slate-950
                "
              />

              <textarea
                placeholder="Achievements (One per line)"
                rows={4}
                value={input.achievements.join("\n")}
                onChange={(e) =>
                  updateField(
                    "achievements",
                    e.target.value
                      .split("\n")
                      .map((item) =>
                        item.trim()
                      )
                      .filter(Boolean)
                  )
                }
                className="
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                resize-none

                dark:border-slate-700
                dark:bg-slate-950
                "
              />

              <textarea
                placeholder="Projects (One per line)"
                rows={4}
                value={input.projects.join("\n")}
                onChange={(e) =>
                  updateField(
                    "projects",
                    e.target.value
                      .split("\n")
                      .map((item) =>
                        item.trim()
                      )
                      .filter(Boolean)
                  )
                }
                className="
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                resize-none

                dark:border-slate-700
                dark:bg-slate-950
                "
              />

              <div
                className="
                grid
                gap-4
                md:grid-cols-2
                "
              >
                <select
                  value={input.tone}
                  onChange={(e) =>
                    updateField(
                      "tone",
                      e.target.value as
                        | "professional"
                        | "friendly"
                        | "executive"
                    )
                  }
                  className="
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3

                  dark:border-slate-700
                  dark:bg-slate-950
                  "
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
                  value={input.language}
                  onChange={(e) =>
                    updateField(
                      "language",
                      e.target.value as
                        | "english"
                        | "hindi"
                        | "hinglish"
                    )
                  }
                  className="
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3

                  dark:border-slate-700
                  dark:bg-slate-950
                  "
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
                  generateCoverLetter
                }
                disabled={loading}
                className="
                mt-4
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-cyan-500
                px-6
                py-4
                font-bold
                text-white
                transition-all

                hover:bg-cyan-600

                disabled:cursor-not-allowed
                disabled:opacity-70
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

                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles
                      className="
                      h-5
                      w-5
                      "
                    />

                    Generate AI Cover Letter
                  </>
                )}
              </button>

            </div>

          </div>


                    {/* ==========================
              Right Panel
          ========================== */}

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
            <div
              className="
              mb-6
              flex
              items-center
              justify-between
              "
            >
              <div
                className="
                flex
                items-center
                gap-3
                "
              >
                <FileText
                  className="
                  h-7
                  w-7
                  text-cyan-500
                  "
                />

                <h2
                  className="
                  text-2xl
                  font-bold
                  "
                >
                  AI Generated Cover Letter
                </h2>
              </div>

              {result && (
                <div
                  className="
                  flex
                  gap-3
                  "
                >
                  <button
                    onClick={
                      copyToClipboard
                    }
                    className="
                    rounded-xl
                    border
                    border-cyan-500
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-cyan-500

                    hover:bg-cyan-500
                    hover:text-white
                    "
                  >
                    Copy
                  </button>

                  <button
                    onClick={() =>
                      exportPDF(
                        history[0]?.id ?? ""
                      )
                    }
                    className="
                    rounded-xl
                    bg-cyan-500
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-white

                    hover:bg-cyan-600
                    "
                  >
                    PDF
                  </button>

                  <button
                    onClick={() =>
                      exportDOCX(
                        history[0]?.id ?? ""
                      )
                    }
                    className="
                    rounded-xl
                    bg-slate-900
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-white

                    dark:bg-slate-700
                    "
                  >
                    DOCX
                  </button>
                </div>
              )}
            </div>

            {!result ? (
              <div
                className="
                flex
                min-h-[650px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border-2
                border-dashed
                border-slate-300
                text-center

                dark:border-slate-700
                "
              >
                <Sparkles
                  className="
                  mb-6
                  h-16
                  w-16
                  text-cyan-500
                  "
                />

                <h3
                  className="
                  text-2xl
                  font-bold
                  "
                >
                  Your AI Cover Letter
                </h3>

                <p
                  className="
                  mt-3
                  max-w-md
                  text-slate-500

                  dark:text-slate-400
                  "
                >
                  Fill in your details and click
                  Generate to create a premium,
                  recruiter-ready cover letter.
                </p>
              </div>
            ) : (
              <article
                className="
                min-h-[650px]
                space-y-6
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-8
                leading-8

                dark:border-slate-700
                dark:bg-slate-950
                "
              >
                <p>
                  {result.greeting}
                </p>

                <p>
                  {result.introduction}
                </p>

                <p>
                  {result.body}
                </p>

                <p>
                  {result.closing}
                </p>

                <p
                  className="
                  pt-8
                  font-semibold
                  "
                >
                  {result.signature}
                </p>
              </article>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}