import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { postData } from "../utils/api.js";
import { AuthContext } from "../contexts/AuthContext";

function SignUp() {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const checkDetails = (data) => {
    const { name, email, password } = data;
    if (!name || !email || !password) {
      return { isValid: false, missingFields: !email ? "Email" : (!name ? "Name" : "Password") };
    }
    return { isValid: true };
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
  
      const check = checkDetails(signUpData);
      if (check.isValid) {
        try {
          const data = postData("auth/signup", signUpData);
          signup(data.token);
          navigate("/home");
          console.log(data.message);
        } catch (error) {
          console.error("SignUp Error:", error);
          alert(error.message || "An error occurred during signing in.");
        }
      } else {
        alert(`Please fill out the missing field: ${check.missingFields}`);
      }
    };


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative bg-white shadow-2xl border-[3px] rounded-xl w-[500px] h-[600px] py-[20px] text-center">
        <div className="text-5xl font-serif">SignUp</div>
        <h2 className="text-2xl my-[20px]">Welcome to DevAlley!!</h2>
        <form className=" flex flex-col items-center" >
          <div className="my-[10px] mx-[10px] h-[50px] flex justify-center items-center">
            <PersonIcon fontSize="large" className="mx-2" />
            <input
              id="username"
              name="name"
              type="text"
              className="bg-purple-200 border-none outline-none placeholder-black flex text-xl items-center p-[10px] h-full w-[400px] rounded-xl"
              placeholder="Username"
              required
              value={signUpData.name}
              onChange={handleChange}
            />
          </div>

          <div className="my-[10px] mx-[10px] h-[50px] flex justify-center items-center">
            <EmailIcon fontSize="large" className="mx-2" />
            <input
              id="email"
              name="email"
              type="email"
              className="bg-purple-200 text-xl placeholder-black border-none outline-none p-[10px] h-full w-[400px] rounded-xl"
              placeholder="Email Id"
              required
              value={signUpData.email}
              onChange={handleChange}
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
              required
              value={signUpData.password}
              onChange={handleChange}
            />
          </div>

          <div className="my-[10px] ml-[50px] h-[50px] ">
            <Button
              type="submit"
              className="h-full w-[400px]"
              style={{ backgroundColor: "purple", fontSize: "large" }}
              variant="contained"
              onClick={handleSubmit}
            >
              SignUp
            </Button>
          </div>
        </form>

        <div className="text-2xl my-[10px]">OR</div>

        <button className="text-3xl my-[10px] bg-orange-300 rounded-xl w-[400px] h-[50px]">
          <GoogleIcon fontSize="large" className="mb-[5px]" /> Continue with
          Google
        </button>

        <div className="text-xl my-[10px]">
          Already have an account?
          <Link to="/login" className="text-purple-900">
            {" "}
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
