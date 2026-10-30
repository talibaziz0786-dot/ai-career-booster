import { api } from "../../lib/axios";

import type {
  GenerateCoverLetterRequest,
  GenerateCoverLetterResponse,
} from "../../types/cover-letter/cover-letter.types";

/* ==========================================================
   Endpoint
========================================================== */

const BASE_URL =
  "/api/cover-letter";

/* ==========================================================
   Generate Cover Letter
========================================================== */

export async function generateCoverLetter(
  payload: GenerateCoverLetterRequest
): Promise<GenerateCoverLetterResponse> {
  const { data } =
    await api.post<GenerateCoverLetterResponse>(
      `${BASE_URL}/generate`,
      payload
    );

  return data;
}

/* ==========================================================
   History
========================================================== */

export async function getCoverLetterHistory() {
  const { data } =
    await api.get(
      `${BASE_URL}/history`
    );

  return data;
}

/* ==========================================================
   Delete Cover Letter
========================================================== */

export async function deleteCoverLetter(
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

export async function exportCoverLetterPDF(
  id: string
) {
  const response =
    await api.get(
      `${BASE_URL}/${id}/pdf`,
      {
        responseType: "blob",
      }
    );

  return response.data;
}

/* ==========================================================
   Export DOCX
========================================================== */

export async function exportCoverLetterDOCX(
  id: string
) {
  const response =
    await api.get(
      `${BASE_URL}/${id}/docx`,
      {
        responseType: "blob",
      }
    );

  return response.data;
}

/* ==========================================================
   Duplicate Cover Letter
========================================================== */

export async function duplicateCoverLetter(
  id: string
) {
  const { data } =
    await api.post(
      `${BASE_URL}/${id}/duplicate`
    );

  return data;
}

/* ==========================================================
   Service Object
========================================================== */

export const CoverLetterAPI = {
  generateCoverLetter,

  getCoverLetterHistory,

  deleteCoverLetter,

  exportCoverLetterPDF,

  exportCoverLetterDOCX,

  duplicateCoverLetter,
};