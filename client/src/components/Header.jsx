import React, { useContext, useEffect } from "react";
import SearchBar from "./SearchBar";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HighlightIcon from "@mui/icons-material/Highlight";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (auth.isLoggedIn) {
      navigate("/create");
    } else {
      alert("Your session has expired. Please log in again.");
      navigate("/login");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleProfileClick = async (event) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Profile Click", auth);
    navigate(`/profile/${user._id}`, { state: { id: user._id }})
  }

  return (
    <div className="h-[90px] w-full p-[15px]  flex justify-between items-center">
      <div className="h-full flex items-center  m-4">
        <HighlightIcon fontSize="large" className=" text-yellow-400" />
        <span className="text-4xl">DevAlley</span>
      </div>
      <div className="h-full flex justify-between items-center">
        <SearchBar />
        <ul className="flex m-3  h-full items-center">
          <li className="m-3 text-xl">
            Explore
            <KeyboardArrowDownIcon className="mb-[2px]" />
          </li>
          <li className="m-3 text-xl">About</li>
        </ul>
      </div>
      <div className="h-full flex items-center m-4">
        <div className="m-3 text-xl p-3 rounded-2xl bg-pink-500">
          <button className="h-full w-full" onClick={handleCreate}>
            <AddIcon className="mb-[3px]" />
            Create
          </button>
        </div>
        <div className="m-3 text-xl p-3">
          {auth.isLoggedIn ? (
            <button onClick={handleProfileClick} >
            {`${auth.user?.name || "Profile"}`}
            </button>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Log In
              </button>
              <button
                onClick={handleSignup}
                className="px-4 py-2 ml-[5px] border rounded-md bg-green-500 text-white hover:bg-green-600"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
