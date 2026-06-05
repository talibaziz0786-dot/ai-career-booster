import { Link } from "react-router-dom";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-center p-16">
          <h1 className="text-6xl font-black text-slate-900 dark:text-white">
            CareerBoost AI
          </h1>

          <p className="mt-6 text-xl text-slate-600 dark:text-slate-400">
            Build ATS-Friendly Resumes,
            Generate Cover Letters,
            Track Jobs,
            Prepare Interviews.
          </p>
        </div>

        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-white/5">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {title}
            </h2>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}