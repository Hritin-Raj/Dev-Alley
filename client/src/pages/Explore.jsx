import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { fetchData } from "../utils/api.js";
import { Github, ExternalLink, User, Code, Star, GitFork } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const {auth} = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const projectsData = await fetchData(`projects/${auth.user._id}/most-recent`);
        const usersData = await fetchData(`users/${auth.user._id}/top-users`);
        setProjects(projectsData.projects);
        setUsers(usersData.data);
        console.log("users", users);
      } catch (err) {
        console.error("Failed to fetch explore data", err);
      }
    };

    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Explore</h1>
        
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Code className="w-6 h-6 mr-2 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Trending Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                    {/* <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">{project.star || 0}</span>
                      <GitFork className="w-4 h-4 text-gray-500 ml-2" />
                      <span className="text-sm text-gray-600">{project.forks || 0}</span>
                    </div> */}
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex items-center space-x-4">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center mb-6">
            <User className="w-6 h-6 mr-2 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Top Users</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={user.profileImage || "/api/placeholder/40/40"}
                      alt={`${user.name}'s avatar`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {user.links.github && (
                      <a
                        href={`${user.links.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        GitHub Profile
                      </a>
                    )}
                    <a
                      onClick={() => {
                        navigate(`/profile/${user._id}`);
                      }}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <User className="w-4 h-4 mr-1" />
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;


