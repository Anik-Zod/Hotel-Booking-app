import React, { useContext, useState, useEffect,useRef } from "react";
import { FaSearch, FaTh, FaExpand, FaBell, FaCog, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(true);

  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-menu")) {
        setShowPopup(false);
      }
    };
    if (showPopup) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showPopup]);
  
  const boxRef = useRef();
  useEffect(()=>{
    const handleClickOut = (e)=>{
      if(boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false)
        setMobileMenu(false)
      }
    }
     document.addEventListener("mousedown",handleClickOut)
     return ()=>{
       document.addEventListener("mousedown",handleClickOut)
     }
  },[])

  const[open,setOpen] = useState(false)
  const style = open?"block":"hidden";
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-gray-800 text-white px-6 py-3 flex items-center justify-between shadow-lg">
      {/* Left - Logo */}
      <div className="flex items-center gap-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpq75zoBrAIi77qu0Ta7x6SEnrKyDM_AA_aA&s"
          alt="logo"
          className="w-10 h-10 rounded-full transition-transform transform hover:scale-105"
        />
        <span className="text-xl font-semibold tracking-wide hover:text-gray-300 transition-colors">
          Company
        </span>
      </div>

      {/* Desktop Icons */}
      <div className="hidden md:flex items-center gap-6">
        <FaSearch className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
        <FaTh className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
        <FaExpand className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />

        {/* Bell Notification */}
        <div className="relative cursor-pointer">
          <FaBell className="w-5 h-5 hover:text-gray-300 transition-colors" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-[10px] text-white font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
            1
          </span>
        </div>

        {/* User Profile */}
        {user ? (
          <div className="relative user-menu">
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors"
              onClick={() => setShowPopup((prev) => !prev)}
            >
              <img
                src={user.img}
                alt="user avatar"
                className="w-9 h-9 rounded-full border-2 border-gray-600 object-cover transition-transform transform hover:scale-105"
              />
              <span className="text-sm font-medium">{user.username}</span>
            </div>

            {/* Popup */}
            {showPopup && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50">
                <button
                  onClick={onLogout}
                  className="cursor-pointer w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="text-sm font-medium hover:text-gray-300 transition-colors"
          >
            Login/Sign Up
          </Link>
        )}

        <FaCog className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
      </div>

      {/* Mobile Menu Button */}
      <div ref={boxRef} className=" relative md:hidden">
        <button onClick={() => {setMobileMenu((prev) => !prev),setOpen(prev=>!prev)}}>
          {!mobileMenu ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
        <div className={`bg-white/90 h-screen w-[300px] absolute top-12 translate-x-6 right-0 ${style} flex flex-col gap-5`}>
             <button onClick={()=> navigate('/')} className=" flex ml-5 text-black shadow-sm text-[18px] font-semibold py-2 ">Home</button>
             <button onClick={()=> navigate('/users')} className=" flex ml-5 text-black shadow-sm text-[18px] font-semibold py-2 ">Users</button>
             <button onClick={()=> navigate('/hotels')} className=" flex ml-5 text-black shadow-sm text-[18px] font-semibold py-2 ">Hotels</button>
             <button onClick={()=> navigate('/profile')} className=" flex ml-5 text-black shadow-sm text-[18px] font-semibold py-2 ">Profile</button>
             <div className="w-full flex justify-end pr-5">
              <button className="bg-red-800 px-4 py-2 rounded-md font-semibold" onClick={onLogout} >logout</button>
             </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
