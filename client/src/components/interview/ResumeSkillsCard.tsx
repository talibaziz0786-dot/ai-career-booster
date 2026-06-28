import { useInterviewStore } from "../../store/interview-store";

export default function ResumeSkillsCard() {
  const {
    resumeSkills,
    selectedSkills,
    setSelectedSkills,
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
    </div>
  );
}