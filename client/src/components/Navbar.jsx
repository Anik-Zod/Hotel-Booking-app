import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const {user,dispatch} = useContext(AuthContext)
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [logoutopen,setLogoutOpen] = useState(false)
  
  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"})
    navigate("/login")
  }

  useEffect(() => {
    const clickedOutside = (e) => {
      if (!e.target.closest(".profile")) {
        setLogoutOpen(false);
      }
    };

    if (logoutopen) {
      document.addEventListener("click", clickedOutside);
    } else {
      document.removeEventListener("click", clickedOutside);
    }

    return () => {
      document.removeEventListener("click", clickedOutside);
    };
  }, [logoutopen]);  // Make sure to toggle based on logoutOpen


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#1E3A8A]">
              BookingApp
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-900 hover:text-[#1E3A8A] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="#"
                className="text-white bg-[#1E3A8A] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Visite Admin Dashboard
              </Link>

              <Link
                to="#"
                className="text-gray-900 hover:text-[#1E3A8A] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </Link>
              {user ? (
                <div className="flex items-center space-x-2 cursor-pointer profile "  onClick={()=>setLogoutOpen(!logoutopen)}>
                  <img
                    src={user.img}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#1E3A8A]"
                  />
                  <span className="text-sm text-gray-600 lowercase">Hi, </span>
                  <span className="font-bold text-[#1E3A8A] uppercase">
                    {user.username}
                  </span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Signup
                  </Link>
                </div>
              )}
              {logoutopen && <button className="bg-blue-800 rounded-lg  text-white py-2 px-3 ring-2 ring-gray-300" onClick={handleLogout}>Logout</button>}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden transition-all duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 cursor-pointer" onClick={()=>setLogoutOpen(!logoutopen)}>
          <Link
            to="/"
            className="text-gray-900 hover:text-[#1E3A8A] block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-900 hover:text-[#1E3A8A] block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            About
          </Link>
          <Link
            to="/services"
            className="text-gray-900 hover:text-[#1E3A8A] block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-gray-900 hover:text-[#1E3A8A] block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/contact"
            className="text-white bg-[#1E3A8A] block w-[200px] px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Visite Admin Dashboard
          </Link>
          {user ? (
            <div className="flex items-center space-x-2 px-3 py-2">
              <img
                src={user.img}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover border-2 border-[#1E3A8A]"
              />
              <span className="font-bold text-[#1E3A8A] uppercase">
                {user.username}
              </span>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 block px-3 py-2 rounded-md text-base font-medium text-center transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 block px-3 py-2 rounded-md text-base font-medium text-center transition-colors"
              >
                Signup
              </Link>
              
            </div>
          )}
          {logoutopen && <button className="bg-blue-800 rounded-lg  text-white py-2 px-3 ring-2 ring-gray-300" onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
}