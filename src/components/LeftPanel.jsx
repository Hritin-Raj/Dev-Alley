import React from "react";
import userBg from "../icons/userBg.jpg";
import Button from "@mui/material/Button";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const LeftPanel = () => {
  return (
    <div id="left-panel" className="flex flex-col w-[75%] m-4">
      <div
        id="left-panel-up"
        className="w-full relative bg-white flex flex-col overflow-hidden my-3 rounded-3xl h-[500px]"
      >
        <img
          id="user-img"
          src={userBg}
          alt="Image"
          className="w-full h-[40%] object-cover rounded-lg"
        />

        {/* User Info */}
        <div className="flex justify-between">
          <div className="flex flex-col  mr-3 flex-1  pt-[70px] px-[40px]">
            <span id="name" className="text-3xl mt-[20px]">
              Hritin Raj
            </span>
            <span id="bio" className="my-1">
              MERN Stack Developer
            </span>
            <span id="location">Jamshedpur, India</span>
            <div className="my-[20px]">
              <span id="follower-count">100 Followers</span>
              <span id="connection-count" className="ml-3">
                50 Connections
              </span>
            </div>
            <Button variant="contained" className="w-[150px]">
              Follow
            </Button>
          </div>

          <div className=" ml-3 w-[200px]">
            <ul className="flex justify-center">
              <li className="m-2">
                <InstagramIcon fontSize="large" />
              </li>
              <li className="m-2">
                <LinkedInIcon fontSize="large" />
              </li>
              <li className="m-2">
                <GitHubIcon fontSize="large" />
              </li>
            </ul>
          </div>
          
        </div>

        <div
          id="circular-icon"
          className="absolute top-[40%] left-[30px] transform -translate-y-1/2"
        >
          <img
            src="https://via.placeholder.com/150"
            alt="Circular Icon"
            className="w-40 h-40 rounded-full border-4 border-white"
          />
        </div>
      </div>

      <div
        id="left-panel-down"
        className="w-full overflow-hidden px-[30px] py-[20px] my-3 rounded-3xl flex-1 bg-white"
      >
        <span className="text-2xl">Posts</span>
      </div>
    </div>
  );
};

export default LeftPanel;
