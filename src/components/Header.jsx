import React from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="h-[90px] w-full p-[15px]  flex justify-between items-center">
      <div className="h-full flex items-center text-[25px] m-4">DevAlley</div>
      <div className="h-full flex justify-between items-center">
        <SearchBar />
        <ul className="flex m-3  h-full items-center">
          <li className="m-3 text-xl">Explore</li>
          <li className="m-3 text-xl">About</li>
        </ul>
      </div>
      <div className="h-full flex items-center m-4">
        <div className="m-3 text-xl p-3 rounded-2xl bg-pink-500"><button className="h-full w-full">+Create</button></div>
        <div className="m-3 text-xl p-3">Profile</div>
      </div>
    </div>
  );
};

export default Header;
