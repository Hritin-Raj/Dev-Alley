import React from "react";

const RightPanel = () => {
  return (
    <div id="right-panel" className="flex flex-col w-[25%] m-4">
      <div
        id="right-panel-up"
        className="w-full overflow-hidden  h-[600px] my-3 p-3 text-2xl rounded-3xl bg-white"
      >People you may know</div>
      <div
        id="right-panel-down"
        className="w-full overflow-hidden  my-3 rounded-3xl flex-1 bg-red-400"
      ></div>
    </div>
  );
};

export default RightPanel;
