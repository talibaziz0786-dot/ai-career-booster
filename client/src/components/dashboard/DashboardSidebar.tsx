import {
  X,
  FileText,
  LayoutDashboard,
  Briefcase,
  User,
  Settings,
} from "lucide-react";

import {
  useDashboardStore,
} from "../../store/dashboard-store";

import { Link } from "react-router-dom";

export default function DashboardSidebar() {

const sidebarOpen =
  useDashboardStore(
    (state) => state.sidebarOpen
  );

const closeSidebar =
  useDashboardStore(
    (state) => state.closeSidebar
  );

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
  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
    CareerBoost
  </h2>

  <button
  aria-label="close side bar"
    onClick={closeSidebar}
    className="lg:hidden text-slate-900 dark:text-white"
  >
    <X size={24} />
  </button>
</div>

      <nav className="flex-1 space-y-2 px-4">
        <button
          type="button"
          aria-label="Dashboard"
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-900
dark:text-white hover:bg-slate-100
dark:hover:bg-white/10"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <Link
  to="/resume-builder"
  onClick={closeSidebar}
  className="
  flex
  w-full
  items-center
  gap-3
  rounded-xl
  px-4
  py-3
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
  className="
  flex
  items-center
  gap-3
  rounded-xl
  px-4
  py-3

  text-slate-900
  dark:text-white

  hover:bg-slate-100
  dark:hover:bg-white/10
  "
>
  🎤 AI Interview
</Link>




       <Link
  to="/jobs"
  onClick={closeSidebar}
  className="
  flex
  w-full
  items-center
  gap-3
  rounded-xl
  px-4
  py-3
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
  flex
  w-full
  items-center
  gap-3
  rounded-xl
  px-4
  py-3
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
  flex
  w-full
  items-center
  gap-3
  rounded-xl
  px-4
  py-3
  text-slate-900
  hover:bg-slate-100
  dark:text-white
  dark:hover:bg-white/10
  "
>
  <Settings size={18} />
  Settings
</Link>

      </nav>
    </aside>
  );
}