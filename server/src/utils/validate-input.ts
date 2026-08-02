export const MAX_TEXT_LENGTH = 20000;

export function asBoundedString(
  value: unknown,
  maxLength: number = MAX_TEXT_LENGTH
): string | null {
  if (
    typeof value !== "string" ||
    value.trim().length === 0 ||
    value.length > maxLength
  ) {
    return null;
  }

  return value;
}

export function asStringArray(
  value: unknown,
  maxItems = 50,
  maxLength = 200
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string" &&
        item.length <= maxLength
    )
    .slice(0, maxItems);
}
