import { pdf } from "@react-pdf/renderer";

import { useResumeStore } from "../../store/resume-store";

import ResumePDFDocument from "./ResumePDFDocument";

export default function ExportButtons() {
  const data = useResumeStore(
    (state) => state.data
  );

  const exportPDF = async () => {
    try {
      const blob = await pdf(
        <ResumePDFDocument data={data} />
      ).toBlob();

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = `${
        data.fullName || "resume"
      }.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "PDF Export Error:",
        error
      );
    }
  };

  return (
    <button
      type="button"
      onClick={exportPDF}
      className="
      rounded-2xl
      bg-cyan-500
      px-6
      py-4
      font-semibold
      text-white
      "
    >
      Export PDF
    </button>
  );
}