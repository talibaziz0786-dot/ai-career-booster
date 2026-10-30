export function normalizeScore(
  score: unknown
): number {
  let value = Number(score);

  if (Number.isNaN(value)) {
    return 0;
  }

  // AI returned 0–10
  if (value <= 10) {
    value *= 10;
  }

  // Clamp

  value = Math.max(
    0,
    Math.min(100, value)
  );

  return Math.round(value);
}