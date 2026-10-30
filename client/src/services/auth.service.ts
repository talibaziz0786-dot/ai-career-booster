import { api } from "../lib/axios";

import type { AuthUser } from "../store/auth-store";

/* ==========================================================
   Auth Payloads
========================================================== */

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

/* ==========================================================
   Auth Response
========================================================== */

export interface AuthResponse {
  success: boolean;
  message: string;
  user: AuthUser;

  /**
   * Current backend response field.
   */
  token?: string;

  /**
   * Kept for compatibility with any existing
   * endpoint using accessToken naming.
   */
  accessToken?: string;
}

/* ==========================================================
   Token Resolver
========================================================== */

export function getAccessToken(
  response: AuthResponse
): string | null {
  const token =
    response.token ??
    response.accessToken ??
    null;

  if (
    typeof token !== "string" ||
    token.trim().length === 0
  ) {
    return null;
  }

  return token.trim();
}

/* ==========================================================
   Register
========================================================== */

export async function registerUser(
  data: RegisterPayload
): Promise<AuthResponse> {
  const response =
    await api.post<AuthResponse>(
      "/api/auth/register",
      data
    );

  return response.data;
}

/* ==========================================================
   Login
========================================================== */

export async function loginUser(
  data: LoginPayload
): Promise<AuthResponse> {
  const response =
    await api.post<AuthResponse>(
      "/api/auth/login",
      data
    );

  return response.data;
}

/* ==========================================================
   Current User
========================================================== */

export interface CurrentUserResponse {
  success: boolean;
  user: AuthUser;
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const response =
    await api.get<CurrentUserResponse>(
      "/api/auth/me"
    );

  return response.data;
}

/* ==========================================================
   Logout
========================================================== */

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export async function logoutUser(): Promise<LogoutResponse> {
  const response =
    await api.post<LogoutResponse>(
      "/api/auth/logout"
    );

  return response.data;
}