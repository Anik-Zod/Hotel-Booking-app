import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [logoutopen, setLogoutOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

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
  }, [logoutopen]);

  return (
    <nav className="bg-blue shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              BookingApp
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-5">
            <Link
              to="/"
              className="text-white hover:text-white/50 px-3 py-2 rounded-md text-sm font-normal tracking-widest transition-colors"
            >
              Home
            </Link>
            <Link
              to="https://hotel-booking-app-g1jt.vercel.app"
              className="text-white bg-[#1E3A8A] px-3 py-2 rounded-md text-sm font-normal tracking-widest transition-colors"
            >
              Visit Admin Dashboard
            </Link>
            <Link
              to="#"
              className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-normal tracking-widest transition-colors"
            >
              Contact
            </Link>
            {user ? (
              <div
                className="flex items-center space-x-2 cursor-pointer profile"
                onClick={() => setLogoutOpen(!logoutopen)}
              >
                <img
                  src={user.img}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#1E3A8A]"
                />
                <span className="text-2xs text-green-400 lowercase">Hi, </span>
                <span className="font-bold text-white uppercase">
                  {user.username}
                </span>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 px-3 py-2 rounded-md text-sm font-normal tracking-widest transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 px-3 py-2 rounded-md text-sm font-normal tracking-widest transition-colors"
                >
                  Signup
                </Link>
              </>
            )}
            {logoutopen && (
              <button
                className="bg-blue-800 rounded-lg text-white py-2 px-3 ring-2 ring-gray-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white/50"
            >
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
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-blue shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/20">
          <span className="text-white font-bold text-xl">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white focus:outline-none"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-white px-3 py-2 rounded-md hover:bg-white/20"
          >
            Home
          </Link>
          <Link
            to="https://hotel-booking-app-g1jt.vercel.app"
            onClick={() => setIsOpen(false)}
            className="text-white px-3 py-2 rounded-md hover:bg-white/20"
          >
            Visit Admin Dashboard
          </Link>
          <Link
            to="#"
            onClick={() => setIsOpen(false)}
            className="text-white px-3 py-2 rounded-md hover:bg-white/20"
          >
            Contact
          </Link>
          {user ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2">
                <img
                  src={user.img}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#1E3A8A]"
                />
                <span className="text-white font-bold uppercase">
                  {user.username}
                </span>
              </div>
              <button
                className="bg-blue-800 rounded-lg text-white py-2 px-3"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-[#1E3A8A] text-white px-3 py-2 rounded-md text-sm font-normal tracking-widest transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="bg-[#1E3A8A] text-white px-3 py-2 rounded-md text-sm font-normal tracking-widest transition-colors"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
