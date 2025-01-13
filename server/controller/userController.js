import Users from "../models/users.js";
import { getUserStats } from "../models/dbCalls.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';

// Load the environment variables
dotenv.config();

export const getStats = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    const user = await getUserStats(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const suggestions = async (req, res) => {
  // try {
  //   const suggestedUsers = await getSuggestedUsers();
  //   res.json(suggestedUsers);
  // } catch (error) {
  //   console.error("Error fetching suggested users:", error);
  //   res.status(500).json({ error: "Internal server error" });
  // }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getUserProjects = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "No user id received" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid User Id" });
  }

  try {
    const projects = await Projects.find({ authorId: id }).populate({
      path: "authorId",
      select: "name",
    });

    if (!projects || projects.length === 0) {
      return res.json({ message: "No projects found", projects });
    }

    console.log(projects)
    res.status(200).json({ message: "Successful", projects});
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({
      error: "Failed to fetch projects",
      details: err.message,
    });
  }
};





export const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const authUserId = req.body.userId;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(authUserId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const userToFollow = await Users.findById(id);
    const authUser = await Users.findById(authUserId);

    if (!userToFollow || !authUser) {
      return res.status(404).json({
        success: false,
        message: "One or both users not found",
      });
    }

    // Check if already following
    if (authUser.following.includes(id)) {
      return res.status(400).json({
        success: false,
        message: "Already following this user",
      });
    }

    // Update both users using findByIdAndUpdate to ensure atomicity
    const [updatedAuthUser, updatedUserToFollow] = await Promise.all([
      Users.findByIdAndUpdate(
        authUserId,
        { $addToSet: { following: id } },
        { new: true }
      ),
      Users.findByIdAndUpdate(
        id,
        { $addToSet: { followers: authUserId } },
        { new: true }
      ),
    ]);

    return res.json({
      success: true,
      message: "Successfully followed user",
      data: {
        following: updatedAuthUser.following,
        followers: updatedUserToFollow.followers,
      },
    });
  } catch (error) {
    console.error("Follow user error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const authUserId = req.body.userId;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(authUserId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const [updatedAuthUser, updatedUserToFollow] = await Promise.all([
      Users.findByIdAndUpdate(
        authUserId,
        { $pull: { following: id } },
        { new: true }
      ),
      Users.findByIdAndUpdate(
        id,
        { $pull: { followers: authUserId } },
        { new: true }
      ),
    ]);

    if (!updatedAuthUser || !updatedUserToFollow) {
      return res.status(404).json({
        success: false,
        message: "One or both users not found",
      });
    }

    return res.json({
      success: true,
      message: "Successfully unfollowed user",
      data: {
        following: updatedAuthUser.following,
        followers: updatedUserToFollow.followers,
      },
    });
  } catch (error) {
    console.error("Unfollow user error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Edit User
import { validationResult } from "express-validator";
import Projects from "../models/projects.js";


// edit
export const editUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.user.userId;
    const formData = req.body.formData;

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        ...formData,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


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



export const fetchTopUsers = async (req, res) => {
  try {
    const topUsers = await Users.aggregate([
      {
        $lookup: {
          from: "projects", // Collection name for projects
          localField: "_id", // User ID in the users collection
          foreignField: "authorId", // Author ID in the projects collection
          as: "userProjects", // Alias for the joined data
        },
      },
      {
        $addFields: {
          projectCount: { $size: "$userProjects" }, // Count the number of projects
        },
      },
      {
        $sort: { projectCount: -1 }, // Sort by project count in descending order
      },
      {
        $limit: 10, // Limit to the top 10 users
      },
      {
        $project: {
          name: 1,
          email: 1,
          projectCount: 1, // Include only the fields you need
          "links.github": 1, // Include the GitHub link
          "profileImage": 1,
        },
      },
    ]);
    console.log("top-users", topUsers);

    res.status(200).json({
      success: true,
      message: "Top users fetched successfully.",
      data: topUsers,
    });
  } catch (error) {
    console.error("Error fetching top users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch top users.",
      error: error.message,
    });
  }
};

