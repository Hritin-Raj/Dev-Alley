import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { postData } from "../utils/api";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkDetails = (loginData) => {
    const { email, password } = loginData;
    if (!email || !password) {
      return { isValid: false, missingFields: !email ? "Email" : "Password" };
    }
    return { isValid: true };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const check = checkDetails(loginDetails);
    if (check.isValid) {
      try {
        const data = await postData("auth/login", loginDetails);
        login(data.token, data.user);
        navigate("/home")
        console.log(data.message);
      } catch (error) {
        console.error("Login Error:", error);
        alert(error.message || "An error occurred during login.");
      }
    } else {
      alert(`Please fill out the missing field: ${check.missingFields}`);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-2xl border-[3px] rounded-xl w-[500px] h-[500px] py-[20px] text-center">
        <div className="text-5xl font-serif">Login</div>
        <h2 className="text-2xl my-[20px]">Welcome Back!!</h2>
        <form
          className="h-[300px] flex flex-col items-center "
          onSubmit={handleSubmit}
        >
          <div className="my-[10px] mx-[10px] h-[50px] flex justify-center items-center">
            <EmailIcon fontSize="large" className="mx-2" />
            <input
              id="email"
              name="email"
              type="email"
              className="bg-purple-200 border-none outline-none placeholder-black flex text-xl items-center p-[10px] h-full w-[400px] rounded-xl"
              placeholder="Email Id"
              onChange={handleChange}
              value={loginDetails.email}
            />
          </div>

          <div className="my-[10px] mx-[10px] h-[50px] flex justify-center items-center">
            <PasswordIcon fontSize="large" className="mx-2" />
            <input
              id="password"
              name="password"
              type="password"
              className="bg-purple-200 text-xl placeholder-black border-none outline-none p-[10px] h-full w-[400px] rounded-xl"
              placeholder="Password"
              onChange={handleChange}
              value={loginDetails.password}
            />
          </div>

          <div id="submit" className="my-[10px] ml-[50px] h-[50px]">
            <Button
              id="submit"
              type="submit"
              className="h-full w-[400px]"
              style={{ backgroundColor: "purple", fontSize: "large" }}
              variant="contained"
            >
              Login
            </Button>
          </div>
        </form>

        <div className="text-xl">
          Don't have an account?
          <Link to="/signup" className="text-purple-900">
            {" "}
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
