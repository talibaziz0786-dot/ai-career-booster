export function getStrongestSkill(
  sessions: any[]
) {

  const skills:
    Record<
      string,
      number
    > = {};

  sessions.forEach(
    (session) => {

      session.strengths?.forEach(
        (
          skill: string
        ) => {

          skills[skill] =
            (
              skills[
                skill
              ] || 0
            ) + 1;

        }
      );

    }
  );

  return Object.keys(
    skills
  ).sort(
    (a, b) =>
      skills[b] -
      skills[a]
  )[0];
}