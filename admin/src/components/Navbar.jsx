import React, { useContext, useState, useEffect, useRef } from "react";
import { FaSearch, FaTh, FaExpand, FaBell, FaCog, FaBars, FaTimes, FaUser, FaSignOutAlt, FaHome, FaHotel, FaUsers } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, dispatch } = useContext(AuthContext);
  
  const [showPopup, setShowPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const boxRef = useRef();

  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  // Close menus on click outside
  useEffect(() => {
    const handleClickOut = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOut);
    return () => document.removeEventListener("mousedown", handleClickOut);
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/", icon: <FaTh /> },
    { name: "Users", path: "/users", icon: <FaUsers /> },
    { name: "Hotels", path: "/hotels", icon: <FaHotel /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#262E40] text-white h-20 px-4 md:px-8 flex items-center justify-between shadow-2xl border-b border-white/5">
      
      {/* --- LEFT: LOGO & BRAND --- */}
          {/* Logo Section */}
          <div className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <span className="text-black font-black text-xl">B</span>
            </div>
            <Link to="/" className="text-2xl font-bold text-white tracking-tighter">
              Booking<span className="text-amber-500 font-light">App</span>
            </Link>
          </div>



      {/* --- RIGHT: UTILITIES & PROFILE --- */}
      <div className="flex items-center gap-2 md:gap-5">
        
        {/* Utility Icons */}
        <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-5 mr-2 text-slate-400">
          <button className="hover:text-[#FE9A00] transition-colors"><FaExpand size={18} /></button>
          <div className="relative cursor-pointer hover:text-white transition-colors">
            <FaBell size={18} />
            <span className="absolute -top-1.5 -right-1.5 bg-[#FE9A00] text-[9px] text-[#262E40] font-black rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-[#262E40]">
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
              className={`flex items-center gap-3 p-1 pr-3 rounded-full transition-all ${showPopup ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <img
                src={user.img || "https://ui-avatars.com/api/?name=Admin"}
                className="w-9 h-9 rounded-full border-2 border-[#FE9A00] object-cover"
                alt="avatar"
              />
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold leading-none">{user.username}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-tighter mt-1">Super Admin</p>
              </div>
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showPopup && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 bg-[#262E40] border border-white/10 rounded-2xl shadow-2xl p-2 overflow-hidden"
                >
                  <div className="p-3 mb-2 border-b border-white/5">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Account</p>
                    <p className="text-sm truncate">{user.email || 'admin@voyager.com'}</p>
                  </div>
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-white/5 rounded-xl transition-colors">
                    <FaUser size={14} className="text-[#FE9A00]" /> My Profile
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
          <Link to="/login" className="bg-[#FE9A00] text-[#262E40] px-6 py-2 rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(254,154,0,0.4)] transition-all">
            Login
          </Link>
        )}

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-[#FE9A00]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* --- MOBILE DRAWER --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-[280px] bg-[#262E40] z-[120] p-6 shadow-2xl flex flex-col"
            >
              <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6">
                <div className="w-10 h-10 bg-[#FE9A00] rounded-lg flex items-center justify-center text-[#262E40]">
                  <FaTh size={20} />
                </div>
                <h2 className="font-bold text-xl">Menu</h2>
              </div>

              <div className="space-y-2 flex-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-4 w-full p-4 rounded-xl font-medium transition-all ${
                      location.pathname === item.path 
                      ? 'bg-[#FE9A00] text-[#262E40]' 
                      : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {item.icon} {item.name}
                  </button>
                ))}
              </div>

              <button 
                onClick={onLogout}
                className="flex items-center justify-center gap-3 w-full bg-red-500/10 text-red-400 p-4 rounded-xl font-bold border border-red-500/20"
              >
                <FaSignOutAlt /> Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;