import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import LinkIcon from "@mui/icons-material/Link";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, searchTerm } = location.state || {
    results: { users: [], projects: [] },
    searchTerm: "",
  };

  const handleResultClick = (result) => {
    if (result.email) {
      navigate(`/profile/${result._id}`);
    } else if (result.githubLink) {
      window.open(result.githubLink, "_blank");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <SearchIcon className="w-8 h-8 text-pink-500" />
          <h1 className="text-3xl font-bold">Search Results</h1>
        </div>
        {searchTerm && (
          <p className="text-gray-600">
            Showing results for "
            <span className="font-semibold">{searchTerm}</span>"
          </p>
        )}
      </div>

      {/* No Results Message */}
      {results.users.length === 0 && results.projects.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">No results found.</p>
          <p className="text-gray-500 mt-2">
            Try different keywords or check your spelling
          </p>
        </div>
      )}

      {/* Results Grid */}
      <div className="grid gap-6">
        {/* Users Section */}
        {results.users.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <PersonIcon className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold">Users</h2>
              <span className="text-sm text-gray-500">
                ({results.users.length})
              </span>
            </div>
            <div className="grid gap-3">
              {results.users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => handleResultClick(user)}
                  className="flex bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                >
                  <img
                    src={user.profileImage}
                    alt={name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="ml-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-2xl">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                    <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <LinkIcon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {results.projects.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <WorkIcon className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-semibold">Projects</h2>
              <span className="text-sm text-gray-500">
                ({results.projects.length})
              </span>
            </div>
            <div className="grid gap-3">
              {results.projects.map((project) => (
                <div
                  key={project._id}
                  onClick={() => handleResultClick(project)}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      {project.description && (
                        <p className="text-gray-600 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                      {project.technologies &&
                      Array.isArray(project.technologies) ? (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      ) : project.technologies &&
                        typeof project.technologies === "string" ? (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {project.technologies
                            .split(",")
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                        </div>
                      ) : null}
                    </div>
                    <div className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <LinkIcon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
