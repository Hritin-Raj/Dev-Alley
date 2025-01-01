import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const UserItem = ({
  name,
  userId,
  profileImage = "/api/placeholder/40/40",
  isFollowing = false,
  isFollower = false,
}) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div
      onClick={handleProfileClick}
      className="flex items-center justify-between p-4 my-2 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-3">
        <img
          src={profileImage}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium text-gray-800">{name}</span>
      </div>

      {isFollower && isFollowing ? (
        <Button variant="contained" className="">
          Follow{" "}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserItem;

