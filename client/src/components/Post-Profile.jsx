import React, { useState } from "react";
import userBg from "../icons/userBg.jpg";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Post = ({ project }) => {
  const [liked, setLikedState] = useState(false);

  const toggleLike = () => {
    setLikedState((prevLikedState) => !prevLikedState);
  };

  return (
    <div className=" rounded-3xl overflow-hidden w-[calc(50%-3rem)] m-[20px] px-[30px] pt-[30px] bg-white shadow-2xl">
      <div className="">
        <img
          src={userBg}
          alt="Image"
          className="w-[500px] h-[250px] object-cover"
        />
      </div>

      <div className="">
        <div id="heading" className="text-3xl mt-2">
          {project.title || "Untitled Project"}
        </div>
        <div id="author" className="text-xl mt-2">
          {project.authorId.name}
        </div>
        <div id="sub-heading" className="text-xl mt-2">
          {project.description || "No description available"}
        </div>
      </div>

      <div className="flex justify-between w-full">
        <div className="my-3 cursor-pointer" onClick={toggleLike}>
          {liked ? (
            <FavoriteIcon fontSize="large" style={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon fontSize="large" />
          )}
        </div>

        <div>
          <ul>
            <li className="my-2">
              <GitHubIcon fontSize="large" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Post;
