import type { AuthRequest } from "../middleware/auth.middleware.js";
import {
  asyncHandler,
  sendSuccess,
} from "../utils/http-response.js";
import {
  FREE_PLAN_LIMITS,
  getSubscriptionOr404,
} from "../utils/subscription.util.js";

export const getUsage = asyncHandler<AuthRequest>(
  async (req, res) => {
    const subscription =
      await getSubscriptionOr404(
        res,
        req.user!.id
      );

    if (!subscription) {
      return;
    }

    const plan = subscription.plan;

    return sendSuccess(res, {
      plan,

      status: subscription.status,

      usage: subscription.usage,

      limits:
        plan === "free"
          ? FREE_PLAN_LIMITS
          : null,

      trialEnd: subscription.trialEnd,

      expiresAt: subscription.expiresAt,
    });
  },
  "Unable to fetch usage"
);
