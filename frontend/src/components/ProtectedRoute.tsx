import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../lib/auth";

export function ProtectedRoute() {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/signin" replace />;
}
