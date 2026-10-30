import axios from "axios";

/**
 * ============================================================
 * CareerBoost AI - Shared HTTP Client
 * ============================================================
 *
 * One centralized HTTP client for external AI providers.
 *
 * Timeout:
 * - Configurable through AI_TIMEOUT_MS
 * - Defaults to 25 seconds
 *
 * We intentionally do NOT automatically retry here.
 * Provider fallback/retry belongs to AIManager.
 * ============================================================
 */

const configuredTimeout =
  Number(
    process.env.AI_TIMEOUT_MS
  );

const timeout =
  Number.isFinite(configuredTimeout) &&
  configuredTimeout >= 5_000 &&
  configuredTimeout <= 120_000
    ? configuredTimeout
    : 25_000;

export const aiHttp =
  axios.create({
    timeout,

    headers: {
      "Content-Type":
        "application/json",

      Accept:
        "application/json",

      "HTTP-Referer":
        process.env.APP_URL ||
        "http://localhost:5173",

      "X-Title":
        "CareerBoost AI",
    },

    /**
     * Prevent Axios from throwing away
     * useful non-2xx responses before our
     * provider adapters inspect them.
     */
    validateStatus: () => true,
  });