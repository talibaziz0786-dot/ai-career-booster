import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Globe,
  Lock,
  Loader2,
  Moon,
  Save,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import { useSettingsStore } from "../store/settings-store";

/* =========================================================
   Types
========================================================= */

type SettingsState = ReturnType<
  typeof useSettingsStore.getState
>;

type Settings = SettingsState["settings"];

type SettingsKey = keyof Settings;

type SettingsValue<K extends SettingsKey> = Settings[K];

type MessageState = {
  type: "success" | "error";
  text: string;
};

/* =========================================================
   Animation
========================================================= */

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

/* =========================================================
   Reusable Toggle
========================================================= */

interface SettingsToggleProps {
  checked: boolean;
  label: string;
  description?: string;
  onChange: () => void;
  disabled?: boolean;
}

function SettingsToggle({
  checked,
  label,
  description,
  onChange,
  disabled = false,
}: SettingsToggleProps) {
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="min-w-0">
        <p className="font-semibold text-slate-900 dark:text-white">
          {label}
        </p>

        {description && (
          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${label}`}
        disabled={disabled}
        onClick={onChange}
        className={[
          "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full",
          "border transition-all duration-200",
          "focus:outline-none focus-visible:ring-2",
          "focus-visible:ring-cyan-500 focus-visible:ring-offset-2",
          "dark:focus-visible:ring-offset-slate-950",
          checked
            ? "border-cyan-500 bg-cyan-500"
            : "border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-800",
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer",
        ].join(" ")}
      >
        <span
          className={[
            "absolute h-5 w-5 rounded-full bg-white shadow-sm",
            "transition-transform duration-200",
            checked
              ? "translate-x-6"
              : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

/* =========================================================
   Settings Section
========================================================= */

interface SettingsSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

function SettingsSection({
  icon,
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <motion.section
      variants={sectionVariants}
      className={[
        "overflow-hidden rounded-3xl border",
        "border-slate-200/80 bg-white/90",
        "p-5 shadow-xl shadow-slate-200/40",
        "backdrop-blur-xl sm:p-6",
        "dark:border-white/10 dark:bg-slate-900/80",
        "dark:shadow-black/20",
      ].join(" ")}
    >
      <div className="mb-6 flex items-start gap-4">
        <div
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center",
            "rounded-2xl border border-cyan-500/20",
            "bg-cyan-500/10 text-cyan-600",
            "dark:text-cyan-400",
          ].join(" ")}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      {children}
    </motion.section>
  );
}

/* =========================================================
   Profile Visibility Option
========================================================= */

interface VisibilityOptionProps {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function VisibilityOption({
  active,
  icon,
  title,
  description,
  onClick,
}: VisibilityOptionProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "group flex min-h-[104px] items-start gap-3 rounded-2xl border p-4",
        "text-left transition-all duration-200",
        "focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-cyan-500",
        active
          ? [
              "border-cyan-500/60 bg-cyan-500/10",
              "text-cyan-700 dark:text-cyan-400",
              "shadow-lg shadow-cyan-500/5",
            ].join(" ")
          : [
              "border-slate-200 bg-slate-50/70",
              "text-slate-700 hover:border-cyan-500/30",
              "hover:bg-cyan-500/5",
              "dark:border-white/10 dark:bg-slate-950/40",
              "dark:text-slate-300",
              "dark:hover:border-cyan-500/30",
            ].join(" "),
      ].join(" ")}
    >
      <div className="mt-0.5 shrink-0">{icon}</div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-bold">
            {title}
          </span>

          {active && (
            <Check
              size={16}
              aria-hidden="true"
              className="shrink-0"
            />
          )}
        </div>

        <span className="mt-1 block text-xs leading-5 opacity-75">
          {description}
        </span>
      </div>
    </button>
  );
}

/* =========================================================
   Page
========================================================= */

export default function SettingsPage() {
  const {
    settings,
    fetchSettings,
    updateSettings,
  } = useSettingsStore();

  const [localSettings, setLocalSettings] =
    useState<Settings>(settings);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [message, setMessage] =
    useState<MessageState | null>(null);

  /* =======================================================
     Load Settings
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      setIsLoading(true);
      setMessage(null);

      try {
        await fetchSettings();
      } catch {
        if (mounted) {
          setMessage({
            type: "error",
            text: "Unable to load your settings. Please try again.",
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadSettings();

    return () => {
      mounted = false;
    };
  }, [fetchSettings]);

  /* =======================================================
     Sync Store → Local State
  ======================================================= */

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  /* =======================================================
     Generic Strongly-Typed Change Handler
  ======================================================= */

  const handleChange = <K extends SettingsKey>(
    key: K,
    value: SettingsValue<K>,
  ) => {
    setLocalSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  /* =======================================================
     Save
  ======================================================= */

  const handleSave = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      await updateSettings(localSettings);

      setMessage({
        type: "success",
        text: "Your settings have been saved successfully.",
      });
    } catch {
      setMessage({
        type: "error",
        text: "We couldn't save your settings. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  /* =======================================================
     Loading State
  ======================================================= */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            <div className="h-10 w-48 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

            <div className="h-5 w-80 max-w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

            <div className="h-40 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-900" />

            <div className="h-40 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-900" />

            <div className="h-40 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-900" />
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     Render
  ======================================================= */

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 md:px-10 md:py-10">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="absolute -right-32 top-96 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <motion.main
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.35,
        }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.06,
            },
          },
        }}
        className="relative mx-auto max-w-4xl"
      >
        {/* =================================================
            Header
        ================================================== */}

        <motion.div
          variants={sectionVariants}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <ShieldCheck
                size={24}
                aria-hidden="true"
              />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                Settings
              </h1>

              <p className="mt-1 text-sm text-slate-500 sm:text-base dark:text-slate-400">
                Manage your account preferences,
                notifications and privacy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            Feedback
        ================================================== */}

        {message && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            role="status"
            aria-live="polite"
            className={[
              "mb-6 flex items-start gap-3 rounded-2xl border p-4",
              message.type === "success"
                ? [
                    "border-emerald-500/20",
                    "bg-emerald-500/10",
                    "text-emerald-700",
                    "dark:text-emerald-400",
                  ].join(" ")
                : [
                    "border-red-500/20",
                    "bg-red-500/10",
                    "text-red-700",
                    "dark:text-red-400",
                  ].join(" "),
            ].join(" ")}
          >
            {message.type === "success" ? (
              <Check
                size={20}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
            ) : (
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
            )}

            <p className="text-sm font-medium leading-6">
              {message.text}
            </p>
          </motion.div>
        )}

        {/* =================================================
            Settings
        ================================================== */}

        <div className="space-y-6">
          {/* Appearance */}
          <SettingsSection
            icon={
              <Moon
                size={21}
                aria-hidden="true"
              />
            }
            title="Appearance"
            description="Customize how CareerBoost AI looks on your device."
          >
            <SettingsToggle
              checked={Boolean(
                localSettings.darkMode,
              )}
              label="Dark Mode"
              description="Use a darker interface that's easier on the eyes in low-light environments."
              onChange={() =>
                handleChange(
                  "darkMode",
                  !localSettings.darkMode,
                )
              }
              disabled={isSaving}
            />
          </SettingsSection>

          {/* Notifications */}
          <SettingsSection
            icon={
              <Smartphone
                size={21}
                aria-hidden="true"
              />
            }
            title="Notifications"
            description="Choose how CareerBoost AI keeps you informed."
          >
            <div className="space-y-6">
              <SettingsToggle
                checked={Boolean(
                  localSettings.sendEmailNotifications,
                )}
                label="Email Notifications"
                description="Receive important account, application and career updates by email."
                onChange={() =>
                  handleChange(
                    "sendEmailNotifications",
                    !localSettings.sendEmailNotifications,
                  )
                }
                disabled={isSaving}
              />

              <div className="h-px bg-slate-200 dark:bg-white/10" />

              <SettingsToggle
                checked={Boolean(
                  localSettings.sendSMSNotifications,
                )}
                label="SMS Notifications"
                description="Get critical job and career alerts through SMS."
                onChange={() =>
                  handleChange(
                    "sendSMSNotifications",
                    !localSettings.sendSMSNotifications,
                  )
                }
                disabled={isSaving}
              />
            </div>
          </SettingsSection>

          {/* Privacy */}
          <SettingsSection
            icon={
              <Lock
                size={21}
                aria-hidden="true"
              />
            }
            title="Profile Visibility"
            description="Control who can discover and view your public profile."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <VisibilityOption
                active={
                  localSettings.profileVisibility ===
                  "public"
                }
                icon={
                  <Globe
                    size={20}
                    aria-hidden="true"
                  />
                }
                title="Public"
                description="Your profile can be discovered and viewed by recruiters."
                onClick={() =>
                  handleChange(
                    "profileVisibility",
                    "public",
                  )
                }
              />

              <VisibilityOption
                active={
                  localSettings.profileVisibility ===
                  "private"
                }
                icon={
                  <Lock
                    size={20}
                    aria-hidden="true"
                  />
                }
                title="Private"
                description="Your profile remains visible only to you."
                onClick={() =>
                  handleChange(
                    "profileVisibility",
                    "private",
                  )
                }
              />
            </div>
          </SettingsSection>

          {/* =================================================
              Save Bar
          ================================================== */}

          <motion.div
            variants={sectionVariants}
            className="sticky bottom-4 z-10"
          >
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-2xl shadow-slate-300/30 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-5 dark:border-white/10 dark:bg-slate-900/90 dark:shadow-black/30">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Ready to save your changes?
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Your preferences will be applied to your account.
                </p>
              </div>

              <button
                type="button"
                disabled={isSaving}
                onClick={() => {
                  void handleSave();
                }}
                className={[
                  "inline-flex min-h-12 items-center justify-center",
                  "gap-2 rounded-2xl px-6 py-3",
                  "text-sm font-bold text-white",
                  "transition-all duration-200",
                  "focus:outline-none focus-visible:ring-2",
                  "focus-visible:ring-cyan-500 focus-visible:ring-offset-2",
                  "dark:focus-visible:ring-offset-slate-950",
                  isSaving
                    ? "cursor-not-allowed bg-cyan-500/60"
                    : [
                        "bg-cyan-500",
                        "shadow-lg shadow-cyan-500/20",
                        "hover:bg-cyan-400",
                        "hover:shadow-cyan-500/30",
                        "active:scale-[0.98]",
                      ].join(" "),
                ].join(" ")}
              >
                {isSaving ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                      aria-hidden="true"
                    />

                    Saving...
                  </>
                ) : (
                  <>
                    <Save
                      size={18}
                      aria-hidden="true"
                    />

                    Save Preferences
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}