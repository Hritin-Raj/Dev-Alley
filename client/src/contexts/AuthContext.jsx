import React, { createContext, useState, useEffect } from "react";
import * as jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    token: null,
  });

  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded = jwtDecode.default(token);
      console.log("decoded", decoded);
      const currentTime = Date.now() / 1000;
      console.log("decoded.exp", decoded.exp);
      console.log("currentTime", currentTime);
      return decoded.exp > currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false; // Treat invalid tokens as expired
    }
  };

  const signup = (token) => {
    localStorage.setItem("token", token);
    setAuth({ isLoggedIn: true, token });
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuth({ isLoggedIn: true, token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ isLoggedIn: false, token: null });
    navigate("/login");
  };

  const isAuthenticated = auth.isLoggedIn;

  return (
    <AuthContext.Provider
      value={{ auth, signup, login, logout, isAuthenticated, isTokenValid }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
