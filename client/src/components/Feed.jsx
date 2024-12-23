import React from "react";
import PostProject from "./Post-Project";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const Feed = () => {
  return (
    <div
      id="feed"
    >
      <div id="top-picks" className="my-[50px]">
        <div className="mx-[100px] my-3 text-4xl">Top Picks for You</div>
        <div className="rounded-lg flex flex-wrap justify-between mx-[100px]  gap-4">
          <PostProject />
          <PostProject />
          <PostProject />
          <PostProject />
        </div>
        <div className="text-center text-xl mt-4"><KeyboardDoubleArrowDownIcon />View More</div>
      </div>

      <div id="most-popular" className="my-[50px]">
        <div className="mx-[100px] my-3 text-4xl">Most Popular</div>
        <div className="rounded-lg flex flex-wrap justify-between mx-[100px] gap-4">
          <PostProject />
          <PostProject />
          <PostProject />
        </div>
        <div className="text-center text-xl mt-4"><KeyboardDoubleArrowDownIcon />View More</div>
      </div>

    </div>
  );
};

export default Feed;
