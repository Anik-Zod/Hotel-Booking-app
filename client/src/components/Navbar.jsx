import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { Menu, X, ChevronDown, User, LogOut, Settings, Bell } from "lucide-react";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [logoutopen, setLogoutOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setLogoutOpen(false);
  };

  // Close dropdown when user logs out
  useEffect(() => {
    if (!user) {
      setLogoutOpen(false);
    }
  }, [user]);

  // Close dropdown on click outside
  useEffect(() => {
    const clickedOutside = (e) => {
      if (!e.target.closest(".profile-container")) {
        setLogoutOpen(false);
      }
    };
    document.addEventListener("mousedown", clickedOutside);
    return () => document.removeEventListener("mousedown", clickedOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels" },
    { name: "Offers", path: "/hotDeals" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-slate-900/90 backdrop-blur-md border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <span className="text-black font-black text-xl">B</span>
            </div>
            <Link to="/" className="text-2xl font-bold text-white tracking-tighter">
              Booking<span className="text-amber-500 font-light">App</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  location.pathname === link.path ? "text-amber-400" : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
                )}
              </Link>
            ))}

            {/* User Actions */}
            <div className="flex items-center pl-6 border-l border-white/10 space-x-6">
              {user ? (
                <div className="relative profile-container">
                  <button
                    onClick={() => setLogoutOpen(!logoutopen)}
                    className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 p-1 pr-4 rounded-full transition-all border border-white/10"
                  >
                    <img
                      src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                      alt="profile"
                      className="w-8 h-8 rounded-full border border-amber-500/50 object-cover"
                    />
                    <span className="text-sm font-semibold text-white">{user.name}</span>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${logoutopen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Professional Dropdown */}
                  {logoutopen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl py-2 border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                      <div className="px-4 py-3 border-b border-slate-50">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Account</p>
                        <p className="text-sm font-medium text-slate-900 truncate">{user.email || 'Member'}</p>
                      </div>
                      <Link to="#" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition">
                        <User size={16} /> Profile Settings
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t border-slate-50"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-amber-500/20"
                >
                  Join Now
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>


      {/* Modern Mobile Sidebar */}

  
  {/* 1. Backdrop Overlay - Dimming the background slightly */}
  {isOpen && 
  <div 
  className="fixed h-screen inset-0 bg-black/50 transition-opacity"
  onClick={() => setIsOpen(false)}
  />
}
  
  {/* 2. Side Panel - Solid Blue, Full Height */}
  <MobileNav
  handleLogout={handleLogout}
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  user={user}
  key={user?._id}
  navLinks={navLinks}
  />



    </nav>
  );
}