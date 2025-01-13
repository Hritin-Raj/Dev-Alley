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
    projectImage: {
      type: String, // Store the URL of the uploaded image
      default: "",
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

const Projects = mongoose.model("projects", projectSchema);
export default Projects;



