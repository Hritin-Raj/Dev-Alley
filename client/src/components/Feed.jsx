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

  // De-duplication function
  const deduplicateProjects = (projects) => {
    const uniqueProjects = new Map();
    projects.forEach((project) => {
      uniqueProjects.set(project._id, project); // Use `_id` as the unique key
    });
    return Array.from(uniqueProjects.values());
  };

  // Fetch projects for "Top Picks" (logged-in user's followers).
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
      // setTopPicks((prev) => [...prev, ...data]);
      setTopPicks((prev) => deduplicateProjects([...prev, ...data]));
    } catch (error) {
      console.error("Error fetching top picks:", error);
    }
  };

  // Fetch projects for "Most Popular".
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

  // Fetch most liked projects for the home page (public view).
  const fetchMostLiked = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/projects/most-liked`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("most-liked", data);
      // setMostLiked(data);
      setMostLiked(deduplicateProjects(data));
    } catch (error) {
      console.error("Error fetching most liked projects:", error);
    }
  };

  useEffect(() => {
    if (loading) return; // Wait until the auth state is initialized

    if (auth?.isLoggedIn) {
      console.log("auth logged in", auth);
      fetchTopPicks(1); // Example page number
      fetchMostPopular(1);
    } else {
      console.log("auth", auth);
      fetchMostLiked();
    }
  }, [auth, loading]);

  // Load more top picks projects.
  const handleLoadMoreTopPicks = () => {
    const nextPage = topPicksPage + 1;
    setTopPicksPage(nextPage);
    fetchTopPicks(nextPage);
  };

  // Load more most popular projects.
  const handleLoadMoreMostPopular = () => {
    const nextPage = mostPopularPage + 1;
    setMostPopularPage(nextPage);
    fetchMostPopular(nextPage);
  };

  return (
    <div id="feed">
      {!auth?.user ? (
        // Public view: Display up to 8 projects of "Most Liked".
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
