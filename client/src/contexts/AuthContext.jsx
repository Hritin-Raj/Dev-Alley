import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    token: null,
    user: null,
  });

  const [loading, setLoading] = useState(true);

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        if (isTokenValid(token)) {
          setAuth({ isLoggedIn: true, token, user: parsedUser });
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAuth({ isLoggedIn: false, token: null, user: null });
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const signup = (token, user) => {
    if (isTokenValid(token)) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setAuth({ isLoggedIn: true, token, user });
    }
  };

  const login = (token, user) => {
    if (isTokenValid(token)) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setAuth({ isLoggedIn: true, token, user });
    }
  };

  const logout = () => {
    if (auth.isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuth({ isLoggedIn: false, token: null, user: null });
      console.log("Logged out auth", auth);
    }
  };

  const isAuthenticated = auth.isLoggedIn;

  return (
    <AuthContext.Provider
      value={{ auth, loading, signup, login, logout, isAuthenticated, isTokenValid }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


