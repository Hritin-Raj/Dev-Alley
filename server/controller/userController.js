import Users from "../models/users.js";
import { getUserStats } from "../models/dbCalls.js";
import mongoose from "mongoose";

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
    // console.log("user stats", user);
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

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    const user = await Users.findById(id);
    // console.log("user by id", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};




export const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const authUserId = req.body.userId;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(authUserId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid user ID format" 
      });
    }

    // Check if users exist and update them
    const userToFollow = await Users.findById(id);
    const authUser = await Users.findById(authUserId);

    if (!userToFollow || !authUser) {
      return res.status(404).json({ 
        success: false, 
        message: "One or both users not found" 
      });
    }

    // Check if already following
    if (authUser.following.includes(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Already following this user" 
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
      )
    ]);

    return res.json({
      success: true,
      message: "Successfully followed user",
      data: {
        following: updatedAuthUser.following,
        followers: updatedUserToFollow.followers
      }
    });

  } catch (error) {
    console.error('Follow user error:', error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const authUserId = req.body.userId;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(authUserId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid user ID format" 
      });
    }

    // Update both users using findByIdAndUpdate
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
      )
    ]);

    if (!updatedAuthUser || !updatedUserToFollow) {
      return res.status(404).json({ 
        success: false, 
        message: "One or both users not found" 
      });
    }

    return res.json({
      success: true,
      message: "Successfully unfollowed user",
      data: {
        following: updatedAuthUser.following,
        followers: updatedUserToFollow.followers
      }
    });

  } catch (error) {
    console.error('Unfollow user error:', error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};




// userController.js - Update editUser
import { validationResult } from 'express-validator';

export const editUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.user.userId; // Make sure this matches the ID from the token
    const formData = req.body.formData; // Update to match the frontend data structure

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        ...formData // Spread the form data directly
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

// export const editUser = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const userId = req.user.id; // Extracted from authMiddleware
//     const { name, bio, location, skills, profileImage, links } = req.body;

//     // Update user in the database
//     const updatedUser = await Users.findByIdAndUpdate(
//       userId,
//       {
//         name,
//         bio,
//         location,
//         skills,
//         profileImage,
//         links,
//       },
//       { new: true } // Return the updated user document
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(updatedUser);
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
