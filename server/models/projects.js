import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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
export default Projects;
