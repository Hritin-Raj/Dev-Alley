import React from "react";
import Header from "./components/Header";
import Post from "./components/Post-Project";
import Footer from "./components/Footer";
//  rounded-lg flex flex-1 m-7 bg-slate-300

const Project = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <p className="m-7 text-5xl">Recent Projects</p>
      <div className="rounded-lg flex flex-wrap justify-start m-4 p-3 bg-slate-300 gap-4">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      <Footer />
    </div>
  );
};

export default Project;
//grid grid-cols-2 gap-4