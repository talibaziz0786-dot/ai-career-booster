import ResumeScoreCard from "../ResumeScoreCard";
import AISuggestions from "../AISuggestions";
import ExportButtons from "../ExportButtons";

export default function ResumeRightPanel() {
  return (
    <div
      className="
      sticky
      top-24
      space-y-6
      h-fit
      "
    >
      <ResumeScoreCard />

      <AISuggestions />

      <ExportButtons />
    </div>
  );
}