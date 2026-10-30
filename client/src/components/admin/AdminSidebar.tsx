import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Bot, CreditCard, DollarSign, BarChart3, FileText, Activity } from "lucide-react";

export default function AdminSidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "AI Control", path: "/admin/ai", icon: Bot },
    { name: "Subscriptions", path: "/admin/subscriptions", icon: CreditCard },
    { name: "Payments", path: "/admin/payments", icon: DollarSign },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
    { name: "Content", path: "/admin/content", icon: FileText },
    { name: "System", path: "/admin/system/health", icon: Activity },
  ];

  return (
    <div className="fixed w-64 h-full bg-white border-r border-gray-200">
      <div className="p-6 font-bold text-xl">Admin Panel</div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) => `flex items-center px-6 py-3 ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}