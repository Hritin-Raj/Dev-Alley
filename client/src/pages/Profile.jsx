import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(location.state?.user);

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex p-4 bg-slate-100">
        <LeftPanel user={user} />
        <RightPanel />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
