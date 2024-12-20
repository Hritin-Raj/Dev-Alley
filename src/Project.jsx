import React from "react";
import Header from "./components/Header";
import PostProject from "./components/Post-Project";
import Footer from "./components/Footer";
//  rounded-lg flex flex-1 m-7 bg-slate-300

const Project = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <div className="mx-[50px] my-[20px] bg-slate-300">
      <p className="my-4 mx-[50px] text-4xl">Recent Projects</p>
      <div className="rounded-lg flex flex-wrap  px-[50px] gap-8">
        <PostProject />
        <PostProject />
        <PostProject />
        <PostProject />
        <PostProject />
        <PostProject />
        <PostProject />
      </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Project;
//grid grid-cols-2 gap-4