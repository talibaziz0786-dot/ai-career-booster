import type { ReactNode } from "react";

interface ResumeWorkspaceProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
}

export default function ResumeWorkspace({
  left,
  center,
  right,
}: ResumeWorkspaceProps) {
  return (
    <div
className="
grid
gap-8

xl:grid-cols-[320px_420px_minmax(750px,1fr)]
"
>
      {/* Left Sidebar */}

      <aside
        className="
        space-y-6

        xl:sticky
        xl:top-6

        h-fit
        "
      >
        {left}
      </aside>

      {/* Center Form */}

      <main>
        {center}
      </main>

      {/* Right Preview */}

      <aside
        className="
        xl:sticky
        xl:top-6

        h-fit
        "
      >
        {right}
      </aside>
    </div>
  );
}