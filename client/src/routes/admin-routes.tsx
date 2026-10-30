import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import AIControlCenter from "../pages/admin/AIControlCenter";
import SubscriptionManagement from "../pages/admin/SubscriptionManagement";
import PaymentManagement from "../pages/admin/PaymentManagement";
import Analytics from "../pages/admin/Analytics";
import FeatureFlags from "../pages/admin/FeatureFlags";
import SystemHealth from "../pages/admin/SystemHealth";
import ContentManagement from "../pages/admin/ContentManagement";
import Security from "../pages/admin/Security";
import AuditLogs from "../pages/admin/AuditLogs";
import AdminSettings from "../pages/admin/AdminSettings";
import AdminProfile from "../pages/admin/AdminProfile";
import AdminProtectedRoute from "./AdminProtectedRoute";

export const adminRouter = [
  {
    path: "/admin",
    element: <AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <UserManagement /> },
      { path: "ai", element: <AIControlCenter /> },
      { path: "subscriptions", element: <SubscriptionManagement /> },
      { path: "payments", element: <PaymentManagement /> },
      { path: "analytics", element: <Analytics /> },
      { path: "content", element: <ContentManagement /> },
      { path: "feature-flags", element: <FeatureFlags /> },
      { path: "system/health", element: <SystemHealth /> },
      { path: "security", element: <Security /> },
      { path: "system/logs", element: <AuditLogs /> },
      { path: "settings", element: <AdminSettings /> },
      { path: "profile", element: <AdminProfile /> },
    ]
  }
];