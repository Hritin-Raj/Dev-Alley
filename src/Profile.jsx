import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex p-4 bg-slate-100">
        <LeftPanel />
        <RightPanel />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
