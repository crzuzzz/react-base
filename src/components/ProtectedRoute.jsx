import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const isAuthenticated = window.localStorage.getItem("isAuthenticated") === "true";
  const userString = window.localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // 1. If not logged in, redirect straight to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // 2. Check if user's role is allowed for this specific route
  if (allowedRoles && !allowedRoles.includes(user.idRole)) {
    // Redirect to login or unauthorized page
    return <Navigate to="/" replace />;
  }

  return children;
}