import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    images: {
      type: [String], // Will store URLs after upload
      default: [],
    },
    githubLink: {
      type: String,
      required: true,
      trim: true,
    },
    demoLink: {
      type: String,
      trim: true,
      default: "",
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
      default: [],
    },
  },
  { timestamps: true }
);

// Export
const Projects = mongoose.model("projects", projectSchema);
export default Projects;
