import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;