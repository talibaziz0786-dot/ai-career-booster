import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  getMySettings,
  updateMySettings as updateMySettingsAPI,
} from "../api/settings.api";

/* =========================================================
   Settings Model
========================================================= */

export interface ISettings {
  darkMode: boolean;
  sendEmailNotifications: boolean;
  sendSMSNotifications: boolean;
  profileVisibility: "public" | "private";
}

/**
 * Backward-compatible alias.
 *
 * Existing code can use either ISettings or UserSettings
 * without creating duplicate settings models.
 */
export type UserSettings = ISettings;

/* =========================================================
   Defaults
========================================================= */

export const DEFAULT_SETTINGS: ISettings = {
  darkMode: false,
  sendEmailNotifications: true,
  sendSMSNotifications: false,
  profileVisibility: "public",
};

/* =========================================================
   Store Types
========================================================= */

interface SettingsStore {
  settings: ISettings;

  fetchSettings: () => Promise<void>;

  updateSettings: (
    data: Partial<ISettings>,
  ) => Promise<void>;

  toggleTheme: () => Promise<void>;

  resetSettings: () => void;
}

/* =========================================================
   Theme Synchronization
========================================================= */

function applyTheme(darkMode: boolean): void {
  if (
    typeof document === "undefined"
  ) {
    return;
  }

  document.documentElement.classList.toggle(
    "dark",
    darkMode,
  );
}

/* =========================================================
   Settings Sanitization
========================================================= */

function sanitizeSettings(
  value: Partial<ISettings> | null | undefined,
): ISettings {
  return {
    darkMode:
      typeof value?.darkMode === "boolean"
        ? value.darkMode
        : DEFAULT_SETTINGS.darkMode,

    sendEmailNotifications:
      typeof value?.sendEmailNotifications ===
      "boolean"
        ? value.sendEmailNotifications
        : DEFAULT_SETTINGS.sendEmailNotifications,

    sendSMSNotifications:
      typeof value?.sendSMSNotifications ===
      "boolean"
        ? value.sendSMSNotifications
        : DEFAULT_SETTINGS.sendSMSNotifications,

    profileVisibility:
      value?.profileVisibility === "private"
        ? "private"
        : "public",
  };
}

/* =========================================================
   Store
========================================================= */

export const useSettingsStore =
  create<SettingsStore>()(
    persist(
      (set, get) => ({
        /* ===================================================
           Initial State
        =================================================== */

        settings: {
          ...DEFAULT_SETTINGS,
        },

        /* ===================================================
           Fetch Settings
        =================================================== */

        fetchSettings: async (): Promise<void> => {
          const response =
            await getMySettings();

          const serverSettings =
            sanitizeSettings(
              response.settings,
            );

          applyTheme(
            serverSettings.darkMode,
          );

          set({
            settings: serverSettings,
          });
        },

        /* ===================================================
           Update Settings
        =================================================== */

        updateSettings: async (
          data,
        ): Promise<void> => {
          const previousSettings =
            get().settings;

          const optimisticSettings =
            sanitizeSettings({
              ...previousSettings,
              ...data,
            });

          /*
           * Optimistic UI update.
           * The interface responds immediately.
           */
          set({
            settings: optimisticSettings,
          });

          applyTheme(
            optimisticSettings.darkMode,
          );

          try {
            const response =
              await updateMySettingsAPI(
                data,
              );

            const serverSettings =
              sanitizeSettings(
                response.settings,
              );

            /*
             * Server is the final source of truth.
             */
            set({
              settings: serverSettings,
            });

            applyTheme(
              serverSettings.darkMode,
            );
          } catch (error) {
            /*
             * Roll back optimistic changes
             * when the API request fails.
             */
            set({
              settings: previousSettings,
            });

            applyTheme(
              previousSettings.darkMode,
            );

            console.error(
              "Failed to update settings:",
              error,
            );

            throw error;
          }
        },

        /* ===================================================
           Toggle Theme
        =================================================== */

        toggleTheme: async (): Promise<void> => {
          const currentSettings =
            get().settings;

          const previousSettings =
            currentSettings;

          const nextSettings: ISettings = {
            ...currentSettings,
            darkMode:
              !currentSettings.darkMode,
          };

          /*
           * Immediate UI update.
           */
          set({
            settings: nextSettings,
          });

          applyTheme(
            nextSettings.darkMode,
          );

          try {
            const response =
              await updateMySettingsAPI({
                darkMode:
                  nextSettings.darkMode,
              });

            const serverSettings =
              sanitizeSettings(
                response.settings,
              );

            set({
              settings: serverSettings,
            });

            applyTheme(
              serverSettings.darkMode,
            );
          } catch (error) {
            /*
             * Restore previous theme if
             * persistence fails.
             */
            set({
              settings: previousSettings,
            });

            applyTheme(
              previousSettings.darkMode,
            );

            console.error(
              "Failed to toggle theme:",
              error,
            );

            throw error;
          }
        },

        /* ===================================================
           Reset Settings
        =================================================== */

        resetSettings: (): void => {
          const resetSettings = {
            ...DEFAULT_SETTINGS,
          };

          set({
            settings: resetSettings,
          });

          applyTheme(
            resetSettings.darkMode,
          );
        },
      }),

      /* =====================================================
         Zustand Persistence
      ===================================================== */

      {
        name: "careerboost-settings",

        version: 1,

        partialize: (state) => ({
          settings: state.settings,
        }),

        /*
         * Apply persisted theme after Zustand
         * restores the state from storage.
         */
        onRehydrateStorage: () => {
          return (state) => {
            if (!state) {
              applyTheme(
                DEFAULT_SETTINGS.darkMode,
              );

              return;
            }

            const settings =
              sanitizeSettings(
                state.settings,
              );

            state.settings =
              settings;

            applyTheme(
              settings.darkMode,
            );
          };
        },
      },
    ),
  );