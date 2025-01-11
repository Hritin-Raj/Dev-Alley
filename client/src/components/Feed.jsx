import React, { useState, useEffect, useContext } from "react";
import PostProject from "./Post-Project";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Feed = () => {
  const [topPicks, setTopPicks] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [mostLiked, setMostLiked] = useState([]);
  const [topPicksPage, setTopPicksPage] = useState(1);
  const [mostPopularPage, setMostPopularPage] = useState(1);

  const { auth, loading } = useContext(AuthContext);

  const deduplicateProjects = (projects) => {
    const uniqueProjects = new Map();
    projects.forEach((project) => {
      uniqueProjects.set(project._id, project);
    });
    return Array.from(uniqueProjects.values());
  };

  const fetchTopPicks = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/projects/home/${auth.user._id}/top-picks?page=${page}`
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("top-picks", data);
      setTopPicks((prev) => deduplicateProjects([...prev, ...data]));
    } catch (error) {
      console.error("Error fetching top picks:", error);
    }
  };

  const fetchMostPopular = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/projects/home/${auth.user._id}/most-popular?page=${page}`
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("most-popular", data);
      // setMostPopular((prev) => [...prev, ...data]);
      setMostPopular((prev) => deduplicateProjects([...prev, ...data]));
    } catch (error) {
      console.error("Error fetching most popular:", error);
    }
  };

  const fetchMostLiked = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/projects/most-liked`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("most-liked", data);
      setMostLiked(deduplicateProjects(data));
    } catch (error) {
      console.error("Error fetching most liked projects:", error);
    }
  };

  useEffect(() => {
    if (loading) return;

    if (auth?.isLoggedIn) {
      console.log("auth logged in", auth);
      fetchTopPicks(1);
      fetchMostPopular(1);
    } else {
      console.log("auth", auth);
      fetchMostLiked();
    }
  }, [auth, loading]);

  const handleLoadMoreTopPicks = () => {
    const nextPage = topPicksPage + 1;
    setTopPicksPage(nextPage);
    fetchTopPicks(nextPage);
  };

  const handleLoadMoreMostPopular = () => {
    const nextPage = mostPopularPage + 1;
    setMostPopularPage(nextPage);
    fetchMostPopular(nextPage);
  };

  return (
    <div id="feed">
      {!auth?.user ? (
        <div id="most-liked" className="my-[50px]">
          <div className="mx-[100px] my-3 text-4xl">Most Liked Projects</div>
          <div className="rounded-lg flex flex-wrap justify-between mx-[100px] gap-4">
            {mostLiked.map((project) => (
              <PostProject
                key={project._id}
                project={{ ...project, isLiked: false }}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Logged-in user's view: "Top Picks" Section */}
          <div id="top-picks" className="my-[50px]">
            <div className="mx-[100px] my-3 text-4xl">Top Picks for You</div>
            <div className="rounded-lg flex flex-wrap justify-between mx-[100px] gap-4">
              {topPicks.map((project) => (
                <PostProject
                  key={project._id}
                  project={{
                    ...project,
                    isLiked: project.likes.includes(auth.user._id),
                  }}
                />
              ))}
            </div>
            <div
              className="text-center text-xl mt-4 cursor-pointer"
              onClick={handleLoadMoreTopPicks}
            >
              <KeyboardDoubleArrowDownIcon />
              View More
            </div>
          </div>

          {/* "Most Popular" Section */}
          <div id="most-popular" className="my-[50px]">
            <div className="mx-[100px] my-3 text-4xl">Most Popular</div>
            <div className="rounded-lg flex flex-wrap justify-between mx-[100px] gap-4">
              {mostPopular.map((project) => (
                <PostProject
                  key={project._id}
                  project={{
                    ...project,
                    isLiked: project.likes.includes(auth.user._id),
                  }}
                />
              ))}
            </div>
            <div
              className="text-center text-xl mt-4 cursor-pointer"
              onClick={handleLoadMoreMostPopular}
            >
              <KeyboardDoubleArrowDownIcon />
              View More
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Feed;
