import { Link, useLocation } from "react-router-dom";
import { LogOut, X, ChevronRight, User, Settings, Map, CreditCard } from "lucide-react";
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

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    opened: { opacity: 1, x: 0 },
  };
  return (
<AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with darker, more premium blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0  z-[60] backdrop-blur-sm"
          />

          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed right-0 top-0 h-screen w-full max-w-[340px] bg-[#262E40] border-l border-white/10 shadow-2xl flex flex-col z-[70] overflow-hidden"
          >
            {/* Header: Increased height and cleaner typography */}
            <div className="flex items-center justify-between px-6 h-24 border-b border-white/5 bg-white/[0.02]">
              <div className="flex flex-col">
                <span className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-bold">Navigation</span>
                <h2 className="text-white text-xl font-bold tracking-tight">Explore</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="group flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all active:scale-90 border border-white/10"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Links Section: Using staggered animation for all elements */}
            <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-[#FE9A00] text-white shadow-lg shadow-[#FE9A00]/20"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-base font-semibold ${isActive ? "text-white" : ""}`}>
                          {link.name}
                        </span>
                      </div>
                      {isActive ? (
                        <motion.div layoutId="activeIndicator" className="h-5 w-1 rounded-full bg-white" />
                      ) : (
                        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer Section: Clean cards and glassmorphism */}
            <motion.div variants={itemVariants} className="p-6 bg-black/20 border-t border-white/5">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 shadow-inner">
                    <div className="relative">
                      <img
                        src={user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                        alt="profile"
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#FE9A00]/50"
                      />
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#001B3D]"></span>
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold truncate text-sm">{user.name}</p>
                      <div className="flex items-center gap-1.5">
                        <CreditCard size={10} className="text-[#FE9A00]" />
                        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Gold Member</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 bg-white/5 text-slate-300 py-3 rounded-xl text-xs font-bold hover:bg-white/10 transition-all border border-white/5">
                      <Settings size={14} /> Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 py-3 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all border border-red-500/10"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-2">
                  <p className="text-center text-slate-400 text-xs font-medium leading-relaxed">
                    Sign in to unlock exclusive flight deals <br/> and hotel points.
                  </p>
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-[#FE9A00] text-white text-center py-4 rounded-2xl font-bold text-base shadow-lg shadow-[#FE9A00]/20 hover:brightness-110 active:scale-[0.98] transition-all"
                  >
                    Start Your Journey
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}