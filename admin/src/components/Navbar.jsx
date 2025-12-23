import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTh, FaExpand, FaBell, FaCog, FaBars, FaTimes, FaUser, FaSignOutAlt, FaHome, FaHotel, FaUsers } from "react-icons/fa";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../stores/auth.store";
import { authClient } from "../../lib/auth-client";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  
  const [showPopup, setShowPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const boxRef = useRef();

  const onLogout = async () => {
    logout(); // immediately set user to null
    await authClient.signOut();
    navigate("/login");
  };


  const navItems = [
    { name: "Dashboard", path: "/", icon: <FaTh /> },
    { name: "Users", path: "/users", icon: <FaUsers /> },
    { name: "Hotels", path: "/hotels", icon: <FaHotel /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-bg  text-textColor h-20 px-4 md:px-8 flex items-center justify-between  border-b border-primary/30">
      
      {/* --- LEFT: LOGO & BRAND --- */}
          {/* Logo Section */}
          <div className="flex translate-x-14 lg:translate-x-0 items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <span className="font-black text-xl">B</span>
            </div>
            <Link to="/" className="text-2xl font-bold text-textColor tracking-tighter">
              Booking<span className="text-primary font-light">App</span>
            </Link>
          </div>



      {/* --- RIGHT: UTILITIES & PROFILE --- */}
      <div className="flex items-center gap-2 md:gap-5">
        
        {/* Utility Icons */}
        <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-5 mr-2 text-slate-400">
          <div className="relative cursor-pointer hover:text-white transition-colors">
            <FaBell size={18} />
            <span className="absolute -top-1.5 -right-1.5 bg-[var(--pink)] text-[9px] text-[var(--dark-bg)] font-black rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-[var(--dark-bg)]">
              3
            </span>
          </div>
          <button className="hover:text-white transition-colors"><FaCog size={18} /></button>
        </div>

        {/* User Profile Card */}
        {user ? (
          <div className="relative" ref={boxRef}>
            <button 
              onClick={() => setShowPopup(!showPopup)}
              className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all bg-global ${showPopup ? 'bg-white/10' : 'hover:bg-white/10'}`}
            >
              <img
                src={user.image && user.image.startsWith('http') ? user.image : `https://ui-avatars.com/api/?name=${user.name || 'Admin'}`}
                className="w-9 h-9 rounded-full border-2 border-primary object-cover"
                alt="avatar"
              />
              <div className="hidden md:block text-left">
                <p className="text-md font-bold text-textColor leading-none">{user.name}</p>
                <p className="text-[10px] text-primary uppercase tracking-tighter mt-1">Super Admin</p>
              </div>
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showPopup && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 bg-[var(--dark-bg)] border border-white/10 rounded-2xl shadow-2xl p-2 overflow-hidden"
                >
                  <div className="p-3 mb-2 border-b border-white/5">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Account</p>
                    <p className="text-sm truncate">{user.email || 'admin@voyager.com'}</p>
                  </div>
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm bg-white/5 rounded-xl transition-colors">
                    <FaUser size={14} className="text-[var(--accent)]" /> My Profile
                  </button>
                  <button 
                    onClick={onLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-1"
                  >
                    <FaSignOutAlt size={14} /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link to="/login" className="bg-primary/40 text-textColor px-6 py-2 rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(254,154,0,0.4)] transition-all">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;