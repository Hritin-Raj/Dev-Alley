import Users from "../models/users.js";
import Projects from "../models/projects.js";
// import mongoose from "mongoose";

export const search = async (req, res) => {
  console.log("Search query received:", req.query);
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const users = await Users.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    const projects = await Projects.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { technologies: { $regex: query, $options: "i" } },
      ],
    });

    console.log("users", users);
    console.log("projects", projects);

    res.json({ users, projects });
  } catch (err) {
    res.status(500).json({ error: "Failed to perform search" });
  }
};
