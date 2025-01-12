import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { putData } from "../utils/api";
import { AuthContext } from "../contexts/AuthContext";

const EditProjectForm = () => {
  const location = useLocation();
  const project = location.state?.project || null;
  console.log("project", project);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [technologyInput, setTechnologyInput] = useState("");
  const { projectId } = useParams();
//   const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    projectImage: "",
    githubLink: "",
    demoLink: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      if (project) {
        // Use project data from location.state if available
        setFormData({
          title: project.title,
          description: project.description,
          technologies: project.technologies,
          githubLink: project.githubLink,
          demoLink: project.demoLink,
          projectImage: project.projectImage,
        });
      } else {
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:3000/api/projects/${projectId}`);
          const data = await response.json();
          setFormData({
            title: data.title,
            description: data.description,
            technologies: data.technologies,
            githubLink: data.githubLink,
            demoLink: data.demoLink,
            projectImage: data.projectImage,
          });
        } catch (err) {
          setError("Failed to fetch project details.");
        } finally {
            setIsLoading(false);
        }
      }
    };
    fetchProject();
  }, [project, projectId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add technology to the list
  const handleAddTechnology = () => {
    if (
      technologyInput.trim() &&
      !formData.technologies.includes(technologyInput)
    ) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, technologyInput.trim()],
      }));
      setTechnologyInput("");
    } else {
      setError("Technology is either empty or already added.");
    }
  };

  // Remove a technology from the list
  const handleRemoveTechnology = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return false;
    }
    if (!formData.githubLink.trim()) {
      setError("GitHub link is required");
      return false;
    }
    return true;
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await putData(`projects/${project._id}/update`, { formData });
      console.log("Updated User data", data);

      navigate(`/profile/${auth.user._id}`);
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <form
        className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-8 border border-gray-100"
        onSubmit={onSubmit}
      >
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Project
        </h2>

        <div className="space-y-3">
          <label className="block text-xl font-semibold text-gray-700">
            Title (required)
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            placeholder="Enter project title"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-xl font-semibold text-gray-700">
            Description (required)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            placeholder="Describe your project"
          ></textarea>
        </div>

        <div className="space-y-3">
          <label className="block text-xl font-semibold text-gray-700">
            Technologies
          </label>

          {/* Input for adding new technologies */}
          <div className="flex items-center space-x-3">
            <input
              type="text"
              name="technologyInput"
              value={technologyInput}
              onChange={(e) => setTechnologyInput(e.target.value)}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              placeholder="Enter a technology (e.g., React, Node.js)"
            />
            <button
              type="button"
              onClick={handleAddTechnology}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>

          {/* Display added technologies as tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-blue-200 text-blue-800 rounded-full flex items-center space-x-2"
              >
                <span>{tech}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTechnology(tech)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-xl font-semibold text-gray-700">
            Project Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) {
                console.error("No file selected");
                return;
              }

              const formData = new FormData();
              formData.append("image", file);

              try {
                const response = await fetch(
                  "http://localhost:3000/api/projects/upload",
                  {
                    method: "POST",
                    body: formData,
                  }
                );
                const data = await response.json();

                console.log("Uploaded image data:", data);
                setFormData((prev) => ({
                  ...prev,
                  projectImage: data.imageUrl,
                }));
              } catch (err) {
                console.error("Error uploading image:", err);
              }
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-xl font-semibold text-gray-700">
              GitHub Link{" "}
              <span
                style={{ fontSize: "medium", fontStyle: "normal" }}
                className="text-md"
              >
                {"(required)"}
              </span>
            </label>
            <input
              type="url"
              name="githubLink"
              required
              value={formData.githubLink}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xl font-semibold text-gray-700">
              Web Link
            </label>
            <input
              type="url"
              name="demoLink"
              value={formData.demoLink}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white text-xl font-semibold py-4 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 mt-8`}
        >
          {isLoading ? "Updating Project..." : "Update Project"}
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
