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
    <nav className="bg-blue shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              BookingApp
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center lg:space-x-5">
              <Link
                to="/"
                className="text-white hover:text-white/50 px-3 py-2 rounded-md text-2xs font-normal tracking-widest transition-colors"
              >
                Home
              </Link>
              <Link
                to="https://hotel-booking-app-g1jt.vercel.app"
                className="text-white bg-[#1E3A8A] px-3 py-2 rounded-md text-2xs font-normal tracking-widest transition-colors"
              >
                Visite Admin Dashboard
              </Link>

              <Link
                to="#"
                className="text-white hover:text-white px-3 py-2 rounded-md text-2xs font-normal tracking-widest transition-colors"
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
                  <span className="text-2xs text-green-400 lowercase">Hi, </span>
                  <span className="font-bold text-white uppercase">
                    {user.username}
                  </span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 px-3 py-2 rounded-md text-2xs font-normal tracking-widest transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 px-3 py-2 rounded-md text-2xs font-normal tracking-widest transition-colors"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white/50 focus:outline-hidden focus:ring-2 focus:ring-[#1E3A8A]"
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
        <div className="px-2 gap-3 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col justify-end items-end cursor-pointer" onClick={()=>setLogoutOpen(!logoutopen)}>
          <Link
            to="/"
            className="w-[200px] inline-flex justify-center items-center  text-white border hover:text-white/50  px-3 py-2 rounded-md text-base font-normal tracking-widest transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="w-[200px] inline-flex justify-center items-center  text-white border hover:text-white/50  px-3 py-2 rounded-md text-base font-normal tracking-widest transition-colors"
          >
            About
          </Link>
          <Link
            to="/services"
            className="w-[200px] inline-flex justify-center items-center  text-white border hover:text-white/50  px-3 py-2 rounded-md text-base font-normal tracking-widest transition-colors"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="w-[200px] inline-flex justify-center items-center  text-white border hover:text-white/50  px-3 py-2 rounded-md text-base font-normal tracking-widest transition-colors"
          >
            Contact
          </Link>
          <Link
            to="https://hotel-booking-app-g1jt.vercel.app"
            className="text-blue border bg-white block w-[200px] px-3 py-2  rounded-md text-base font-normal hover:bg-white/70 transition-colors"
          >
            Visite  Admin  Dashboard
          </Link>
          {user ? (
            <div className="flex items-center space-x-2 px-3 py-2">
              <img
                src={user.img}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover border-2 border-[#1E3A8A]"
              />
              <span className="font-bold text-white uppercase">
                {user.username}
              </span>
            </div>
          ) : (
            <div className="space-y-2">

              <div className="flex  gap-5 ">
              <Link
                to="/login"
                className="bg-[#1E3A8A] w-[150px] inline-flex justify-center items-center border text-white hover:bg-[#1E3A8A]/90  px-3 py-2 mt-0 rounded-md text-base font-normal tracking-widest  transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#1E3A8A] w-[150px] inline-flex justify-center items-center border text-white hover:bg-[#1E3A8A]/90  px-3 py-2 rounded-md text-base font-normal tracking-widest  transition-colors"
              >
                Signup
              </Link>
              </div>

            </div>
          )}
          {logoutopen && <button className="bg-blue-800 rounded-lg  text-white py-2 px-3 ring-2 ring-gray-300" onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
}