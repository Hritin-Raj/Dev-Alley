import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { postData } from "../utils/api";

const CreateProjectForm = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [technologyInput, setTechnologyInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    images: [],
    githubLink: "",
    demoLink: "",
  });

  const handleAddTechnology = (e) => {
    e.preventDefault();
    const trimmedTech = technologyInput.trim();
    if (trimmedTech && !formData.technologies.includes(trimmedTech)) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, trimmedTech],
      }));
      setTechnologyInput("");
    }
  };

  const handleRemoveTechnology = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    try {
      new URL(formData.githubLink);
    } catch {
      setError("Invalid GitHub URL format");
      return false;
    }

    if (formData.demoLink) {
      try {
        new URL(formData.demoLink);
      } catch {
        setError("Invalid demo URL format");
        return false;
      }
    }

    return true;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      const isValid = file.type.startsWith("image/");
      const isUnder5MB = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValid && isUnder5MB;
    });

    if (validFiles.length !== files.length) {
      setError("Some files were skipped. Images must be under 5MB.");
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const submitData = {
        ...formData,
        technologies: formData.technologies,
        images: [],
      };

      const response = await postData(
        `projects/${auth.user._id}/create`,
        submitData
      );

      if (response.error) {
        throw new Error(response.error);
      }

      navigate(`/profile/${auth.user._id}`);
    } catch (err) {
      setError(err.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <form
        className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-8 border border-gray-100"
        onSubmit={onSubmit}
      >
        {/* Add error message display */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create New Project
        </h2>

        <div className="space-y-3">
          <label className="block text-xl font-semibold text-gray-700">
            Title{" "}
            <span
              style={{ fontSize: "medium", fontStyle: "normal" }}
              className="text-md"
            >
              {"(required)"}
            </span>
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
            Description{" "}
            <span
              style={{ fontSize: "medium", fontStyle: "normal" }}
              className="text-md"
            >
              {"(required)"}
            </span>
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
            Project Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
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
              Demo Link
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

        {/* Modified submit button with loading state */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white text-xl font-semibold py-4 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 mt-8`}
        >
          {loading ? "Creating Project..." : "Create Project"}
        </button>
      </form>
    </div>
  );
};

export default CreateProjectForm;
