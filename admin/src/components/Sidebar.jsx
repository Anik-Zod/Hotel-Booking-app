import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBox,
  FaClipboardList,
  FaShapes,
  FaCalendar,
  FaChevronLeft,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useAuthStore } from "../stores/auth.store";
import { authClient } from "../../lib/auth-client";


function SidebarItem({
  to,
  icon: Icon,
  label,
  isCollapsed,
  isActive,
  onClick,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative group flex items-center gap-3 transition-colors duration-200 p-3 rounded-xl mb-1
        ${
          isActive
            ? "bg-primary text-[var(--text-on-primary)] shadow-lg shadow-amber-500/20"
            : "text-slate-400 hover:bg-white/5 hover:text-white"
        }`}
    >
      <Icon
        className={`min-w-[20px] h-5 transition-colors duration-200 ${
          isActive
            ? "text-[var(--text-on-primary)]"
            : "text-slate-400 group-hover:text-white"
        }`}
      />

      {!isCollapsed && (
        <span className="text-sm font-bold tracking-wide truncate">
          {label}
        </span>
      )}

      {isCollapsed && (
        <div className="absolute left-full ml-4 px-3 py-2 bg-primary late-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 whitespace-nowrap border border-white/10 shadow-xl">
          {label}
        </div>
      )}
    </Link>
  );
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
        setIsMobileOpen(false);
      } else {
        setIsCollapsed(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onLogout = async() =>{
    await authClient.signOut()
      logout(); 
    navigate("/login");
  };

  const handleItemClick = () => {
    if (isMobile) setIsMobileOpen(false);
  };

  const sections = [
    {
      title: "Menu",
      items: [
        { to: "/", icon: FaHome, label: "Dashboard" },
        { to: "/users", icon: FaUser, label: "Users" },
        { to: "/hotels", icon: FaBox, label: "Hotels" },
        { to: "/rooms", icon: FaClipboardList, label: "Rooms" },
      ],
    },
  ];

  // Mobile Sidebar
  if (isMobile) {
    return (
      <>
        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-[110] p-2 md:p-4 bg-[#1e2536] rounded-xl text-white shadow-lg lg:hidden hover:bg-white/5 transition-colors duration-200"
        >
          {isMobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        <AnimatePresence>
          {isMobileOpen && (
            <>
              {/* Overlay - Stays as Opacity fade */}
              <motion.div
                initial={{ w: 0 }}
                animate={{ w: "100%" }}
                exit={{ w: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] md:hidden "
                onClick={() => setIsMobileOpen(false)}
              />

              {/* Sidebar - Now controls Width */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed left-0 top-0 h-screen bg-[#1e2536] border-r border-white/5 flex flex-col z-[106] shadow-2xl overflow-hidden whitespace-nowrap"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/10 min-w-[280px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                      <span className="text-black font-black text-lg">B</span>
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-lg">
                        BookingApp
                      </h2>
                      <p className="text-slate-400 text-xs">Admin Panel</p>
                    </div>
                  </div>
                </div>

                {/* User */}
                {user && (
                  <div className="p-4 border-b border-white/10 min-w-[280px]">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          user.image || "https://ui-avatars.com/api/?name=Admin"
                        }
                        className="w-10 h-10 rounded-full border-2 border-amber-500/30 object-cover"
                        alt="User profile"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">
                          {user.username || "Guest User"}
                        </p>
                        <p className="text-amber-500 text-xs">Super Admin</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-4 py-4 min-w-[280px]">
                  {sections.map((section, idx) => (
                    <div key={idx} className="mb-6">
                      <span className="px-3 text-xs uppercase font-black tracking-[3px] text-slate-500 block mb-3">
                        {section.title}
                      </span>
                      {section.items.map((item) => (
                        <SidebarItem
                          key={item.to}
                          {...item}
                          isCollapsed={false}
                          isActive={location.pathname === item.to}
                          onClick={handleItemClick}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Logout */}
                <div className="p-4 border-t border-white/10 min-w-[280px]">
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-3 w-full p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span>Logout Session</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div
      className={`sticky top-0 border border-primary/30 rounded-lg bg-bg  flex flex-col justify-between min-h-[calc(100vh-97px)] gap-4
      transition-[width] duration-150 ease-out shadow-2xl  ${
        isCollapsed ? "w-[80px]" : "w-[240px]"
      }`}
    >
      {/* Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 p-2 bg-primary  rounded-full flex items-center justify-center text-[#1e2536] shadow-xl  hover:scale-110 transition-transform duration-150 z-50 "
      >
        <FaChevronLeft
          size={10}
          className={`transition-transform duration-150 ${
            isCollapsed ? "rotate-180" : ""
          }`}
        />
      </button>
      {/* User Section */}
      <div
        className={`relative px-4 border-b border-primary/30 py-4 transition-all duration-150 ${
          isCollapsed ? "items-center" : ""
        }`}
      >
        <div
          className={`flex items-center gap-4 ${isCollapsed ? "flex-col" : ""}`}
        >
          <div className="relative flex-shrink-0 group cursor-pointer">
            <div className="absolute s -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-150"></div>
            <img
              src={
                user?.image ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              }
              className="relative min-w-12 h-12 rounded-full border-2 border-primary object-cover"
              alt="User profile"
            />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#1e2536] rounded-full"></div>
          </div>

          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <h2 className="text-textColor font-black text-lg leading-tight truncate">
                {user?.name || "Guest User"}
              </h2>
              <p className="text-primary text-[10px] uppercase font-bold tracking-[1px]">
                Super Administrator
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1  px-4  ">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-3">
            {!isCollapsed && (
              <span className="px-3 text-[10px] uppercase font-black tracking-[3px] text-textDull block mb-3 opacity-50">
                {section.title}
              </span>
            )}
            {section.items.map((item) => (
              <SidebarItem
                key={item.to}
                {...item}
                isCollapsed={isCollapsed}
                isActive={location.pathname === item.to}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Footer Logout */}
      <div className="p-4 ">
        <button
          onClick={onLogout}
          className={`flex items-center gap-3 w-full p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm
            ${isCollapsed ? "justify-center" : ""}`}
        >
          <FaSignOutAlt className="text-lg" />
          {!isCollapsed && <span>Logout Session</span>}
        </button>
      </div>
    </div>
  );
}
