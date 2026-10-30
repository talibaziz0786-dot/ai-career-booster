import { useCallback } from "react";

import toast from "react-hot-toast";

import {
  CoverLetterAPI,
} from "../../services/cover-letter/cover-letter.api";

import {
  useCoverLetterStore,
} from "../../store/cover-letter-store";

export function useCoverLetter() {
  const {
    input,

    result,

    history,

    loading,

    setLoading,

    setResult,

    addHistory,
  } = useCoverLetterStore();

  /* ==========================================================
     Generate Cover Letter
  ========================================================== */

  const generateCoverLetter =
    useCallback(async () => {
      if (loading) {
        return;
      }

      try {
        setLoading(true);

        const response =
          await CoverLetterAPI.generateCoverLetter(
            {
              data: input,
            }
          );

        if (!response.success) {
          throw new Error(
            response.message
          );
        }

        setResult(
          response.data
        );

        addHistory({
          id: crypto.randomUUID(),

          companyName:
            input.companyName,

          jobTitle:
            input.jobTitle,

          createdAt:
            new Date().toISOString(),

          result:
            response.data,
        });

        toast.success(
          "Cover Letter Generated Successfully"
        );
      } catch (error: any) {
        console.error(error);

        toast.error(
          error?.message ??
            "Unable to generate cover letter."
        );
      } finally {
        setLoading(false);
      }
    }, [
      loading,

      input,

      setLoading,

      setResult,

      addHistory,
    ]);

  /* ==========================================================
     Refresh History
  ========================================================== */

  const loadHistory =
    useCallback(async () => {
      try {
        const response =
          await CoverLetterAPI.getCoverLetterHistory();

        console.log(
          response
        );
      } catch (error) {
        console.error(error);
      }
    }, []);


      /* ==========================================================
     Delete Cover Letter
  ========================================================== */

  const deleteCoverLetter =
    useCallback(async (id: string) => {
      try {
        await CoverLetterAPI.deleteCoverLetter(
          id
        );

        toast.success(
          "Cover Letter deleted."
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Unable to delete cover letter."
        );
      }
    }, []);

  /* ==========================================================
     Export PDF
  ========================================================== */

  const exportPDF =
    useCallback(async (id: string) => {
      try {
        const blob =
          await CoverLetterAPI.exportCoverLetterPDF(
            id
          );

        const url =
          window.URL.createObjectURL(blob);

        const link =
          document.createElement("a");

        link.href = url;

        link.download =
          "cover-letter.pdf";

        link.click();

        window.URL.revokeObjectURL(
          url
        );

        toast.success(
          "PDF exported."
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Unable to export PDF."
        );
      }
    }, []);

  /* ==========================================================
     Export DOCX
  ========================================================== */

  const exportDOCX =
    useCallback(async (id: string) => {
      try {
        const blob =
          await CoverLetterAPI.exportCoverLetterDOCX(
            id
          );

        const url =
          window.URL.createObjectURL(blob);

        const link =
          document.createElement("a");

        link.href = url;

        link.download =
          "cover-letter.docx";

        link.click();

        window.URL.revokeObjectURL(
          url
        );

        toast.success(
          "DOCX exported."
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Unable to export DOCX."
        );
      }
    }, []);

  /* ==========================================================
     Duplicate
  ========================================================== */

  const duplicate =
    useCallback(async (id: string) => {
      try {
        await CoverLetterAPI.duplicateCoverLetter(
          id
        );

        toast.success(
          "Cover Letter duplicated."
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Unable to duplicate."
        );
      }
    }, []);

  /* ==========================================================
     Copy Generated Cover Letter
  ========================================================== */

  const copyToClipboard =
    useCallback(async () => {
      if (!result) {
        return;
      }

      const text = `
${result.greeting}

${result.introduction}

${result.body}

${result.closing}

${result.signature}
`;

      try {
        await navigator.clipboard.writeText(
          text
        );

        toast.success(
          "Copied to clipboard."
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Copy failed."
        );
      }
    }, [result]);

  /* ==========================================================
     Public API
  ========================================================== */

  return {
    input,

    result,

    history,

    loading,

    generateCoverLetter,

    loadHistory,

    deleteCoverLetter,

    exportPDF,

    exportDOCX,

    duplicate,

    copyToClipboard,
  };
}