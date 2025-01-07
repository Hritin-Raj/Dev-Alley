import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    token: null,
    user: null,
  });

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
    }
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













// import React, { createContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     isLoggedIn: false,
//     token: null,
//     user: null,
//   });

//   // not sure
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user"); // Get the raw user data

//     // Check if token and user are valid
//     if (token && user && isTokenValid()) {
//       try {
//         const parsedUser = JSON.parse(user); // Safely parse user data
//         setAuth({ isLoggedIn: true, token, user: parsedUser });
//       } catch (error) {
//         console.error("Error parsing user from localStorage:", error);
//         // If parsing fails, clear invalid data
//         localStorage.removeItem("user");
//       }
//     }
//   }, []);

//   const isTokenValid = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return false;

//     try {
//       const decoded = jwtDecode(token);
//       // console.log("decoded", decoded);
//       const currentTime = Date.now() / 1000;

//       if (decoded.exp < currentTime) {
//         // console.log("auth n1", auth);
//         setAuth({ isLoggedIn: false, token: null, user: null });
//         // console.log("auth n2", auth);
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         return false;
//       } else return true;
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       // console.log("auth ", auth);
//       setAuth({ isLoggedIn: false, token: null, user: null });
//       // console.log("auth ", auth);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       return false;
//     }
//   };

//   const signup = (token, user) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     setAuth({ isLoggedIn: true, token, user });
//   };

//   const login = (token, user) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     setAuth({ isLoggedIn: true, token, user });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setAuth({ isLoggedIn: false, token: null, user: null });
//     navigate("/login");
//   };

//   const isAuthenticated = auth.isLoggedIn;

//   return (
//     <AuthContext.Provider
//       value={{ auth, signup, login, logout, isAuthenticated, isTokenValid }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
