import { Link, useLocation } from "react-router-dom";
import {
  FaHome, FaUser, FaBox, FaClipboardList, FaShapes,
  FaStickyNote, FaWpforms, FaCalendar, FaChevronLeft, FaSignOutAlt
} from "react-icons/fa";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { AuthContext } from "../context/AuthContext";

function SidebarItem({ to, icon: Icon, label, isCollapsed, isActive }) {
  return (
    <Link
      to={to}
      className={`relative group flex items-center gap-3 transition-all duration-300 p-3 rounded-xl mb-1
        ${isActive 
          ? "bg-amber-500 text-[#1e2536] shadow-lg shadow-amber-500/20" 
          : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
    >
      <Icon className={`min-w-[20px] h-5 transition-colors ${isActive ? "text-[#1e2536]" : "text-slate-400 group-hover:text-white"}`} />
      
      {!isCollapsed && (
        <span className="text-sm font-bold tracking-wide truncate">{label}</span>
      )}

      {isCollapsed && (
        <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 whitespace-nowrap border border-white/10 shadow-xl">
          {label}
        </div>
      )}
    </Link>
  );
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();

  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const sections = [
    {
      title: "Menu",
      items: [
        { to: "/", icon: FaHome, label: "Dashboard" },
        { to: "/users", icon: FaUser, label: "Users" },
        { to: "/hotels", icon: FaBox, label: "Hotels" },
        { to: "/rooms", icon: FaClipboardList, label: "Rooms" },
      ]
    },
    {
      title: "Tools",
      items: [
        { to: "/elements", icon: FaShapes, label: "Elements" },
        { to: "/calendar", icon: FaCalendar, label: "Calendar" },
      ]
    }
  ];

  return (
    <motion.div 
      animate={{ width: isCollapsed ? "88px" : "280px" }}
      className="relative sticky top-0 h-screen bg-[#1e2536] border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out shadow-2xl"
    >
      {/* --- TOP USER SECTION (REPLACES BRAND) --- */}
      <div className={`relative p-6 mb-2 transition-all duration-300 ${isCollapsed ? "items-center" : ""}`}>
        <div className={`flex items-center gap-4 ${isCollapsed ? "flex-col" : ""}`}>
          <div className="relative flex-shrink-0 group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-300"></div>
            <img 
              src={user?.img || "https://ui-avatars.com/api/?name=Admin"} 
              className="relative w-12 h-12 rounded-full border-2 border-[#1e2536] object-cover"
              alt="User profile"
            />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#1e2536] rounded-full"></div>
          </div>

          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="overflow-hidden"
            >
              <h2 className="text-white font-black text-lg leading-tight truncate">{user?.username || "Guest User"}</h2>
              <p className="text-amber-500 text-[10px] uppercase font-bold tracking-[1px]">Super Administrator</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#1e2536] shadow-xl border border-slate-200 hover:scale-110 transition-transform z-50"
      >
        <FaChevronLeft className={`text-[10px] transition-transform duration-500 ${isCollapsed ? "rotate-180" : ""}`} />
      </button>

      {/* --- NAVIGATION --- */}
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar mt-4">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-8">
            {!isCollapsed && (
              <span className="px-3 text-[10px] uppercase font-black tracking-[3px] text-slate-500 block mb-3 opacity-50">
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

      {/* --- FOOTER: LOGOUT --- */}
      <div className="p-4 border-t border-white/5">
        <button 
          onClick={onLogout}
          className={`flex items-center gap-3 w-full p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm
            ${isCollapsed ? "justify-center" : ""}`}
        >
          <FaSignOutAlt className="text-lg" />
          {!isCollapsed && <span>Logout Session</span>}
        </button>
      </div>
    </motion.div>
  );
}