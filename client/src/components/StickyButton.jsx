import { Crown, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

function StickyButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        // State-driven styling
        animate={{
          width: hovered ? "220px" : "64px",
          backgroundColor: hovered ? "#FE9A00" : "#262E40", // Your specific Hex colors
          boxShadow: hovered 
            ? "0 20px 25px -5px rgba(254, 154, 0, 0.3)" 
            : "0 10px 15px -3px rgba(0, 0, 0, 0.2)"
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center h-[64px] rounded-2xl cursor-pointer overflow-hidden text-white"
      >
        {/* ICON SECTION */}
        <div className="flex items-center justify-center min-w-[64px] h-full">
          <motion.div
            animate={{ 
              rotate: hovered ? 360 : 0, 
              scale: hovered ? 1.2 : 1 
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Crown 
              size={28} 
              // Icon turns dark when background turns orange for contrast
              className={hovered ? "text-[#262E40]" : "text-white"} 
            />
          </motion.div>
        </div>

        {/* CONTENT SECTION */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              
              className="flex items-center justify-between flex-1 pr-6 whitespace-nowrap"
            >
                <a href={import.meta.env.VITE_DASHBOARD_URL} className='flex items-center gap-3'>
              <div className="flex flex-col">
                <span className={`text-[10px] uppercase font-black tracking-tighter ${hovered ? "text-slate-900/60" : "text-white/60"}`}>
                  Internal Access
                </span>
                <span className={`text-base font-bold ${hovered ? "text-slate-900" : "text-white"}`}>
                  Admin Panel
                </span>
              </div>
              <ArrowRight size={18} className={hovered ? "text-slate-900" : "text-white"} />
                </a>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default StickyButton;