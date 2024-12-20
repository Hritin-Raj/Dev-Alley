import React from "react";
import userBg from "../icons/userBg.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// rounded-3xl overflow-hidden w-[100%] h-[300px] m-2 flex bg-red-200
//w-[calc(50%-1rem)]

const Post = () => {
  return (
    <div className=" rounded-3xl overflow-hidden w-[calc(50%-3rem)] m-[20px] px-[30px] pt-[30px] bg-white shadow-2xl">
      <div className="">
        <img src={userBg} alt="Image" className="w-[500px] h-[250px] object-cover" />
      </div>

      <div className="">
        <div id="heading" className="text-3xl mt-2">
          The Heading
        </div>
        <div id="author" className="">
          Author's name
        </div>
        <div id="sub-heading" className="text-xl mt-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
          nostrum architecto enim non placeat perspiciatis autem ab, saepe
          voluptas velit ratione, esse optio ullam nisi tempore soluta molestiae
          vitae atque.
        </div>
      </div>

      <div className="flex justify-between w-full">
        <div className="my-3">
          <FavoriteBorderIcon fontSize="large" className="" />
        </div>

        <div className="  w-[200px]">
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
  );
};

export default Post;

{
  /*  */
}
