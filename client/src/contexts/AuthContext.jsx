import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    token: null
  });

  // Check if the user is already logged in (e.g., on app refresh)
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token) {
      setAuth({ isLoggedIn: true, token })
    }
  }, [])

  const signup = (token) => {
    localStorage.setItem("token", token);
    setAuth({ isLoggedIn: true, token });
  }

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuth({ isLoggedIn: true, token });
  }

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ isLoggedIn: false, token: null});
    navigate("/login");
  }

  const isAuthenticated = auth.isLoggedIn;

  return (
    <AuthContext.Provider value={{ auth, signup, login, logout, isAuthenticated }}>
      { children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;