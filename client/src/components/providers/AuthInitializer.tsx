import { useEffect } from "react";
import toast from "react-hot-toast";

import {
  getErrorMessage,
  isUnauthorized,
} from "../../utils/getErrorMessage";

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
        if (isUnauthorized(error)) {
          return;
        }

        toast.error(
          getErrorMessage(
            error,
            "Failed to load your subscription"
          )
        );
      }
    }

    initialize();
  }, [token, setSubscription]);

  return null;
}