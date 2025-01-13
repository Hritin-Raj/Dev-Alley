import Users from "./users.js";
import mongoose from 'mongoose';
// import Users from './users.js';

export const getUserStats = async (id) => {
  // Input validation
  if (!id) {
    throw new Error('User ID is required');
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid user ID format');
  }

  try {
    // Check if user exists first
    const userExists = await Users.exists({ _id: id });
    if (!userExists) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    // Fetch user with populated fields
    const user = await Users.findById(id)
      .select('-password') // Exclude password
      .populate('followers', 'name _id profileImage')
      .populate('following', 'name _id profileImage')
      .lean(); // Convert to plain JavaScript object for better performance

    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    // Add additional stats
    const stats = {
      ...user,
      followersCount: user.followers?.length || 0,
      followingCount: user.following?.length || 0,
      // Add any other computed stats here
    };

    return stats;

  } catch (error) {
    // Enhanced error handling
    console.error('Error in getUserStats:', {
      error: error.message,
      userId: id,
      stack: error.stack
    });

    // Preserve status code if it exists, otherwise default to 500
    error.status = error.status || 500;
    throw error;
  }
};

// export const getUserStats = async (id) => {
//   // Validate ID format
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     throw new Error("Invalid user ID format");
//   }

//   try {
//     const user = await Users.findById(id)
//       .populate("followers", "name _id") // Fetch specific fields
//       .populate("following", "name _id");
//     return user;
//   } catch (error) {
//     console.error("Error fetching user stats:", error);
//     throw error;
//   }
// };

// export const getSuggestedUsers = async () => {
//   try {
//     const users = await Users.find({}, "name _id").limit(10); // Example: Fetch 10 users
//     return users;
//   } catch (error) {
//     console.error("Error fetching suggested users:", error);
//     throw error;
//   }
// };
