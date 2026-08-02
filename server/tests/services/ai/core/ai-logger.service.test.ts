import { beforeEach, describe, expect, it } from "vitest";

import {
  clearAILogs,
  getAILogs,
  logAIRequest,
  type AILogEntry,
} from "../../../../src/services/ai/core/ai-logger.service.js";

function entry(module: string): AILogEntry {
  return {
    module,
    provider: "gemini-2.5-flash",
    success: true,
    latency: 120,
    retries: 0,
    timestamp: "2026-01-01T00:00:00.000Z",
  };
}

describe("ai logger", () => {
  beforeEach(() => {
    clearAILogs();
  });

  it("starts empty", () => {
    expect(getAILogs()).toEqual([]);
  });

  it("keeps the newest entry first", () => {
    logAIRequest(entry("resume"));
    logAIRequest(entry("interview"));

    expect(getAILogs().map((log) => log.module)).toEqual([
      "interview",
      "resume",
    ]);
  });

  it("caps the buffer at 500 entries and drops the oldest", () => {
    for (let i = 0; i < 501; i++) {
      logAIRequest(entry(`module-${i}`));
    }

    const logs = getAILogs();

    expect(logs).toHaveLength(500);
    expect(logs[0].module).toBe("module-500");
    expect(logs[logs.length - 1].module).toBe("module-1");
  });

  it("clearAILogs empties the buffer in place", () => {
    logAIRequest(entry("resume"));

    const logs = getAILogs();
    clearAILogs();

    expect(logs).toHaveLength(0);
    expect(getAILogs()).toEqual([]);
  });
});
