import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    links: {
      githubLink: {
        type: String,
        default: "",
      },
      demoLink: {
        type: String,
        default: "",
      },
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Export
const Projects = mongoose.model("projects", projectSchema);
module.exports = Projects;
