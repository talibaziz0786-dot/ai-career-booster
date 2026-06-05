import { Menu } from "lucide-react";

import {
  useDashboardStore,
} from "../../store/dashboard-store";

interface Props {
  name?: string;
}

export default function DashboardHeader({
  name,
}: Props) {
  const toggleSidebar =
    useDashboardStore(
      (state) =>
        state.toggleSidebar
    );

  return (
    <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-white
dark:bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Open Sidebar"
          title="Open Sidebar"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-slate-900
dark:text-white">
            Welcome back,
            {" "}
            {name}
          </h1>

          <p className="text-slate-600
dark:text-slate-400">
            Manage your career growth
          </p>
        </div>
      </div>
    </header>
  );
}