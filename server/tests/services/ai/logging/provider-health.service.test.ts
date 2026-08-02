import { beforeEach, describe, expect, it, vi } from "vitest";

describe("provider health", () => {
  let updateProviderHealth: typeof import("../../../../src/services/ai/logging/provider-health.service.js")["updateProviderHealth"];
  let getProviderHealth: typeof import("../../../../src/services/ai/logging/provider-health.service.js")["getProviderHealth"];

  beforeEach(async () => {
    vi.resetModules();

    const module = await import(
      "../../../../src/services/ai/logging/provider-health.service.js"
    );

    updateProviderHealth = module.updateProviderHealth;
    getProviderHealth = module.getProviderHealth;
  });

  it("starts with no tracked providers", () => {
    expect(getProviderHealth()).toEqual([]);
  });

  it("creates an entry on the first successful request", () => {
    updateProviderHealth("gemini-2.5-pro", true, 200);

    expect(getProviderHealth()).toEqual([
      {
        provider: "gemini-2.5-pro",
        healthy: true,
        averageResponseTime: 100,
        totalRequests: 1,
        failedRequests: 0,
        successRate: 100,
      },
    ]);
  });

  it("counts failures and lowers the success rate", () => {
    updateProviderHealth("deepseek", true, 100);
    updateProviderHealth("deepseek", false, 100);

    const [health] = getProviderHealth();

    expect(health.totalRequests).toBe(2);
    expect(health.failedRequests).toBe(1);
    expect(health.successRate).toBe(50);
  });

  it("marks a provider unhealthy once the success rate drops to 70% or below", () => {
    updateProviderHealth("qwen", true, 100);
    updateProviderHealth("qwen", false, 100);

    expect(getProviderHealth()[0].healthy).toBe(false);
  });

  it("keeps a provider healthy while the success rate stays above 70%", () => {
    for (let i = 0; i < 4; i++) {
      updateProviderHealth("local", true, 100);
    }
    updateProviderHealth("local", false, 100);

    const [health] = getProviderHealth();

    expect(health.successRate).toBe(80);
    expect(health.healthy).toBe(true);
  });

  it("smooths the average response time across requests", () => {
    updateProviderHealth("gemini-2.5-flash", true, 400);
    updateProviderHealth("gemini-2.5-flash", true, 400);

    expect(getProviderHealth()[0].averageResponseTime).toBe(300);
  });

  it("tracks providers independently", () => {
    updateProviderHealth("gemini-2.5-pro", true, 100);
    updateProviderHealth("deepseek", false, 100);

    expect(getProviderHealth().map((health) => health.provider)).toEqual([
      "gemini-2.5-pro",
      "deepseek",
    ]);
  });
});
