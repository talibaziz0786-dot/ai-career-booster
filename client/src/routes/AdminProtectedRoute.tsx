import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";

interface Props {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({
  children,
}: Props) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}