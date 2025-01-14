// feed.jsx:
import React, { useState, useEffect, useContext } from "react";
import PostProject from "./Post-Project";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Feed = () => {
  const [projects, setProjects] = useState({});
  const [topPicksIds, setTopPicksIds] = useState([]);
  const [mostPopularIds, setMostPopularIds] = useState([]);
  const [mostLikedIds, setMostLikedIds] = useState([]);
  const [topPicksPage, setTopPicksPage] = useState(1);
  const [mostPopularPage, setMostPopularPage] = useState(1);

  const { auth, loading } = useContext(AuthContext);

  const updateProjectsState = (newProjects) => {
    setProjects((prevProjects) => {
      const updatedProjects = { ...prevProjects };
      newProjects.forEach((project) => {
        updatedProjects[project._id] = project;
      });
      return updatedProjects;
    });
  };

  const deduplicateIds = (ids) => {
    return Array.from(new Set(ids));
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
      updateProjectsState(data);
      setTopPicksIds((prev) =>
        deduplicateIds([...prev, ...data.map((p) => p._id)])
      );
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
      updateProjectsState(data);
      setMostPopularIds((prev) =>
        deduplicateIds([...prev, ...data.map((p) => p._id)])
      );
    } catch (error) {
      console.error("Error fetching most popular:", error);
    }
  };

  const fetchMostLiked = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/projects/most-liked`
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      updateProjectsState(data);
      setMostLikedIds(deduplicateIds(data.map((p) => p._id)));
    } catch (error) {
      console.error("Error fetching most liked projects:", error);
    }
  };

  useEffect(() => {
    if (loading) return;

    if (auth?.isLoggedIn) {
      fetchTopPicks(1);
      fetchMostPopular(1);
    } else {
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

  const renderProjects = (ids) =>
    ids.map((id) => (
      <PostProject
        key={id}
        project={{
          ...projects[id],
          isLiked: projects[id]?.likes.includes(auth?.user?._id),
        }}
      />
    ));


  return (
    <div id="feed">
      {!auth?.user ? (
        <div id="most-liked" className="my-[50px]">
          <div className="mx-[100px] my-3 text-4xl">Most Liked Projects</div>
          <div className="rounded-lg flex flex-wrap justify-between mx-[100px] gap-4">
            {renderProjects(mostLikedIds)}
          </div>
        </div>
      ) : (
        <>
          <div id="top-picks" className="my-[50px]">
            <div className="mx-[100px] my-3 text-4xl">Top Picks for You</div>
            <div className="rounded-lg flex flex-wrap justify-between mx-[100px] gap-4">
              {renderProjects(topPicksIds)}
            </div>
            <div
              className="text-center text-xl mt-4 cursor-pointer"
              onClick={handleLoadMoreTopPicks}
            >
              <KeyboardDoubleArrowDownIcon />
              View More
            </div>
          </div>

          <div id="most-popular" className="my-[50px]">
            <div className="mx-[100px] my-3 text-4xl">Most Popular</div>
            <div className="rounded-lg flex flex-wrap justify-between mx-[100px] gap-4">
              {renderProjects(mostPopularIds)}
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