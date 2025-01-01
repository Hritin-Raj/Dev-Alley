// Modified profile.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import { fetchData } from "../utils/api.js";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [userPopulated, setUserPopulated] = useState({ followers: [], following: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userIdToFetch = location.state?.id || userId;

        if (!userIdToFetch) {
          console.warn("No user ID found, redirecting to login.");
          navigate("/login");
          return;
        }

        const fetchedUser = await fetchData(`users/${userIdToFetch}`);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error.message);
        setError(error.message || "Failed to load user data");
      }
    };

    fetchUser();
  }, [location.state, userId, navigate]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);

        const userIdToFetch = location.state?.id || userId;
        if (!userIdToFetch) {
          console.warn("No user ID found, redirecting to login.");
          navigate("/login");
          return;
        }

        const data = await fetchData(`users/${userIdToFetch}/stats`);
        console.log("User Populated", data);
        if (!data) throw new Error("No data received from server");

        setUserPopulated(data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
        setError(error.message || "Failed to load user stats");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [userId, location.state, navigate]);

  if (loading || !user) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex p-4 bg-slate-100">
        <LeftPanel user={user} />
        <RightPanel 
          followers={userPopulated.followers} 
          following={userPopulated.following} 
        />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

