import crypto from "node:crypto";

import { SUBSCRIPTION_PLANS } from "../constants/subscriptionPlans.js";

export type PaidPlanId = "pro-monthly" | "pro-yearly";

export interface PaidPlan {
  id: PaidPlanId;
  name: string;
  price: number;
  durationDays: number;
}

const PAID_PLANS: Record<PaidPlanId, PaidPlan> = {
  "pro-monthly": SUBSCRIPTION_PLANS.PRO_MONTHLY,
  "pro-yearly": SUBSCRIPTION_PLANS.PRO_YEARLY,
};

export function getPaidPlan(
  planId: unknown
): PaidPlan | null {
  if (
    typeof planId !== "string" ||
    !Object.prototype.hasOwnProperty.call(PAID_PLANS, planId)
  ) {
    return null;
  }

  return PAID_PLANS[planId as PaidPlanId];
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret = process.env.RAZORPAY_KEY_SECRET
): boolean {
  if (!secret) {
    throw new Error("RAZORPAY_KEY_SECRET is missing.");
  }

  if (!orderId || !paymentId || !signature) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "utf8");
  const signatureBuffer = Buffer.from(signature, "utf8");

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}

export function planExpiryDate(
  plan: PaidPlan,
  from = new Date()
): Date {
  return new Date(
    from.getTime() + plan.durationDays * 24 * 60 * 60 * 1000
  );
}
