import React, { useState } from "react";
import userBg from "../icons/userBg.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// rounded-3xl overflow-hidden w-[100%] h-[300px] m-2 flex bg-red-200
//w-[calc(50%-1rem)]

const Post = () => {
  const [liked, setLikedState] = useState(false);

  const toggleLike = () => {
    setLikedState((prevLikedState) => !prevLikedState);
  };

  return (
    <div className="rounded-3xl overflow-hidden w-[calc(50%-1rem)] h-[300px] mt-2 flex bg-white shadow-2xl">
      <div className="w-[300px] h-full ">
        <img src={userBg} alt="Image" className="h-full w-full object-cover" />
      </div>
      <div className="relative flex-1">
        <div id="heading" className="px-3 mt-2 text-4xl">
          The Heading
        </div>
        <div id="author" className="px-3 mt-2">
          Author's name
        </div>
        <div id="sub-heading" className="px-3 mt-2 text-lg">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
          nostrum architecto enim non placeat perspiciatis autem ab, saepe
          voluptas velit ratione, esse optio ullam nisi tempore soluta molestiae
          vitae atque.
        </div>

        <div className="absolute bottom-0 flex justify-between w-full">
          <div className="m-3 cursor-pointer" onClick={toggleLike}>
            {liked ? (
              <FavoriteIcon fontSize="large" style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon fontSize="large" />
            )}
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
      </div>
    </div>
  );
};

export default Post;
