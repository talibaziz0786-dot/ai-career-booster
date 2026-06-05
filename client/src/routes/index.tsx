import {
  createBrowserRouter,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import ResumeBuilderPage from "../pages/ResumeBuilderPage";
import InterviewPrepPage from "../pages/InterviewPrepPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
},


{
  path: "/resume-builder",
  element: (
    <ProtectedRoute>
      <ResumeBuilderPage />
    </ProtectedRoute>
  ),
},

{
  path: "/interview-prep",
  element: (
    <ProtectedRoute>
      <InterviewPrepPage />
    </ProtectedRoute>
  ),
},


]);

