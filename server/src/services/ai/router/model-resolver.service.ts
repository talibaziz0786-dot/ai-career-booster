import Subscription from "../../../models/subscription.model.js";



export type GeminiModel =
  | "gemini-2.5-flash"
  | "gemini-2.5-pro";

export interface AIModelConfig {
  tier: "free" | "premium";
  primary: GeminiModel;
  fallback: GeminiModel;
}

export async function getAIModel(
  userId: string
): Promise<AIModelConfig> {

  const subscription =
    await Subscription.findOne({
      user: userId,
    });

  if (!subscription) {
    return {
      tier: "free",
      primary: "gemini-2.5-flash",
      fallback: "gemini-2.5-flash",
    };
  }

  switch (subscription.plan) {

    case "trial":
    case "pro-monthly":
    case "pro-yearly":

      return {
        tier: "premium",
        primary: "gemini-2.5-pro",
        fallback: "gemini-2.5-flash",
      };

    default:

      return {
        tier: "free",
        primary: "gemini-2.5-flash",
        fallback: "gemini-2.5-flash",
      };
  }
}