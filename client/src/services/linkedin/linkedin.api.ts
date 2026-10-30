import { api } from "../../lib/axios";

import type {
  LinkedInOptimizeRequest,
  LinkedInOptimizeResponse,
} from "../../types/linkedin/linkedin.types";

/* ==========================================================
   Endpoint
========================================================== */

const BASE_URL =
  "/api/linkedin";

/* ==========================================================
   Optimize LinkedIn Profile
========================================================== */

export async function optimizeLinkedInProfile(
  payload: LinkedInOptimizeRequest
): Promise<LinkedInOptimizeResponse> {
  const { data } =
    await api.post<LinkedInOptimizeResponse>(
      `${BASE_URL}/optimize`,
      payload
    );

  return data;
}

/* ==========================================================
   Get Previous Optimizations
========================================================== */

export async function getLinkedInHistory() {
  const { data } =
    await api.get(
      `${BASE_URL}/history`
    );

  return data;
}

/* ==========================================================
   Delete Optimization
========================================================== */

export async function deleteLinkedInHistory(
  id: string
) {
  const { data } =
    await api.delete(
      `${BASE_URL}/${id}`
    );

  return data;
}

/* ==========================================================
   Export PDF
========================================================== */

export async function exportLinkedInPDF(
  id: string
) {
  const response =
    await api.get(
      `${BASE_URL}/${id}/pdf`,
      {
        responseType:
          "blob",
      }
    );

  return response.data;
}

/* ==========================================================
   Service
========================================================== */

export const LinkedInAPI = {
  optimizeLinkedInProfile,

  getLinkedInHistory,

  deleteLinkedInHistory,

  exportLinkedInPDF,
};