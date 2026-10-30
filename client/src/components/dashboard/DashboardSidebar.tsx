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
  Sparkles,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

import { useDashboardStore } from "../../store/dashboard-store";
import { useAuthStore } from "../../store/auth-store";

export default function DashboardSidebar() {
  const navigate = useNavigate();

  const sidebarOpen = useDashboardStore(
    (state) => state.sidebarOpen
  );

  const closeSidebar = useDashboardStore(
    (state) => state.closeSidebar
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const user = useAuthStore(
    (state) => state.user
  );

  const navClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    [
      "group",
      "relative",
      "flex",
      "items-center",
      "gap-3",
      "rounded-2xl",
      "px-4",
      "py-3",
      "font-medium",
      "transition-all",
      "duration-300",
      "outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-cyan-500",
      "focus-visible:ring-offset-2",
      "dark:focus-visible:ring-offset-slate-950",
      isActive
        ? [
            "bg-gradient-to-r",
            "from-cyan-500",
            "to-blue-600",
            "text-white",
            "shadow-lg",
            "shadow-cyan-500/30",
          ].join(" ")
        : [
            "text-slate-600",
            "hover:bg-cyan-500/10",
            "hover:text-cyan-500",
            "dark:text-slate-300",
            "dark:hover:bg-white/10",
            "dark:hover:text-cyan-400",
          ].join(" "),
    ].join(" ");

  const handleLogout = () => {
    closeSidebar();
    logout();
  };

  const handleUpgrade = () => {
    closeSidebar();
    navigate("/subscription");
  };

  return (
    <aside
      aria-label="Dashboard sidebar"
      className={[
        "fixed",
        "left-0",
        "top-0",
        "z-50",
        "h-screen",
        "w-72",
        "bg-white",
        "dark:bg-slate-950",
        "border-r",
        "border-slate-200",
        "dark:border-white/10",
        "transition-transform",
        "duration-300",
        "ease-out",
        sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full",
        "lg:static",
        "lg:translate-x-0",
      ].join(" ")}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-6">
        <button
          type="button"
          onClick={() => {
            closeSidebar();
            navigate("/dashboard");
          }}
          className="rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          aria-label="Go to dashboard"
        >
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            CareerBoost AI
          </h2>
        </button>

        <button
          type="button"
          onClick={closeSidebar}
          className="rounded-xl p-2 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:hover:bg-white/10 lg:hidden"
          aria-label="Close sidebar"
        >
          <X
            size={20}
            className="text-slate-900 dark:text-white"
          />
        </button>
      </div>

      {/* Navigation Area */}
      <div className="flex h-[calc(100vh-110px)] flex-col">
        <nav
          aria-label="Dashboard navigation"
          className="flex-1 space-y-2 overflow-y-auto px-4 pb-6"
        >
          {/* Home */}
          <NavLink
            to="/"
            onClick={closeSidebar}
            className={navClass}
          >
            <Home size={18} aria-hidden="true" />
            <span>Home</span>
          </NavLink>

          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={navClass}
          >
            <LayoutDashboard
              size={18}
              aria-hidden="true"
            />
            <span>Dashboard</span>
          </NavLink>

          {/* Resume Builder */}
          <NavLink
            to="/resume-builder"
            onClick={closeSidebar}
            className={navClass}
          >
            <FileText
              size={18}
              aria-hidden="true"
            />
            <span>Resume Builder</span>
          </NavLink>

          {/* AI Interview */}
          <NavLink
            to="/interview-prep"
            onClick={closeSidebar}
            className={navClass}
          >
            <Mic size={18} aria-hidden="true" />
            <span>AI Interview</span>
          </NavLink>

          {/* Subscription */}
          <NavLink
            to="/subscription"
            onClick={closeSidebar}
            className={navClass}
          >
            <Crown
              size={18}
              aria-hidden="true"
            />
            <span>Subscription</span>
          </NavLink>

          {/* Billing */}
          <NavLink
            to="/billing"
            onClick={closeSidebar}
            className={navClass}
          >
            <CreditCard
              size={18}
              aria-hidden="true"
            />
            <span>Billing</span>
          </NavLink>

          {/* Job Tracker */}
          <NavLink
            to="/jobs"
            onClick={closeSidebar}
            className={navClass}
          >
            <Briefcase
              size={18}
              aria-hidden="true"
            />
            <span>Job Tracker</span>
          </NavLink>

          {/* LinkedIn Optimizer */}
          <NavLink
            to="/linkedin"
            onClick={closeSidebar}
            className={navClass}
          >
            <FaLinkedin
              size={18}
              aria-hidden="true"
            />
            <span>LinkedIn Optimizer</span>
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/profile"
            onClick={closeSidebar}
            className={navClass}
          >
            <User size={18} aria-hidden="true" />
            <span>Profile</span>
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/settings"
            onClick={closeSidebar}
            className={navClass}
          >
            <Settings
              size={18}
              aria-hidden="true"
            />
            <span>Settings</span>
          </NavLink>

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              onClick={closeSidebar}
              className={navClass}
            >
              <LayoutDashboard
                size={18}
                aria-hidden="true"
              />
              <span>Admin Panel</span>
            </NavLink>
          )}

          {/* CareerBoost Pro */}
          <div
            className={[
              "mx-1",
              "mb-6",
              "mt-8",
              "overflow-hidden",
              "rounded-3xl",
              "bg-gradient-to-br",
              "from-cyan-500",
              "via-blue-600",
              "to-indigo-700",
              "p-5",
              "text-white",
              "shadow-xl",
              "shadow-cyan-500/20",
            ].join(" ")}
          >
            <div className="flex items-center gap-2">
              <Sparkles
                size={18}
                aria-hidden="true"
              />

              <span className="font-semibold">
                CareerBoost Pro
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-cyan-100">
              Unlock unlimited AI Resume, ATS, Interview
              &amp; Career Analytics.
            </p>

            <button
              type="button"
              onClick={handleUpgrade}
              className="mt-5 w-full rounded-xl bg-white py-3 font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
            >
              Upgrade Plan
            </button>
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-200 p-4 dark:border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            className={[
              "flex",
              "w-full",
              "items-center",
              "justify-center",
              "gap-3",
              "rounded-2xl",
              "border",
              "border-red-500/20",
              "bg-red-500/10",
              "px-4",
              "py-3",
              "font-semibold",
              "text-red-500",
              "transition-all",
              "duration-300",
              "hover:bg-red-500",
              "hover:text-white",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-red-500",
              "focus-visible:ring-offset-2",
              "dark:focus-visible:ring-offset-slate-950",
            ].join(" ")}
          >
            <LogOut
              size={18}
              aria-hidden="true"
            />

            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}