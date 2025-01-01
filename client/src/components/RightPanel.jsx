// Modified right-panel.jsx
import React, { useState } from "react";
import UserItem from "./UserItem";

const RightPanel = ({ followers, following }) => {
  const [displayFollower, setDisplayFollower] = useState(true);

  const handleClick = (event) => {
    const target = event.target.getAttribute("data-name");
    setDisplayFollower(target === "follower");
  };

  const checkFollowing = (userId) => {
    return following.find((user) => user._id === userId) ? true : false;
  };

  const checkFollower = (userId) => {
    return followers.find((user) => user._id === userId) ? true : false;
  };

  // const userList = displayFollower ? followers : following;

  return (
    <div id="right-panel" className="flex flex-col w-[25%] m-4">
      <div
        id="right-panel-up"
        className="w-full overflow-hidden h-2/5 my-3 px-5 py-3 text-2xl rounded-3xl bg-white"
      >
        <div className="flex justify-around text-gray-600">
          <span
            className="hover:text-gray-400 cursor-pointer"
            data-name="follower"
            onClick={handleClick}
          >
            Followers
          </span>
          <span
            className="hover:text-gray-400 cursor-pointer"
            data-name="following"
            onClick={handleClick}
          >
            Following
          </span>
        </div>
        <div id="stat-list" className="overflow-auto my-2">
          {displayFollower
            ? followers.map((user) => (
                <UserItem
                  key={user._id}
                  name={user.name}
                  userId={user._id}
                  profileImage={user.profileImage}
                  isFollowing={checkFollowing(user._id)}
                  isFollower={true}
                />
              ))
            : following.map((user) => (
                <UserItem
                  key={user._id}
                  name={user.name}
                  userId={user._id}
                  profileImage={user.profileImage}
                />
              ))}
        </div>
      </div>
      <div
        id="right-panel-down"
        className="w-full overflow-hidden h-3/5 max-h-[800px] my-3 px-5 py-3 text-2xl rounded-3xl bg-white"
      >
        <div>Suggestions</div>
        <div id="suggestion-list" className="overflow-hidden my-2">
          list
        </div>
      </div>
    </div>
  );
};

export default RightPanel;

