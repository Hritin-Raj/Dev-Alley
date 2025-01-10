import React, { useState, useEffect } from "react";

const Explore = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await fetch("/api/projects/trending");
        const usersResponse = await fetch("/api/users/top");
        const projectsData = await projectsResponse.json();
        const usersData = await usersResponse.json();

        setProjects(projectsData);
        setUsers(usersData);
      } catch (err) {
        console.error("Failed to fetch explore data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Explore</h1>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Trending Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="p-4 border rounded shadow-md hover:shadow-lg cursor-pointer"
            >
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Top Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="p-4 border rounded shadow-md hover:shadow-lg cursor-pointer"
            >
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;
