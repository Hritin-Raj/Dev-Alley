import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    token: null,
    user: null,
  });

  // not sure
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user"); // Get the raw user data
  
    // Check if token and user are valid
    if (token && user && isTokenValid()) {
      try {
        const parsedUser = JSON.parse(user); // Safely parse user data
        setAuth({ isLoggedIn: true, token, user: parsedUser });
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        // If parsing fails, clear invalid data
        localStorage.removeItem("user");
      }
    }
  }, []);
  

  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      console.log("decoded", decoded);
      const currentTime = Date.now() / 1000;
      // console.log("decoded.exp", decoded.exp);
      // console.log("currentTime", currentTime);

      if (decoded.exp < currentTime) {
        setAuth({ isLoggedIn: false, token: null, user: null });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return false;
      } else return true;
    } catch (error) {
      console.error("Error decoding token:", error);
      setAuth({ isLoggedIn: false, token: null, user: null });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false; // Treat invalid tokens as expired
    }
  };

  const signup = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ isLoggedIn: true, token, user });
  };

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ isLoggedIn: true, token, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ isLoggedIn: false, token: null, user: null });
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
