import React, { useState } from "react";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";

import { fetchData, postData } from "../utils/api.js";

function SignUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await postData("users/signup", data);
      console.log(response); // Log response from backend
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const response = await postData("api/users/signup", data)
  //   // const result = response.json()

  //   console.log(response);
  // };

// onSubmit={handleSubmit}

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
              value={data.name}
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
              value={data.email}
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
              value={data.password}
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
