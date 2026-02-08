// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!isAuthenticated()) {
    alert("You need to login first!");
    return <Navigate to="/login" replace />;
  }

  // If route is restricted to specific roles
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    alert("Unauthorized access!");
    // redirect user depending on role
    return user?.role === "admin" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  return children;
};

export default ProtectedRoute;
