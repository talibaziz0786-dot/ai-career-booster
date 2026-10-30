import { useMemo } from "react";
import {
  Bell,
  Menu,
  Moon,
  Sun,
} from "lucide-react";

import { useDashboardStore } from "../../store/dashboard-store";
import { useSettingsStore } from "../../store/settings-store";

interface Props {
  name?: string;
}

export default function DashboardHeader({
  name = "User",
}: Props) {
  const toggleSidebar =
    useDashboardStore(
      (state) => state.toggleSidebar
    );

  const {
    settings,
    toggleTheme,
  } = useSettingsStore();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12)
      return "Good Morning";

    if (hour < 18)
      return "Good Afternoon";

    return "Good Evening";
  }, []);

  const initials = useMemo(() => {
    return name
      .split(" ")
      .map((item) => item[0])
      .join("")
      .toUpperCase();
  }, [name]);

  return (
    <header
      className="
      sticky
      top-0
      z-40

      flex
      items-center
      justify-between

      rounded-3xl

      border
      border-slate-200

      bg-white/80

      p-5

      shadow-sm

      backdrop-blur-2xl

      dark:border-white/10
      dark:bg-white/5
      "
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Open Sidebar"
          title="Open Sidebar"
          onClick={toggleSidebar}
          className="
          rounded-xl
          p-2

          transition

          hover:bg-slate-100

          dark:hover:bg-white/10

          lg:hidden
          "
        >
          <Menu size={22} />
        </button>

        <div>
          <p
            className="
            text-sm

            text-slate-500

            dark:text-slate-400
            "
          >
            {greeting}
          </p>

          <h1
            className="
            text-3xl
            font-bold

            text-slate-900

            dark:text-white
            "
          >
            {name}
          </h1>

          <p
            className="
            mt-1

            text-slate-600

            dark:text-slate-400
            "
          >
            Ready to boost your career today 🚀
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">

        <button
          type="button"
          aria-label="Notifications"
          className="
          rounded-xl
          border
          border-slate-200

          p-3

          transition

          hover:scale-105

          dark:border-white/10
          dark:hover:bg-white/10
          "
        >
          <Bell size={20} />
        </button>

        <button
          type="button"
          aria-label="Toggle Theme"
          onClick={toggleTheme}
          className="
          rounded-xl
          border
          border-slate-200

          p-3

          transition

          hover:scale-105

          dark:border-white/10
          dark:hover:bg-white/10
          "
        >
          {settings.darkMode
            ? <Sun size={20} />
            : <Moon size={20} />}
        </button>

        <div
          className="
          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-full

          bg-gradient-to-r
          from-cyan-500
          to-blue-500

          font-bold

          text-white

          shadow-lg
          "
        >
          {initials}
        </div>

      </div>
    </header>
  );
}