import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  RefreshCw,
} from "lucide-react";

import toast from "react-hot-toast";

import { api } from "../../lib/axios";

/* =========================================================
   Types
========================================================= */

type SubscriptionPlan =
  | "free"
  | "trial"
  | "pro-monthly"
  | "pro-yearly";

type SubscriptionStatus =
  | "active"
  | "expired"
  | "cancelled";

interface SubscriptionUser {
  name?: string;
  email?: string;
}

interface SubscriptionItem {
  _id: string;

  user?: SubscriptionUser;

  plan: SubscriptionPlan;

  status: SubscriptionStatus;

  startDate?: string;

  endDate?: string;

  createdAt?: string;

  expiresAt?: string;
}

interface SubscriptionListResponse {
  success: boolean;

  data: SubscriptionItem[];

  message?: string;
}

interface UpdatePlanResponse {
  success: boolean;

  data?: SubscriptionItem;

  message?: string;
}

/* =========================================================
   Constants
========================================================= */

const PLAN_LABELS: Record<
  SubscriptionPlan,
  string
> = {
  free: "Free",

  trial: "Trial",

  "pro-monthly":
    "Pro Monthly",

  "pro-yearly":
    "Pro Yearly",
};

const STATUS_LABELS: Record<
  SubscriptionStatus,
  string
> = {
  active: "Active",

  expired: "Expired",

  cancelled: "Cancelled",
};

/* =========================================================
   Helpers
========================================================= */

/**
 * Returns the next administrative plan action.
 *
 * IMPORTANT:
 * These values MUST match the backend
 * Subscription Mongoose enum exactly.
 */
function getNextPlan(
  currentPlan: SubscriptionPlan
): SubscriptionPlan {
  switch (currentPlan) {
    case "free":
    case "trial":
      return "pro-monthly";

    case "pro-monthly":
    case "pro-yearly":
      return "free";

    default:
      return "free";
  }
}

/**
 * Returns the label for the action button.
 */
function getPlanActionLabel(
  currentPlan: SubscriptionPlan
): string {
  switch (currentPlan) {
    case "free":
    case "trial":
      return "Grant Pro Monthly";

    case "pro-monthly":
    case "pro-yearly":
      return "Downgrade to Free";

    default:
      return "Set Free";
  }
}

/**
 * Formats a date safely.
 */
function formatDate(
  value?: string
): string {
  if (!value) {
    return "N/A";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "N/A";
  }

  return date.toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

/**
 * Returns plan badge classes.
 */
function getPlanClasses(
  plan: SubscriptionPlan
): string {
  switch (plan) {
    case "pro-monthly":
    case "pro-yearly":
      return [
        "bg-purple-100",
        "text-purple-700",
        "dark:bg-purple-500/10",
        "dark:text-purple-300",
      ].join(" ");

    case "trial":
      return [
        "bg-blue-100",
        "text-blue-700",
        "dark:bg-blue-500/10",
        "dark:text-blue-300",
      ].join(" ");

    case "free":
    default:
      return [
        "bg-slate-100",
        "text-slate-700",
        "dark:bg-slate-800",
        "dark:text-slate-300",
      ].join(" ");
  }
}

/**
 * Returns status badge classes.
 */
function getStatusClasses(
  status: SubscriptionStatus
): string {
  switch (status) {
    case "active":
      return [
        "bg-emerald-100",
        "text-emerald-700",
        "dark:bg-emerald-500/10",
        "dark:text-emerald-300",
      ].join(" ");

    case "expired":
      return [
        "bg-amber-100",
        "text-amber-700",
        "dark:bg-amber-500/10",
        "dark:text-amber-300",
      ].join(" ");

    case "cancelled":
      return [
        "bg-red-100",
        "text-red-700",
        "dark:bg-red-500/10",
        "dark:text-red-300",
      ].join(" ");

    default:
      return [
        "bg-slate-100",
        "text-slate-700",
        "dark:bg-slate-800",
        "dark:text-slate-300",
      ].join(" ");
  }
}

/* =========================================================
   Component
========================================================= */

export default function SubscriptionManagement() {
  const [
    subs,
    setSubs,
  ] = useState<SubscriptionItem[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    updatingId,
    setUpdatingId,
  ] = useState<string | null>(
    null
  );

  /* =======================================================
     Fetch subscriptions
  ======================================================= */

  const fetchSubs = useCallback(
    async (
      showRefreshState = false
    ) => {
      try {
        if (showRefreshState) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response =
          await api.get<SubscriptionListResponse>(
            "/api/admin/subscriptions"
          );

        if (
          !response.data.success
        ) {
          throw new Error(
            response.data.message ||
              "Failed to load subscriptions."
          );
        }

        setSubs(
          Array.isArray(
            response.data.data
          )
            ? response.data.data
            : []
        );
      } catch (error) {
        console.error(
          "[Admin][Subscriptions] Failed to load subscriptions:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load subscriptions."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  /* =======================================================
     Initial load
  ======================================================= */

  useEffect(() => {
    void fetchSubs();
  }, [fetchSubs]);

  /* =======================================================
     Update subscription plan
  ======================================================= */

  const handleUpdatePlan =
    useCallback(
      async (
        id: string,
        newPlan: SubscriptionPlan
      ) => {
        if (!id) {
          toast.error(
            "Subscription ID is missing."
          );

          return;
        }

        if (!newPlan) {
          toast.error(
            "Invalid subscription plan."
          );

          return;
        }

        try {
          setUpdatingId(id);

          const response =
            await api.put<UpdatePlanResponse>(
              `/api/admin/subscriptions/${id}/plan`,
              {
                plan: newPlan,
              }
            );

          if (
            !response.data.success
          ) {
            throw new Error(
              response.data.message ||
                "Failed to update subscription plan."
            );
          }

          toast.success(
            `Subscription changed to ${PLAN_LABELS[newPlan]}.`
          );

          /*
           * Refresh the list after successful
           * server-side update.
           */
          await fetchSubs();
        } catch (error) {
          console.error(
            "[Admin][Subscriptions] Failed to update plan:",
            error
          );

          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to update subscription plan."
          );
        } finally {
          setUpdatingId(null);
        }
      },
      [fetchSubs]
    );

  /* =======================================================
     Render
  ======================================================= */

  return (
    <div className="space-y-6">
      {/* ===================================================
          Header
      =================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Subscription Management
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage user plans, subscriptions,
            and renewals.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            void fetchSubs(true)
          }
          disabled={
            loading ||
            refreshing
          }
          aria-label="Refresh subscriptions"
          title="Refresh subscriptions"
          className={[
            "inline-flex",
            "h-10",
            "w-10",
            "items-center",
            "justify-center",
            "rounded-xl",
            "border",
            "border-slate-200",
            "bg-white",
            "text-slate-700",
            "shadow-sm",
            "transition",
            "hover:bg-slate-50",
            "disabled:cursor-not-allowed",
            "disabled:opacity-50",
            "dark:border-slate-700",
            "dark:bg-slate-900",
            "dark:text-slate-200",
            "dark:hover:bg-slate-800",
          ].join(" ")}
        >
          <RefreshCw
            size={17}
            className={
              refreshing
                ? "animate-spin"
                : ""
            }
          />
        </button>
      </div>

      {/* ===================================================
          Subscription Table
      =================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            {/* =============================================
                Table Header
            ============================================= */}

            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/70">
              <tr>
                <th className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-200">
                  User
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-200">
                  Plan
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-200">
                  Status
                </th>

                <th className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-200">
                  Created Date
                </th>

                <th className="px-5 py-4 text-right font-semibold text-slate-700 dark:text-slate-200">
                  Actions
                </th>
              </tr>
            </thead>

            {/* =============================================
                Table Body
            ============================================= */}

            <tbody>
              {/* Loading */}

              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-slate-500 dark:text-slate-400"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw
                        size={16}
                        className="animate-spin"
                      />

                      <span>
                        Loading subscriptions...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : subs.length === 0 ? (
                /* Empty */

                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-slate-500 dark:text-slate-400"
                  >
                    No subscriptions found.
                  </td>
                </tr>
              ) : (
                /* Data */

                subs.map(
                  (subscription) => {
                    const nextPlan =
                      getNextPlan(
                        subscription.plan
                      );

                    const isUpdating =
                      updatingId ===
                      subscription._id;

                    return (
                      <tr
                        key={
                          subscription._id
                        }
                        className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-slate-800/50"
                      >
                        {/* User */}

                        <td className="px-5 py-4">
                          <div className="font-medium text-slate-900 dark:text-white">
                            {subscription.user
                              ?.name ||
                              "Unknown"}
                          </div>

                          <div className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                            {subscription.user
                              ?.email ||
                              "No email"}
                          </div>
                        </td>

                        {/* Plan */}

                        <td className="px-5 py-4">
                          <span
                            className={[
                              "inline-flex",
                              "items-center",
                              "rounded-lg",
                              "px-2.5",
                              "py-1",
                              "text-xs",
                              "font-semibold",
                              getPlanClasses(
                                subscription.plan
                              ),
                            ].join(" ")}
                          >
                            {
                              PLAN_LABELS[
                                subscription.plan
                              ]
                            }
                          </span>
                        </td>

                        {/* Status */}

                        <td className="px-5 py-4">
                          <span
                            className={[
                              "inline-flex",
                              "items-center",
                              "rounded-full",
                              "px-2.5",
                              "py-1",
                              "text-xs",
                              "font-medium",
                              getStatusClasses(
                                subscription.status
                              ),
                            ].join(" ")}
                          >
                            {
                              STATUS_LABELS[
                                subscription.status
                              ]
                            }
                          </span>
                        </td>

                        {/* Created Date */}

                        <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                          {formatDate(
                            subscription.startDate ||
                              subscription.createdAt
                          )}
                        </td>

                        {/* Actions */}

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            disabled={
                              isUpdating
                            }
                            onClick={() =>
                              void handleUpdatePlan(
                                subscription._id,
                                nextPlan
                              )
                            }
                            className={[
                              "inline-flex",
                              "items-center",
                              "justify-center",
                              "gap-2",
                              "rounded-xl",
                              "border",
                              "border-slate-200",
                              "bg-slate-50",
                              "px-3",
                              "py-2",
                              "text-xs",
                              "font-medium",
                              "text-slate-700",
                              "transition",
                              "hover:bg-slate-100",
                              "disabled:cursor-not-allowed",
                              "disabled:opacity-50",
                              "dark:border-slate-700",
                              "dark:bg-slate-800",
                              "dark:text-slate-200",
                              "dark:hover:bg-slate-700",
                            ].join(" ")}
                          >
                            {isUpdating ? (
                              <>
                                <RefreshCw
                                  size={14}
                                  className="animate-spin"
                                />

                                Updating...
                              </>
                            ) : (
                              getPlanActionLabel(
                                subscription.plan
                              )
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}