import React from "react";

const RightPanel = () => {
  return (
    <div id="right-panel" className="flex flex-col w-[25%] m-4">
      <div
        id="right-panel-up"
        className="w-full overflow-hidden h-2/5 my-3 p-3 text-2xl rounded-3xl bg-white"
      >People you may know</div>
      <div
        id="right-panel-down"
        className="w-full overflow-hidden h-3/5 my-3 rounded-3xl  bg-red-400"
      >fgjfxgnf</div>
    </div>
  );
};

export default RightPanel;
//h-[600px]
//flex-1