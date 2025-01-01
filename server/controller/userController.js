import Users from "../models/users.js";
import { getUserStats } from "../models/dbCalls.js";
import mongoose from "mongoose";

export const stats = async (req, res) => {
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
  const id = req.params.id; // Fix the destructuring

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    // Fetch user from the database
    const user = await Users.findById(id); // Use `findById` for cleaner code
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user); // Send user data as JSON
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
