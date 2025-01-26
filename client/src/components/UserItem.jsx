import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { postData } from "../utils/api";

const UserItem = ({
  name,
  userId,
  profileImage = "/api/placeholder/40/40",
  selfFollowing,
}) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [selfFollowingState, setSelfFollowingState] = useState(selfFollowing);

  const handleProfileClick = () => {
    navigate(`/profile/${userId}`);
  };

  const handleFollowClick = async () => {
      try {
        const response = await postData(`users/${userId}/follow`, {
          userId: auth.user._id,
        });
        if (response.success) {
          setSelfFollowingState(true);
          // Update followers in auth or user context
          auth.user.following = response.data.following;
        } else {
          console.error("Failed to follow user:", response.message);
        }
      } catch (error) {
        console.error("Error following user:", error);
      }
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

      {!selfFollowingState && userId !== auth.user._id && (
        <button
          className="bg-blue-500 text-white hover:bg-blue-400 w-[90px] h-[30px] rounded-lg text-lg"
          onClick={(e) => {
            e.stopPropagation();
            console.log(`Follow user with ID: ${userId}`);
            //Logic to follow the user here
            handleFollowClick()
          }}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default UserItem;
