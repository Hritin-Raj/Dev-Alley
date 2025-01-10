import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import userBg from "../icons/userBg.jpg"; // Default background image
import GitHubIcon from "@mui/icons-material/GitHub";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { postData } from "../utils/api"; // Assuming postData is your API utility function
import { AuthContext } from "../contexts/AuthContext";

const Post = ({ project }) => {
  const [liked, setLiked] = useState(project.isLiked || false); // Initialize from project data
  const [likesCount, setLikesCount] = useState(project.likes || 0); // Initialize from project data

  const { auth } = useContext(AuthContext);

  // Function to handle like/unlike actions
  const toggleLike = async () => {
    try {
      const response = await postData(`projects/${project._id}/like`, {
        userId: auth.user._id, // Replace with actual user ID
      });

      console.log("response", response);

      if (response) {
        setLiked((prevLikedState) => !prevLikedState);
        setLikesCount(response.likesCount);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="rounded-3xl overflow-hidden w-[calc(50%-1rem)] h-[300px] mt-2 flex bg-white shadow-2xl">
      {/* Project Image */}
      <div className="w-[300px] h-full">
        <img
          src={project.image || userBg}
          alt="Project"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Project Details */}
      <div className="relative flex-1">
        <div id="heading" className="px-3 mt-2 text-4xl">
          {project.title || "Project Title"}
        </div>
        <div id="author" className="px-3 mt-2 text-sm text-gray-600">
          by {project.authorId.name || "Unknown Author"}
        </div>
        <div id="sub-heading" className="px-3 mt-2 text-lg line-clamp-3">
          {project.description ||
            "No description available for this project. Click to learn more."}
        </div>

        {/* Like and External Links */}
        <div className="absolute bottom-0 flex justify-between w-full">
          {/* Like Button */}
          <div
            className="m-3 cursor-pointer flex items-center"
            onClick={toggleLike}
          >
            {liked ? (
              <FavoriteIcon fontSize="large" style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon fontSize="large" />
            )}
            <span className="ml-2 text-lg">{likesCount}</span>
          </div>

          {/* GitHub Icon or Other Links */}
          <div className="mr-3">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ul>
                  <li className="m-2">
                    <GitHubIcon fontSize="large" />
                  </li>
                </ul>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    authorName: PropTypes.string,
    image: PropTypes.string,
    likes: PropTypes.number,
    isLiked: PropTypes.bool,
    githubLink: PropTypes.string,
  }).isRequired,
};

export default Post;
