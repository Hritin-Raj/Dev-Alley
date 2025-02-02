import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userBg from "../icons/userBg.jpg";
import Button from "@mui/material/Button";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import PostProfile from "./Post-Profile";
import PlaceIcon from "@mui/icons-material/Place";
import EditIcon from "@mui/icons-material/Edit";
// import LogoutButton from "./LogoutButton";

import { AuthContext } from "../contexts/AuthContext";
import { postData } from "../utils/api";

const LeftPanel = ({ user, projects }) => {
  if (!user) {
    return <div>User data is unavailable.</div>;
  }

  const { auth, logout } = useContext(AuthContext);
  const { userId } = useParams();
  const navigate = useNavigate();

  const [selfFollowing, setSelfFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isSelfFollowing = () => {
      setSelfFollowing(auth.user.following?.includes(userId));
    };

    auth.user._id !== user._id ? isSelfFollowing() : "";
  }, [auth.user.following, userId, auth.user._id, user._id]);

  const handleLogout = async () => {
    if (!auth.isLoggedIn) {
      console.warn("User is not logged in.");
      return;
    }

    setIsLoading(true);
    try {
      navigate("/login", { replace: true });
      logout();
      console.log("User logged out successfully.", auth);
      // navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowClick = async () => {
    try {
      const response = await postData(`users/${userId}/follow`, {
        userId: auth.user._id,
      });
      if (response.success) {
        setSelfFollowing(true);
        auth.user.following = response.data.following;
      } else {
        console.error("Failed to follow user:", response.message);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollowClick = async () => {
    try {
      const response = await postData(`users/${userId}/unfollow`, {
        userId: auth.user._id,
      });
      if (response.success) {
        setSelfFollowing(false);
        auth.user.following = response.data.following;
      } else {
        console.error("Failed to unfollow user:", response.message);
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const handleEditClick = (event) => {
    navigate(`/profile/${userId}/edit`);
  };

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
            <span id="name" className="text-4xl mt-[20px] flex">
              {user.name}{" "}
              <span className="mx-[20px] ">
                {auth.user._id === user._id ? (
                  <button
                    onClick={handleEditClick}
                    className="text-2xl h-[40px] w-[80px] text-center bg-purple-300 rounded-lg hover:bg-purple-400"
                  >
                    <EditIcon className="mb-[3px]" />
                    Edit
                  </button>
                ) : (
                  ""
                )}
              </span>
              <span className="my-2">
                {auth.isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Logout
                  </button>
                )}
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
                {user.followers?.length || 0}{" "}
                <span className="text-xl">Followers</span>
              </span>
              <span id="connection-count" className="ml-3 text-3xl">
                {user.following?.length || 0}{" "}
                <span className="text-xl">Following</span>
              </span>
            </div>
            {auth.user._id !== user._id && (
              <Button
                variant="contained"
                onClick={
                  selfFollowing ? handleUnfollowClick : handleFollowClick
                }
                className="w-[150px]"
              >
                {selfFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>

          <div className=" ml-3 w-[200px]">
            <ul className="flex justify-center">
              <li className="m-2">
                <a
                  href={auth.user.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon fontSize="large" />
                </a>
              </li>
              <li className="m-2">
                <a
                  href={auth.user.links.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon fontSize="large" />
                </a>
              </li>
              <li className="m-2">
                <a
                  href={auth.user.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon fontSize="large" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          id="circular-icon"
          className="absolute top-[40%] left-[30px] transform -translate-y-1/2"
        >
          <img
            src={
              user?.profileImage
                ? user.profileImage
                : "../icons/DevelopmentIcon-1.jpg"
            }
            alt="Circular Icon"
            className="w-40 h-40 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      <div
        id="left-panel-down"
        className="w-full overflow-hidden px-[50px] py-[20px] rounded-3xl flex-1 bg-white"
      >
        <div className="text-4xl mx-[20px] ">Posts</div>

        <div className="flex flex-wrap">
          {projects.length === 0 ? (
            <p> No projects to display</p>
          ) : (
            projects.map((project) => (
              <PostProfile key={project._id} project={project} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
