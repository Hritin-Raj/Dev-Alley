import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import userBg from "../icons/userBg.jpg";
import GitHubIcon from "@mui/icons-material/GitHub";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from '@mui/icons-material/Edit';
import { postData } from "../utils/api";
import { AuthContext } from "../contexts/AuthContext";

const Post = ({ project }) => {
  const [liked, setLiked] = useState(project.isLiked);
  const [likesCount, setLikesCount] = useState(project.likes.length);
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const toggleLike = async () => {
    if (!auth?.user) {
      alert("Please log in to like a project.");
      navigate("/login");
      return;
    }

    try {
      const response = await postData(`projects/${project._id}/like`, {
        userId: auth.user._id,
      });

      if (response) {
        setLiked(!liked);
        setLikesCount(response.likesCount);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleEditClick = (e) => {
    navigate(`/projects/${project._id}/edit`, { state: { project: project }});
  }

  return (
    <div className="rounded-3xl overflow-hidden w-[calc(50%-1rem)] h-[300px] mt-2 flex bg-white shadow-2xl">
      {/* Project Image */}
      <div className="w-[300px] h-full">
        <img
          src={project.projectImage || userBg}
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
          <div className="mr-3 flex">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ul className="mr-2">
                  <li className="m-2">
                    <GitHubIcon fontSize="large" />
                  </li>
                </ul>
              </a>
            )}
            <span className="mt-2"><button onClick={handleEditClick}><EditIcon fontSize="large" /></button></span>
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
    authorId: PropTypes.shape({
      name: PropTypes.string,
    }),
    description: PropTypes.string,
    image: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
    githubLink: PropTypes.string,
    isLiked: PropTypes.bool,
  }).isRequired,
};

export default Post;
