import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../utils/api";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchData(`search?query=${encodeURIComponent(searchTerm)}`);
      if (data) {
        console.log("Search Results:", data);
        navigate("/search", { state: { results: data } });
      } else {
        setError(data.error || "Search failed");
      }
    } catch (err) {
      console.error("Search failed", err);
      setError("Search failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-full m-3 overflow-hidden rounded-3xl flex justify-around items-center w-[500px] bg-gray-200">
      <input
        className="w-[400px] h-full outline-none bg-gray-200 placeholder-black px-4"
        type="text"
        placeholder="What are you looking for?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center"
        onClick={handleSearch}
        disabled={isLoading}
      >
        <SearchIcon />
      </button>

      {isLoading && (
        <div className="absolute top-[100%] left-0 w-full bg-white border rounded shadow-md p-4 text-center">
          Loading...
        </div>
      )}

      {error && (
        <div className="absolute top-[100%] left-0 w-full bg-white border rounded shadow-md p-4 text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchBar;


