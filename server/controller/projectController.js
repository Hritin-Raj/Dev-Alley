import Projects from "../models/projects.js";
import Users from "../models/users.js";
import mongoose from "mongoose";

export const fetchProject = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    const project = await Projects.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const createProject = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "User id is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    const formData = req.body;
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
      technologies: formData.technologies || "",
      projectImage: formData.projectImage || "",
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

    const project = await Projects.findById(id).populate("authorId");

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

    res.status(200).json({ message: "Successful", likesCount: project.likes.length, project: project });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};


export const fetchTopPicks = async (req, res) => {
  console.log("received");
  try {
    const { id } = req.params;
    const { page = 1, limit = 8 } = req.query;
    const skip = (page - 1) * limit;

    const user = await Users.findById(id).select("following");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const followingList = user.following;

    const topPicks = await Projects.find({ authorId: { $in: followingList } })
      .sort({ likes: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("authorId", "name");

    res.status(200).json(topPicks);
  } catch (error) {
    console.error("Error fetching top picks:", error);
    res.status(500).json({ message: "Failed to fetch top picks." });
  }
};



export const fetchMostPopular = async (req, res) => {
  console.log("received");
  try {
    const { page = 1, limit = 8 } = req.query;
    const skip = (page - 1) * limit;

    const mostPopular = await Projects.find({})
      .sort({ likes: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("authorId", "name");

      console.log("most-popular", mostPopular);

    res.status(200).json(mostPopular);
  } catch (error) {
    console.error("Error fetching most popular:", error);
    res.status(500).json({ message: "Failed to fetch most popular projects." });
  }
};

export const fetchMostLiked = async (req, res) => {
  console.log("received");
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const mostLiked = await Projects.find({})
      .sort({ likes: -1 })
      .skip(skip)
      .limit(limit)
      .populate("authorId", "name");

    // console.log("most-liked", mostLiked);

    res.status(200).json(mostLiked);
  } catch (error) {
    console.error("Error fetching most liked:", error);
    res.status(500).json({ message: "Failed to fetch most liked projects." });
  }
};



//
// Edit Project
import { validationResult } from "express-validator";

export const uploadProjectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Get the uploaded file's public URL
    const imageUrl = `${req.protocol}://${req.get("host")}/${process.env.UPLOADS_FOLDER}/${req.file.filename}`;

    res.status(200).json({ imageUrl, message: "Image uploaded successfully." });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Server error during image upload." });
  }
};


export const updateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const formData = req.body.formData;

    if (!formData.title || !formData.description || !formData.githubLink) {
      return res.status(400).json({ message: "Title, description, and GitHub link are required." });
    }    

    const updatedProject = await Projects.findByIdAndUpdate(
      id,
      {
        ...formData,
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getRecentProjects = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default to top 10 recent projects if no limit is specified

    // Fetch projects sorted by createdAt in descending order
    const recentProjects = await Projects.find({})
      .sort({ createdAt: -1 }) // Sort by 'createdAt' in descending order
      .limit(limit); // Limit the number of results

    res.status(200).json({
      success: true,
      message: "Recent projects fetched successfully",
      projects: recentProjects,
    });
  } catch (error) {
    console.error("Error fetching recent projects:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching recent projects",
    });
  }
};


