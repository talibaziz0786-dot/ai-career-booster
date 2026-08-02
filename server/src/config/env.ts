export function requireEnv(
  name: string
): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }

  return value;
}

export function getAllowedOrigins(): string[] {
  const configured =
    process.env.CORS_ORIGINS;

  if (!configured) {
    return [
      "http://localhost:5173",
    ];
  }

  return configured
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}
