import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || { results: { users: [], projects: [] } };

  const handleResultClick = (result) => {
    if (result.email) {
      navigate(`/profile/${result._id}`);
    } else if (result.githubLink) {
      window.open(result.githubLink, "_blank");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {results.users.length === 0 && results.projects.length === 0 && (
        <p>No results found.</p>
      )}

      {results.users.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <div className="bg-white border rounded shadow-md">
            {results.users.map((user) => (
              <div
                key={user._id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleResultClick(user)}
              >
                {user.name} ({user.email})
              </div>
            ))}
          </div>
        </div>
      )}

      {results.projects.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Projects</h2>
          <div className="bg-white border rounded shadow-md">
            {results.projects.map((project) => (
              <div
                key={project._id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleResultClick(project)}
              >
                {project.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
