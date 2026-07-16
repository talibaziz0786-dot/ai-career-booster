import {
  X,
  Home,
  LayoutDashboard,
  FileText,
  Briefcase,
  User,
  Settings,
  CreditCard,
  Crown,
  LogOut,
  Mic,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";

import { useDashboardStore } from "../../store/dashboard-store";
import { useAuthStore } from "../../store/auth-store";

export default function DashboardSidebar() {
  const sidebarOpen = useDashboardStore(
    (state) => state.sidebarOpen
  );

  const closeSidebar = useDashboardStore(
    (state) => state.closeSidebar
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `
    flex
    items-center
    gap-3
    rounded-xl
    px-4
    py-3
    transition-all
    ${
      isActive
        ? "bg-cyan-500 text-white shadow-lg"
        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
    }
  `;

  return (
    <aside
      className={`
fixed
left-0
top-0
z-50
h-screen
w-72

bg-white
dark:bg-slate-950

border-r
border-slate-200
dark:border-white/10

transition-transform
duration-300

${
  sidebarOpen
    ? "translate-x-0"
    : "-translate-x-full"
}

lg:static
lg:translate-x-0
`}
    >
      <div className="flex items-center justify-between p-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          CareerBoost AI
        </h2>

        <button
          onClick={closeSidebar}
          className="lg:hidden"
          aria-label="Close Sidebar"
        >
          <X className="text-slate-900 dark:text-white" />
        </button>
      </div>

      <nav className="mt-6 flex flex-col gap-2 px-4">

  <Link
    to="/"
    onClick={closeSidebar}
    className="
      flex items-center gap-3 rounded-xl
      px-4 py-3
      text-slate-900
      hover:bg-slate-100
      dark:text-white
      dark:hover:bg-white/10
    "
  >
    🏠
    Home
  </Link>

  <Link
    to="/dashboard"
    onClick={closeSidebar}
    className="
      flex items-center gap-3 rounded-xl
      px-4 py-3
      text-slate-900
      hover:bg-slate-100
      dark:text-white
      dark:hover:bg-white/10
    "
  >
    <LayoutDashboard size={18} />
    Dashboard
  </Link>

  <Link
    to="/resume-builder"
    onClick={closeSidebar}
    className="
      flex items-center gap-3 rounded-xl
      px-4 py-3
      text-slate-900
      hover:bg-slate-100
      dark:text-white
      dark:hover:bg-white/10
    "
  >
    <FileText size={18} />
    Resume Builder
  </Link>

  <Link
    to="/interview-prep"
    onClick={closeSidebar}
    className="
      flex items-center gap-3 rounded-xl
      px-4 py-3
      text-slate-900
      hover:bg-slate-100
      dark:text-white
      dark:hover:bg-white/10
    "
  >
    🎤
    AI Interview
  </Link>

  <Link
    to="/subscription"
    onClick={closeSidebar}
    className="
      flex items-center gap-3 rounded-xl
      px-4 py-3
      text-slate-900
      hover:bg-slate-100
      dark:text-white
      dark:hover:bg-white/10
    "
  >
    💎
    Subscription
  </Link>

  <Link
    to="/billing"
    onClick={closeSidebar}
    className="
      flex items-center gap-3 rounded-xl
      px-4 py-3
      text-slate-900
      hover:bg-slate-100
      dark:text-white
      dark:hover:bg-white/10
    "
  >
    💳
    Billing
  </Link>

  <Link
    to="/jobs"
    onClick={closeSidebar}
    className="
      flex items-center gap-3 rounded-xl
      px-4 py-3
      text-slate-900
      hover:bg-slate-100
      dark:text-white
      dark:hover:bg-white/10
    "
  >
    <Briefcase size={18} />
    Job Tracker
  </Link>

  <Link
    to="/profile"
    onClick={closeSidebar}
    className="
      flex items-center gap-3 rounded-xl
      px-4 py-3
      text-slate-900
      hover:bg-slate-100
      dark:text-white
      dark:hover:bg-white/10
    "
  >
    <User size={18} />
    Profile
  </Link>

  <Link
    to="/settings"
    onClick={closeSidebar}
    className="
      flex items-center gap-3 rounded-xl
      px-4 py-3
      text-slate-900
      hover:bg-slate-100
      dark:text-white
      dark:hover:bg-white/10
      mb-5
    "
  >
    <Settings size={18} />
    Settings
  </Link>

</nav>
      <div className="absolute bottom-6 left-4 right-4 ">

        <button
          onClick={logout}
          className="
          mt-5
w-full
rounded-xl
bg-red-500
py-3
font-semibold
text-white
transition
hover:bg-red-600
"
        >
          <span className="flex items-center justify-center gap-2">
            <LogOut size={18} />
            Logout
          </span>
        </button>

      </div>
    </aside>
  );
}