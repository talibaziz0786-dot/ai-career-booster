export type PaidPlan =
  | "pro-monthly"
  | "pro-yearly";

interface PlanDefinition {
  durationDays: number;
  amount: number;
  currency: string;
}

export const PAID_PLANS: Record<
  PaidPlan,
  PlanDefinition
> = {
  "pro-monthly": {
    durationDays: 30,
    amount: Number(
      process.env.PLAN_MONTHLY_AMOUNT
    ) || 299,
    currency:
      process.env.PLAN_CURRENCY || "INR",
  },

  "pro-yearly": {
    durationDays: 365,
    amount: Number(
      process.env.PLAN_YEARLY_AMOUNT
    ) || 2999,
    currency:
      process.env.PLAN_CURRENCY || "INR",
  },
};

export function isPaidPlan(
  value: unknown
): value is PaidPlan {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(
      PAID_PLANS,
      value
    )
  );
}
