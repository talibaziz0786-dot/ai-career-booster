import { api } from "../lib/axios";

import type { ISettings } from "../store/settings-store";

/* =========================================================
   API Response Types
========================================================= */

interface SettingsApiResponse {
  success: boolean;
  message?: string;
  settings: ISettings;
}

/* =========================================================
   Get My Settings
========================================================= */

export async function getMySettings(): Promise<SettingsApiResponse> {
  const { data } =
    await api.get<SettingsApiResponse>(
      "/api/settings/me",
    );

  return data;
}

/* =========================================================
   Update My Settings
========================================================= */

export async function updateMySettings(
  payload: Partial<ISettings>,
): Promise<SettingsApiResponse> {
  const { data } =
    await api.put<SettingsApiResponse>(
      "/api/settings/me",
      payload,
    );

  return data;
}