import { useEffect } from "react";
import toast from "react-hot-toast";

import {
  getErrorMessage,
  isUnauthorized,
} from "../../utils/getErrorMessage";

import { getUsage } from "../../api/usage.api";

import { useUsageStore } from "../../store/usage-store";

import { useAuthStore } from "../../store/auth-store";

export default function UsageInitializer() {
  const token =
    useAuthStore((state) => state.token);

  const setUsage =
    useUsageStore((state) => state.setUsage);

  useEffect(() => {
    async function loadUsage() {
      if (!token) return;

      try {
        const data = await getUsage();

        setUsage({
          plan: data.plan,
          usage: data.usage,
          limits: data.limits,
        });
      } catch (error) {
        if (isUnauthorized(error)) {
          return;
        }

        toast.error(
          getErrorMessage(
            error,
            "Failed to load your usage"
          )
        );
      }
    }

    loadUsage();
  }, [token]);

  return null;
}