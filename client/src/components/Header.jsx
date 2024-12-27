import React, { useContext } from "react";
import SearchBar from "./SearchBar";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HighlightIcon from "@mui/icons-material/Highlight";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const {auth} = useContext(AuthContext)

  const handleCreate = () => {
    console.log("Auth state:", auth);
    if (auth.isLoggedIn) {
      navigate("/create");
    } else {
      alert("You need to log in to create a project!");
      navigate("/login"); // Redirect to login if the user is not logged in
    }
  };

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
          {/* <Link to={"/create"} > */}
          <button className="h-full w-full" onClick={handleCreate} >
            <AddIcon className="mb-[3px]" />
            Create
          </button>
          {/* </Link> */}
        </div>
        <div className="m-3 text-xl p-3">Profile</div>
      </div>
    </div>
  );
};

export default Header;
