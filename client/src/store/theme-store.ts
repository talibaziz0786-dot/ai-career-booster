import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

const initialTheme =
  (localStorage.getItem("theme") as Theme) ||
  "dark";

export const useThemeStore =
  create<ThemeStore>((set, get) => ({
    theme: initialTheme,

    toggleTheme: () => {
      const nextTheme =
        get().theme === "dark"
          ? "light"
          : "dark";

      localStorage.setItem(
        "theme",
        nextTheme
      );

      set({
        theme: nextTheme,
      });
    },
  }));