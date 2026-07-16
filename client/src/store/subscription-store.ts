import { create } from "zustand";

type Plan =
  | "free"
  | "trial"
  | "pro-monthly"
  | "pro-yearly";

type Status =
  | "active"
  | "expired"
  | "cancelled";

interface SubscriptionState {
  plan: Plan;

  status: Status;

  expiresAt: string | null;

  trialEnd: string | null;

  loading: boolean;

  setSubscription: (
    data: Partial<SubscriptionState>
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  resetSubscription: () => void;
}

export const useSubscriptionStore =
create<SubscriptionState>((set) => ({

  plan: "trial",

  status: "active",

  expiresAt: null,

  trialEnd: null,

  loading: false,

  setLoading: (loading) =>
    set({
      loading,
    }),

  setSubscription: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  resetSubscription: () =>
    set({
      plan: "trial",
      status: "active",
      expiresAt: null,
      trialEnd: null,
      loading: false,
    }),

}));