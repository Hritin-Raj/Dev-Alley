import React from "react";
import SearchBar from "./SearchBar";
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HighlightIcon from '@mui/icons-material/Highlight';

const Header = () => {
  return (
    <div className="h-[90px] w-full p-[15px]  flex justify-between items-center">
      <div className="h-full flex items-center  m-4"><HighlightIcon fontSize="large" className=" text-yellow-400"/><span className="text-4xl">DevAlley</span></div>
      <div className="h-full flex justify-between items-center">
        <SearchBar />
        <ul className="flex m-3  h-full items-center">
          <li className="m-3 text-xl">Explore<KeyboardArrowDownIcon className="mb-[2px]"/></li>
          <li className="m-3 text-xl">About</li>
        </ul>
      </div>
      <div className="h-full flex items-center m-4">
        <div className="m-3 text-xl p-3 rounded-2xl bg-pink-500"><button className="h-full w-full "><AddIcon className="mb-[3px]" />Create</button></div>
        <div className="m-3 text-xl p-3">Profile</div>
      </div>
    </div>
  );
};

export default Header;
