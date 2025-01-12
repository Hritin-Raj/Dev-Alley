import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth, isTokenValid } = useContext(AuthContext);

  if (!auth.isLoggedIn || !isTokenValid(auth.token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

