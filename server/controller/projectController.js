import Projects from "../models/projects.js";
import Users from "../models/users.js";
import mongoose from "mongoose";

export const createProject = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "User id is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    const formData = req.body; // No need for `formData` nesting
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!formData.title || !formData.description || !formData.githubLink) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProject = new Projects({
      title: formData.title,
      authorId: user._id,
      description: formData.description,
      technologies: formData.technologies || [],
      images: formData.images || [],
      githubLink: formData.githubLink,
      demoLink: formData.demoLink || "",
      likes: [],
    });

    await newProject.save();
    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      error: "Failed to create project",
      details: error.message,
    });
  }
};


export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const project = await Projects.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const alreadyLiked = project.likes.includes(userId);

    if (alreadyLiked) {
      project.likes = project.likes.filter((id) => id.toString() !== userId.toString());
      console.log("likes", project.likes);
    } else {
      project.likes.push(userId);
      console.log("likes", project.likes);
    }

    await project.save();

    res.status(200).json({ message: "Successful", likesCount: project.likes.length });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};