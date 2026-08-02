import { describe, expect, it } from "vitest";

import { SUBSCRIPTION_PLANS } from "../../src/constants/subscriptionPlans.js";

describe("SUBSCRIPTION_PLANS", () => {
  it("exposes every plan id used by the subscription flow", () => {
    expect(
      Object.values(SUBSCRIPTION_PLANS).map((plan) => plan.id)
    ).toEqual(["free", "trial", "pro-monthly", "pro-yearly"]);
  });

  it("keeps free plans priced at zero", () => {
    expect(SUBSCRIPTION_PLANS.FREE.price).toBe(0);
    expect(SUBSCRIPTION_PLANS.TRIAL.price).toBe(0);
  });

  it("makes the yearly plan cheaper per day than the monthly plan", () => {
    const monthly =
      SUBSCRIPTION_PLANS.PRO_MONTHLY.price /
      SUBSCRIPTION_PLANS.PRO_MONTHLY.durationDays;

    const yearly =
      SUBSCRIPTION_PLANS.PRO_YEARLY.price /
      SUBSCRIPTION_PLANS.PRO_YEARLY.durationDays;

    expect(yearly).toBeLessThan(monthly);
  });

  it("gives the trial a 3 day duration and free plans no duration", () => {
    expect(SUBSCRIPTION_PLANS.TRIAL.durationDays).toBe(3);
    expect(SUBSCRIPTION_PLANS.FREE.durationDays).toBe(0);
  });
});
