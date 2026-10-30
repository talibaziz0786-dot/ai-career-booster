import { useInterviewStore } from "../../store/interview-store";

export default function ResumeSkillsCard() {
  const {
    resumeSkills,
    selectedSkills,
    setSelectedSkills,
    customTopic,
    setCustomTopic,
  } = useInterviewStore();

  const toggleSkill = (
    skill: string
  ) => {
    const exists =
      selectedSkills.includes(skill);

    if (exists) {
      setSelectedSkills(
        selectedSkills.filter(
          (s) => s !== skill
        )
      );
    } else {
      setSelectedSkills([
        ...selectedSkills,
        skill,
      ]);
    }
  };

  return (
    <div
      className="
      rounded-3xl
      bg-white
      p-6
      shadow-lg

      dark:bg-slate-900

      md:col-span-2
      xl:col-span-4
      "
    >
      <h3
        className="
        mb-2
        text-xl
        font-bold
        "
      >
        Detected Skills
      </h3>

      <p>
  Skills Count:
  {resumeSkills.length}
</p>

      <p
        className="
        mb-5
        text-sm
        text-slate-500
        "
      >
        Select skills you want
        AI to focus on.
      </p>

      <div
        className="
        flex
        flex-wrap
        gap-3
        "
      >
        {resumeSkills.map(
          (skill) => {
            const selected =
              selectedSkills.includes(
                skill
              );

              console.log(
  "RESUME SKILLS:",
  resumeSkills
);

console.log(
  "SELECTED SKILLS:",
  selectedSkills
);

            return (
              <button
                key={skill}
                type="button"
                onClick={() =>
                  toggleSkill(skill)
                }
                className={`
                rounded-full
                px-4
                py-2
                text-sm
                font-semibold
                transition

                ${
                  selected
                    ? `
                    bg-cyan-500
                    text-white
                    shadow-lg
                    `
                    : `
                    bg-slate-100
                    text-slate-700

                    dark:bg-slate-800
                    dark:text-slate-300
                    `
                }
                `}
              >
                {skill}


              </button>
            );
          }
        )}
      </div>

      <div
        className="
        mt-5
        text-sm
        text-slate-500
        "
      >
        Selected:
        {" "}
        {selectedSkills.length}
      </div>

      {/* Custom Interview Subject Option */}
      <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-800">
        <label
          htmlFor="custom-interview-subject"
          className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
        >
          Or Take Interview on a Custom Subject / Skill
        </label>
        <div className="flex gap-3">
          <input
            id="custom-interview-subject"
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="e.g. System Design, React Advanced, Node.js Microservices..."
            className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          {customTopic && (
            <button
              type="button"
              onClick={() => setCustomTopic("")}
              className="rounded-xl bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            >
              Clear
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          If specified, the AI coach will tailor the entire interview session specifically around this custom subject.
        </p>
      </div>
    </div>
  );
}