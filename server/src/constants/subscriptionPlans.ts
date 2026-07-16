export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: "free",
    name: "Free",
    price: 0,
    durationDays: 0,
  },

  TRIAL: {
    id: "trial",
    name: "3 Days Trial",
    price: 0,
    durationDays: 3,
  },

  PRO_MONTHLY: {
    id: "pro-monthly",
    name: "Pro Monthly",
    price: 299,
    durationDays: 30,
  },

  PRO_YEARLY: {
    id: "pro-yearly",
    name: "Pro Yearly",
    price: 1999,
    durationDays: 365,
  },
} as const;