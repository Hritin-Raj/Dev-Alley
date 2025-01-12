import React, { useContext, useState, useEffect } from "react";
import userBg from "../icons/userBg.jpg";
import GitHubIcon from "@mui/icons-material/GitHub";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../contexts/AuthContext";
import { postData } from "../utils/api";

const Post = ({ project }) => {
  const { auth } = useContext(AuthContext);

  const [liked, setLikedState] = useState(false);
  const [likesCount, setLikesCount] = useState(project.likes.length);

  useEffect(() => {
    const currentUserId = auth.user._id;
    setLikedState(project.likes.includes(currentUserId));
  }, [project.likes]);

  const toggleLike = async () => {
    try {
      const response = await postData(`projects/${project._id}/like`, { userId: auth.user._id });
      setLikedState((prevLikedState) => !prevLikedState);
      setLikesCount(response.likesCount);
      console.log("likesCount", response.likesCount);
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };

  const handleEditClick = (e) => {
    navigate(`/projects/${project._id}/edit`, { state: { project: project }});
  }

  return (
    <div className=" rounded-3xl overflow-hidden w-[calc(50%-3rem)] m-[20px] px-[30px] pt-[30px] bg-white shadow-2xl">
      <div className="">
        <img
          src={project.projectImage || userBg}
          alt="Image"
          className="w-[500px] h-[250px] object-cover"
        />
      </div>

      <div className="cursor-pointer">
        <div id="heading" className="text-3xl mt-2">
          {project.title || "Untitled Project"}
        </div>
        <div id="author" className="text-xl mt-2">
          {project.authorId.name}
        </div>
        <div id="sub-heading" className="overflow-hidden h-[100px] text-xl mt-2">
          {project.description || "No description available"}
        </div>
      </div>

      <div className=" flex justify-between w-full">
        <div className="my-3 cursor-pointer" onClick={toggleLike}>
          {liked ? (
            <FavoriteIcon fontSize="large" style={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon fontSize="large" />
          )}
          <span className="ml-2 text-lg">{likesCount}</span>
        </div>

        <div>
          <ul>
            <li className="my-2">
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <GitHubIcon fontSize="large" />
              </a>
            </li>
          </ul>
          <span className="mt-2"><button onClick={handleEditClick}><EditIcon fontSize="large" /></button></span>
        </div>
      </div>
    </div>
  );
};

export default Post;
