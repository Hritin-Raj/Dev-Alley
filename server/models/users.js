import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    links: {
      github: {
        type: String,
        default: "",
      },
      linkedIn: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      portfolio: {
        type: String,
        default: "",
      },
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// pre-Middleware

// Export
const Users = mongoose.model('users', userSchema);
module.exports = Users;