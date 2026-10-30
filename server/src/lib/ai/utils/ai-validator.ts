export type AIFieldType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "object";

export interface AIFieldRule {
  field: string;
  type: AIFieldType;
  required?: boolean;
}

function matchesType(
  value: unknown,
  type: AIFieldType
): boolean {
  switch (type) {
    case "string":
      return typeof value === "string";

    case "number":
      return (
        typeof value === "number" &&
        Number.isFinite(value)
      );

    case "boolean":
      return typeof value === "boolean";

    case "array":
      return Array.isArray(value);

    case "object":
      return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      );

    default:
      return false;
  }
}

export function validateAIResponse(
  value: unknown,
  rules: AIFieldRule[]
): void {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    throw new Error(
      "AI response must be a JSON object."
    );
  }

  const object =
    value as Record<string, unknown>;

  for (const rule of rules) {
    const fieldValue =
      object[rule.field];

    if (
      fieldValue === undefined ||
      fieldValue === null
    ) {
      if (rule.required) {
        throw new Error(
          `AI response is missing required field: ${rule.field}`
        );
      }

      continue;
    }

    if (
      !matchesType(
        fieldValue,
        rule.type
      )
    ) {
      throw new Error(
        `AI response field "${rule.field}" must be ${rule.type}.`
      );
    }
  }
}