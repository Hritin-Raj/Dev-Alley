import React from "react";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="mt-[30px]">

        <div className="text-[50px] text-center">
          Showcase. Inspire. Collaborate.
        </div>

        <div className="mt-2 px-[100px] text-center text-[20px]">
          Every project has a story to tell, a vision to share, and a spark to
          ignite. Our platform is more than just a space—it's a stage for
          creators, innovators, and dreamers to showcase their passion, inspire
          the world, and collaborate with a community that celebrates ideas.
        </div>

      </div>
      
      <Feed />

      <Footer />
    </div>
  );
};

export default Home;


// {/* <div id='feed' className="rounded-lg flex flex-wrap justify-between mx-[100px] my-[50px] gap-4">
//         <PostProject />
//         <PostProject />
//         <PostProject />
//         <PostProject />
//         <PostProject />
//         <PostProject />
//         <PostProject />
//       </div> */}