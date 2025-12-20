import { Link, useLocation } from "react-router-dom";
import { LogOut, X, ChevronRight, User, Settings, Map } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileNav({
  isOpen,
  setIsOpen,
  navLinks,
  user,
  handleLogout,
}) {
  const location = useLocation();

  // Animation Variants
  const sidebarVariants = {
    closed: { x: "100%", transition: { type: "spring", damping: 30, stiffness: 300 } },
    opened: { x: 0, transition: { type: "spring", damping: 25, stiffness: 200 } },
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    opened: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with deeper blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-blue z-[60] backdrop-blur-md"
          />

          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed right-0 top-0 h-screen w-[320px] bg-blue border-l border-white/10 shadow-2xl flex flex-col z-[70] backdrop-blur-xl"
          >
          

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-10 pb-6">
              <div>
                <h2 className="text-white text-2xl font-black tracking-tight">Menu</h2>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em] mt-1">Voyager Pro</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-all active:scale-90"
              >
                <X size={22} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Links Section */}
            <nav className="flex-1 overflow-y-auto py-8 px-4">
              <div className="space-y-3">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.name}
                      custom={i}
                      variants={linkVariants}
                      initial="closed"
                      animate="opened"
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                          isActive
                            ? "bg-[#FE9A00] text-white shadow-lg shadow-indigo-500/20"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`text-lg font-bold ${isActive ? "text-white" : "group-hover:translate-x-1 transition-transform"}`}>
                            {link.name}
                          </span>
                        </div>
                        {isActive ? (
                           <motion.div layoutId="activeDot" className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                        ) : (
                          <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* User Profile / Footer Section */}
            <div className="p-6 bg-white/5 border-t border-white/10 backdrop-blur-2xl">
              {user ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="relative">
                      <img
                        src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                        alt="profile"
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#FE9A00]"
                      />
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-900" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold truncate leading-none mb-1">{user.name}</p>
                      <p className="text-slate-400 text-xs truncate">Gold Member</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 bg-white/5 text-slate-300 py-3 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
                      <Settings size={16} /> Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 py-3 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-center text-slate-400 text-sm mb-4 font-medium px-4">
                    Sign in to unlock exclusive flight deals and hotel points.
                  </p>
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-[#FE9A00] from-indigo-600 to-blue-600 text-white text-center py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Start Your Journey
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}