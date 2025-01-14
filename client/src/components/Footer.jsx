import React, { useContext, useState } from "react";
import { Send, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(!formData.name || !formData.email || !formData.message) {
      setFormError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form.");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left side - Introduction */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Hritin Raj</h2>
            <p className="text-gray-400 max-w-md">
              Full-stack developer passionate about creating elegant solutions
              to complex problems. Specializing in React, Node.js, and Mongo
              Database. Always excited to connect with fellow developers and
              potential collaborators.
            </p>

            <div className="flex space-x-4">
              <a
                href="https://github.com/Hritin-Raj?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/hritin-raj-6339b0282/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 
                           focus:outline-none focus:border-blue-500 text-gray-100"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 
                           focus:outline-none focus:border-blue-500 text-gray-100"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 
                           focus:outline-none focus:border-blue-500 text-gray-100"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 
                         transition-colors text-white font-medium flex items-center 
                         justify-center space-x-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>

              {submitStatus === "success" && (
                <p className="text-green-400 text-sm">
                  Message sent successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-400 text-sm">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from 'react'
// import CopyrightIcon from '@mui/icons-material/Copyright';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import GitHubIcon from '@mui/icons-material/GitHub';

// const Footer = () => {

//   const currentYear = new Date().getFullYear()
//   return (
//     <div className='text-center'>
//       <ul className='flex justify-center'>
//         <li className='m-2'><InstagramIcon /></li>
//         <li className='m-2'><LinkedInIcon /></li>
//         <li className='m-2'><GitHubIcon /></li>
//       </ul>
//       <div><CopyrightIcon className='mx-2' /><span className='text-lg'>Copyright {currentYear}</span></div>
//     </div>
//   )
// }

// export default Footer
