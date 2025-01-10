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

  const { auth } = useContext(AuthContext);

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
      setTopPicks((prev) => {
        const combined = [...prev, ...data];
        return combined.slice(0, 8); // Limit to a maximum of 8 projects
      });
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
      setMostPopular((prev) => {
        const combined = [...prev, ...data];
        return combined.slice(0, 8); // Limit to a maximum of 8 projects
      });
    } catch (error) {
      console.error("Error fetching most popular:", error);
    }
  };

  // Fetch most liked projects for the home page (public view).
  const fetchMostLiked = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/projects/most-liked`
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setMostLiked(data.slice(0, 8)); // Limit to a maximum of 8 projects
    } catch (error) {
      console.error("Error fetching most liked projects:", error);
    }
  };

  // Initial data fetch.
  useEffect(() => {
    if (auth?.user) {
      // Logged-in user's view
      fetchTopPicks(topPicksPage);
      fetchMostPopular(mostPopularPage);
    } else {
      // Public view (most liked projects)
      fetchMostLiked();
    }
  }, [auth]);

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
                project={{ ...project, likes: project.likes.length }}
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
                  project={{ ...project, likes: project.likes.length }}
                />
              ))}
            </div>
            {topPicks.length < 8 && (
              <div
                className="text-center text-xl mt-4 cursor-pointer"
                onClick={handleLoadMoreTopPicks}
              >
                <KeyboardDoubleArrowDownIcon />
                View More
              </div>
            )}
          </div>

          {/* "Most Popular" Section */}
          <div id="most-popular" className="my-[50px]">
            <div className="mx-[100px] my-3 text-4xl">Most Popular</div>
            <div className="rounded-lg flex flex-wrap justify-between mx-[100px] gap-4">
              {mostPopular.map((project) => (
                <PostProject
                  key={project._id}
                  project={{ ...project, likes: project.likes.length }}
                />
              ))}
            </div>
            {mostPopular.length < 8 && (
              <div
                className="text-center text-xl mt-4 cursor-pointer"
                onClick={handleLoadMoreMostPopular}
              >
                <KeyboardDoubleArrowDownIcon />
                View More
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Feed;

