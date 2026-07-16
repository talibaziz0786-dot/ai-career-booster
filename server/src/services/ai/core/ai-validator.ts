export interface ValidationRule {
  field: string;
  type: "string" | "number" | "boolean" | "array" | "object";
  required?: boolean;
}

export function validateAIResponse<T extends object>(
  data: T,
  rules: ValidationRule[]
): true {

  for (const rule of rules) {

    const value = (data as any)[rule.field];

    if (rule.required && value === undefined) {
      throw new Error(`Missing required field: ${rule.field}`);
    }

    if (value === undefined) {
      continue;
    }

    switch (rule.type) {

      case "string":
        if (typeof value !== "string") {
          throw new Error(`${rule.field} must be string`);
        }
        break;

      case "number":
        if (typeof value !== "number") {
          throw new Error(`${rule.field} must be number`);
        }
        break;

      case "boolean":
        if (typeof value !== "boolean") {
          throw new Error(`${rule.field} must be boolean`);
        }
        break;

      case "array":
        if (!Array.isArray(value)) {
          throw new Error(`${rule.field} must be array`);
        }
        break;

      case "object":
        if (
          typeof value !== "object" ||
          value === null ||
          Array.isArray(value)
        ) {
          throw new Error(`${rule.field} must be object`);
        }
        break;
    }
  }

  return true;
}