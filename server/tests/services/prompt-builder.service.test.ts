import { describe, expect, it } from "vitest";

import { buildPrompt } from "../../src/services/prompt-builder.service.js";

describe("buildPrompt", () => {
  it("builds a concise prompt for the basic tier", () => {
    const prompt = buildPrompt("basic", "Improve my resume");

    expect(prompt).toContain("You are a career assistant.");
    expect(prompt).toContain("Maximum 250 words.");
    expect(prompt).toContain("Improve my resume");
    expect(prompt).not.toContain("Premium");
  });

  it("builds a detailed prompt for the premium tier", () => {
    const prompt = buildPrompt("premium", "Improve my resume");

    expect(prompt).toContain("You are CareerBoost AI Premium.");
    expect(prompt).toContain("ATS optimization");
    expect(prompt).toContain("Improve my resume");
    expect(prompt).not.toContain("Maximum 250 words.");
  });

  it("keeps the user prompt at the end of the template", () => {
    const prompt = buildPrompt("basic", "UNIQUE_MARKER");

    expect(prompt.trimEnd().endsWith("UNIQUE_MARKER")).toBe(true);
  });
});
