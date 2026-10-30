import { api } from "../lib/axios";

import type {
  AuthUser,
} from "../store/auth-store";

/* ==========================================================
   Update Profile Payload
========================================================== */

export type UpdateProfilePayload =
  Partial<
    Pick<
      AuthUser,
      | "name"
      | "bio"
      | "title"
      | "location"
      | "phone"
      | "github"
      | "linkedin"
      | "portfolio"
      | "avatar"
    >
  >;

/* ==========================================================
   API Response
========================================================== */

export interface UpdateProfileResponse {
  success: boolean;

  message: string;

  user: AuthUser;
}

/* ==========================================================
   Update Profile
========================================================== */

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
  const response =
    await api.put<UpdateProfileResponse>(
      "/api/user/profile",
      payload
    );

  return response.data;
}

/* ==========================================================
   Create Profile
========================================================== */

export async function createProfile(
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
  const response =
    await api.post<UpdateProfileResponse>(
      "/api/user/profile",
      payload
    );

  return response.data;
}