import { useEffect } from "react";

import { useAuthStore } from "../../store/auth-store";
import { useSubscriptionStore } from "../../store/subscription-store";

import { getSubscription } from "../../api/subscription.api";

export default function AuthInitializer() {
  const token = useAuthStore((state) => state.token);

  const setSubscription =
    useSubscriptionStore(
      (state) => state.setSubscription
    );

  useEffect(() => {
    async function initialize() {
      if (!token) return;

      try {
        const data =
          await getSubscription();

        setSubscription({
          plan: data.subscription.plan,
          status: data.subscription.status,
          expiresAt:
            data.subscription.expiresAt ??
            null,
          trialEnd:
            data.subscription.trialEnd ??
            null,
        });
      } catch (error) {
        console.error(error);
      }
    }

    initialize();
  }, [token, setSubscription]);

  return null;
}