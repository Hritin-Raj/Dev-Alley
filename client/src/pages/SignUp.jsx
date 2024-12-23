import React from "react";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative bg-white shadow-2xl border-[3px] rounded-xl w-[500px] h-[600px] py-[20px] text-center">
        <div className="text-5xl font-serif">SignUp</div>
        <h2 class="text-2xl my-[20px]">Welcome to DevAlley!!</h2>
        <form className="h-[400px] flex flex-col items-center">
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
            <EmailIcon fontSize="large" className="mx-2" />
            <input
              id="email"
              type="email"
              className="bg-purple-200 text-xl placeholder-black border-none outline-none p-[10px] h-full w-[400px] rounded-xl"
              placeholder="Email Id"
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

          <div className="text-2xl my-[20px]">OR</div>

          <div className="text-3xl bg-orange-300 rounded-xl w-[400px] h-[50px] flex justify-center items-center"><button className=""><GoogleIcon fontSize="large" className=""/> Continue with Google</button></div>

        </form>

        {/* <div className="absolute right-0 bottom-[50px] text-2xl"><button>Next<NavigateNextIcon /></button></div> */}

        <div className="text-xl">
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

//bg-gray-100 flex items-center justify-center h-screen
