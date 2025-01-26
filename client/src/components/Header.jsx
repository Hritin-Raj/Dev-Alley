import React, { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Menu, X, PenSquare, Search } from "lucide-react";

const Header = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogoClick = () => navigate("/");
  const handleCreate = () => {
    if (auth.isLoggedIn) {
      navigate("/create");
    } else {
      alert("Your session has expired. Please log in again.");
      navigate("/login");
    }
  };
  const handleExploreClick = () => navigate("/explore");
  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");
  const handleProfileClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    navigate(`/profile/${user._id}`, { state: { id: user._id } });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <nav className="relative bg-white shadow">
      <div className="h-16 md:h-20 w-full px-4 md:px-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
          <PenSquare className="h-6 w-6 text-yellow-400" />
          <span className="text-xl md:text-2xl font-semibold">DevAlley</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="w-64 lg:w-96">
            <SearchBar />
          </div>
          <button 
            className="text-gray-600 hover:text-gray-900"
            onClick={handleExploreClick}
          >
            Explore
          </button>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            <PenSquare className="h-4 w-4 mr-2" />
            Create
          </button>
          
          {auth.isLoggedIn ? (
            <button
              onClick={handleProfileClick}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              {auth.user?.name || "Profile"}
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleLogin}
                className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Log In
              </button>
              <button
                onClick={handleSignup}
                className="px-4 py-2 border rounded-md bg-green-500 text-white hover:bg-green-600"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Buttons */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleSearch}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <Search className="h-6 w-6" />
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden p-4 border-t">
          <SearchBar />
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t shadow-lg">
          <div className="flex flex-col p-4 space-y-4">
            <button
              onClick={handleExploreClick}
              className="text-left px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Explore
            </button>
            <button
              onClick={handleCreate}
              className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
            >
              <PenSquare className="h-4 w-4 mr-2" />
              Create
            </button>
            {auth.isLoggedIn ? (
              <button
                onClick={handleProfileClick}
                className="text-left px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                {auth.user?.name || "Profile"}
              </button>
            ) : (
              <div className="flex flex-col space-y-2">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                  Log In
                </button>
                <button
                  onClick={handleSignup}
                  className="px-4 py-2 border rounded-md bg-green-500 text-white hover:bg-green-600"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;






// import React, { useContext } from "react";
// import SearchBar from "./SearchBar";
// import AddIcon from "@mui/icons-material/Add";
// import HighlightIcon from "@mui/icons-material/Highlight";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";

// const Header = () => {
//   const { auth } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogoClick = () => {
//     navigate("/");
//   };

//   const handleCreate = () => {
//     if (auth.isLoggedIn) {
//       navigate("/create");
//     } else {
//       alert("Your session has expired. Please log in again.");
//       navigate("/login");
//     }
//   };

//   const handleExploreClick = () => {
//     navigate("/explore");
//   };

//   const handleLogin = () => {
//     navigate("/login");
//   };

//   const handleSignup = () => {
//     navigate("/signup");
//   };

//   const handleProfileClick = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     navigate(`/profile/${user._id}`, { state: { id: user._id } });
//   };

//   return (
//     <div className="h-[90px] w-full p-[15px] flex justify-between items-center">
//       <div
//         className="h-full flex items-center m-4 cursor-pointer"
//         onClick={handleLogoClick}
//       >
//         <HighlightIcon fontSize="large" className="text-yellow-400" />
//         <span className="text-4xl">DevAlley</span>
//       </div>
//       <div className="h-full flex justify-between items-center">
//         <SearchBar />
//         <ul className="flex m-3 h-full items-center">
//           <li className="m-3 text-xl cursor-pointer" onClick={handleExploreClick}>
//             Explore
//           </li>
//         </ul>
//       </div>
//       <div className="h-full flex items-center m-4">
//         <div className="m-3 text-xl p-3 rounded-2xl bg-pink-500">
//           <button className="h-full w-full" onClick={handleCreate}>
//             <AddIcon className="mb-[3px]" />
//             Create
//           </button>
//         </div>
//         <div className="m-3 text-xl p-3">
//           {auth.isLoggedIn ? (
//             <button onClick={handleProfileClick}>
//               {`${auth.user?.name || "Profile"}`}
//             </button>
//           ) : (
//             <>
//               <button
//                 onClick={handleLogin}
//                 className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
//               >
//                 Log In
//               </button>
//               <button
//                 onClick={handleSignup}
//                 className="px-4 py-2 ml-[5px] border rounded-md bg-green-500 text-white hover:bg-green-600"
//               >
//                 Sign Up
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
