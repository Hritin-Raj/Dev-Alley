import React from "react";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-2xl border-[3px] rounded-xl w-[500px] h-[500px] py-[20px] text-center">
        <div className="text-5xl font-serif">Login</div>
        <h2 class="text-2xl my-[20px]">Welcome Back!!</h2>
        <form className="h-[300px] flex flex-col items-center ">
          <div className="my-[10px] mx-[10px] h-[50px] flex justify-center items-center">
            <PersonIcon fontSize="large" className="mx-2" />
            <input
              id="username"
              type="username"
              className="bg-purple-200 border-none outline-none placeholder-black flex text-xl items-center p-[10px] h-full w-[400px] rounded-xl"
              placeholder="Username"
            />
          </div>

          <div className="my-[10px] mx-[10px] h-[50px] flex justify-center items-center">
            <PasswordIcon fontSize="large" className="mx-2" />
            <input
              id="password"
              type="password"
              className="bg-purple-200 text-xl placeholder-black border-none outline-none p-[10px] h-full w-[400px] rounded-xl"
              placeholder="Password"
            />
          </div>

          <div className="my-[10px] ml-[50px] h-[50px]">
            <Button
              className="h-full w-[400px]"
              style={{ backgroundColor: "purple" }}
              variant="contained"
            >
              Login
            </Button>
          </div>
        </form>

        <div className="text-xl">Don't have an account?<Link to="/signup" className="text-purple-900"> SignUp</Link></div>
      </div>
    </div>
  );
}

export default Login;

//bg-gray-100 flex items-center justify-center h-screen
