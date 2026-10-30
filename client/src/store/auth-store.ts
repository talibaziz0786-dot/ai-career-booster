import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ==========================================================
   Auth User
========================================================== */

export interface AuthUser {
  id: string;

  name: string;

  email: string;

  isProUser: boolean;

  role: string;

  bio?: string;

  title?: string;

  location?: string;

  phone?: string;

  github?: string;

  linkedin?: string;

  portfolio?: string;

  avatar?: string;
}

/* ==========================================================
   Auth State
========================================================== */

interface AuthState {
  user: AuthUser | null;

  token: string | null;

  isAuthenticated: boolean;

  login: (
    user: AuthUser,
    token: string
  ) => void;

  setUser: (
    user: AuthUser
  ) => void;

  updateUser: (
    data: Partial<AuthUser>
  ) => void;

  logout: () => void;
}

/* ==========================================================
   Auth Store
========================================================== */

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        user: null,

        token: null,

        isAuthenticated: false,

        /* ======================================================
           Login
        ====================================================== */

        login: (
          user,
          token
        ) =>
          set({
            user,
            token,
            isAuthenticated: true,
          }),

        /* ======================================================
           Set User
        ====================================================== */

        setUser: (
          user
        ) =>
          set({
            user,
            isAuthenticated: true,
          }),

        /* ======================================================
           Update User
        ====================================================== */

        updateUser: (
          data
        ) =>
          set((state) => ({
            user: state.user
              ? {
                  ...state.user,
                  ...data,
                }
              : null,
          })),

        /* ======================================================
           Logout
        ====================================================== */

        logout: () =>
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          }),
      }),

      {
        name: "careerboost-auth",
      }
    )
  );