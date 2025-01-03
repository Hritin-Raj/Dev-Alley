import React from "react";
import Users from "../../../server/models/users";
import userBg from "../icons/userBg.jpg";
import Button from "@mui/material/Button";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import PostProfile from "./Post-Profile";
import PlaceIcon from "@mui/icons-material/Place";
import EditIcon from "@mui/icons-material/Edit";

const LeftPanel = ({ user }) => {
  if (!user) {
    return <div>User data is unavailable.</div>;
  }
  console.log(user);

  return (
    <div id="left-panel" className="flex flex-col w-[75%] m-4">
      <div
        id="left-panel-up"
        className="w-full relative bg-white flex flex-col overflow-hidden my-3 h-[600px] rounded-3xl"
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
            <span id="name" className="text-4xl mt-[20px]">
              {user.name}{" "}
              <span className="mx-[10px] ">
                <button className="text-2xl h-[40px] w-[80px] text-center bg-purple-300 rounded-lg hover:bg-purple-400">
                  <EditIcon className="mb-[3px]" />
                  Edit
                </button>
              </span>
            </span>
            <span id="bio" className="text-xl my-1">
              {user.bio}
            </span>
            <span id="location" className="text-lg">
              <PlaceIcon />
              {user.location}
            </span>
            <div className="text-xl my-[20px]">
              <span id="follower-count" className="text-3xl">
                {user.followers?.length  || 0 } <span className="text-xl">Followers</span>
              </span>
              <span id="connection-count" className="ml-3 text-3xl">
                {user.following?.length  || 0 } <span className="text-xl">Following</span>
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
            src="src\icons\DevelopmentIcon-1.jpg"
            alt="Circular Icon"
            className="w-40 h-40 rounded-full border-4 border-white"
          />
        </div>
      </div>

      <div
        id="left-panel-down"
        className="w-full overflow-hidden px-[50px] py-[20px] rounded-3xl flex-1 bg-white"
      >
        <div className="text-4xl mx-[20px] ">Posts</div>

        <div className="flex flex-wrap">
          <PostProfile />
          <PostProfile />
          <PostProfile />
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
