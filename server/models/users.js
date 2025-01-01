import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Hritin Raj',
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      default: 'hritin@gmail.com',
    },
    password: {
      type: String,
      required: true,
      default: '1234',
    },
    profileImage: {
      type: String,
      default: "client/src/icons/DevelopmentIcon-1.jpg",
    },
    bio: {
      type: String,
      default: "Random bio",
    },
    location: {
      type: String,
      default: "Random location",
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
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }], 
      default: [],
    },
    following: { 
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }], 
      default: [],
    },
  },
  { timestamps: true }
);

const Users = mongoose.model('users', userSchema);
export default Users;
