import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

export default function ProtectedRoute({ children }) {
  const { currUser } = useAuth();

  if (!currUser) {
    return <Navigate to="/login" />;
  }

  return children;
}
