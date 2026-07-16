type PreviewBackgroundProps = {
  children: React.ReactNode;
};

export default function PreviewBackground({
  children,
}: PreviewBackgroundProps) {
 return (
  <div
    className="
    min-h-[1400px]
    rounded-3xl
    border
    border-slate-200
    bg-gradient-to-br
from-slate-300
to-slate-200
    p-12
    shadow-inner

    dark:border-white/10
    dark:from-slate-900
dark:to-slate-950
    "
  >
    {children}
  </div>
);
}