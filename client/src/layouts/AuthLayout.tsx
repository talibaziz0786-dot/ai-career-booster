import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: Props) {
  return (
    <div
      className="
      relative
      flex
      min-h-screen
      items-center
      justify-center
      overflow-hidden
      bg-white
      dark:bg-slate-950
      "
    >
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />

        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[140px]" />
      </div>

      <div
        className="
        relative
        z-10
        grid
        w-full
        max-w-6xl
        overflow-hidden
        rounded-[32px]
        border
        border-slate-200
        bg-white/80
        backdrop-blur-2xl

        dark:border-white/10
        dark:bg-white/5

        lg:grid-cols-2
        "
      >
        <div
          className="
          hidden
          p-12
          lg:flex
          lg:flex-col
          lg:justify-center
          "
        >
          <h1
            className="
            text-6xl
            font-black
            text-slate-900
            dark:text-white
            "
          >
            CareerBoost AI
          </h1>

          <p
            className="
            mt-6
            text-xl
            text-slate-600
            dark:text-slate-400
            "
          >
            Build ATS-friendly resumes,
            generate cover letters,
            track jobs,
            and prepare for interviews.
          </p>
        </div>

        <div className="p-8 lg:p-14">
          {children}
        </div>
      </div>
    </div>
  );
}