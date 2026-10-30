import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import ResumeBuilderPage from "../pages/ResumeBuilderPage";
import InterviewPrepPage from "../pages/InterviewPrepPage";
import InterviewResultPage from "../pages/InterviewResultPage";
import InterviewAnalyticsPage from "../pages/InterviewAnalyticsPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import SubscriptionPage from "../pages/SubscriptionPage";
import BillingPage from "../pages/BillingPage";
import JobTrackerPage from "../pages/JobTrackerPage";
import LinkedInOptimizerPage from "../pages/LinkedInOptimizerPage";
import RootLayout from "../components/layout/RootLayout";
import { adminRouter } from "./admin-routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/dashboard", element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
      { path: "/resume-builder", element: <ProtectedRoute><ResumeBuilderPage /></ProtectedRoute> },
      { path: "/interview-prep", element: <ProtectedRoute><InterviewPrepPage /></ProtectedRoute> },
      { path: "/interview-result", element: <InterviewResultPage /> },
      { path: "/analytics", element: <InterviewAnalyticsPage /> },
      { path: "/profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: "/settings", element: <ProtectedRoute><SettingsPage /></ProtectedRoute> },
      { path: "/subscription", element: <ProtectedRoute><SubscriptionPage /></ProtectedRoute> },
      { path: "/billing", element: <ProtectedRoute><BillingPage /></ProtectedRoute> },
      { path: "/jobs", element: <ProtectedRoute><JobTrackerPage /></ProtectedRoute> },
      { path: "/linkedin", element: <ProtectedRoute><LinkedInOptimizerPage /></ProtectedRoute> },
      { path: "*", element: <NotFoundPage /> },
    ]
  },
  ...adminRouter
]);
