export function calculateReadiness(
  sessions: any[]
) {

  if (
    !sessions.length
  ) {
    return 0;
  }

  const total =
    sessions.reduce(
      (sum, session) =>
        sum +
        session.overallScore,
      0
    );

  return Math.round(
    total /
      sessions.length
  );
}