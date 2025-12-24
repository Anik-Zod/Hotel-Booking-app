"use client";

import { Siren, X, CheckCircle2, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const complaintsData = [
  {
    id: 1,
    userName: "Shimu Das",
    complaint: "App is slow on login. Multiple timeouts occurring on the dashboard.",
    time: "5 MIN AGO",
    image: "https://ui-avatars.com/api/?name=Shimu+Das&background=3dd6c6&color=041f26",
    status: "pending",
  },
  {
    id: 2,
    userName: "Pratima Das",
    complaint: "Payment failed but money debited from account. Transaction ID 45920.",
    time: "1 HOUR AGO",
    image: "https://ui-avatars.com/api/?name=Pratima+Das&background=3dd6c6&color=041f26",
    status: "in-progress",
  },
  {
    id: 3,
    userName: "Mrinal Kanti Das",
    complaint: "Cannot upload profile picture even though it's under 2MB.",
    time: "YESTERDAY",
    image: "https://ui-avatars.com/api/?name=Mrinal+Das&background=3dd6c6&color=041f26",
    status: "resolved",
  },
];

const statusMap = {
  pending: {
    label: "Pending",
    icon: <AlertCircle size={12} />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  "in-progress": {
    label: "In Progress",
    icon: <Clock size={12} />,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  resolved: {
    label: "Resolved",
    icon: <CheckCircle2 size={12} />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
};

export default function Complain({ showComplaints, setShowComplaints, onClose }) {
  return (
    <div className="fixed inset-y-0 right-0 z-[120] flex pointer-events-none">
      <AnimatePresence>
        {showComplaints && (
          <motion.aside
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-[380px] max-w-[100vw] h-screen bg-bg border-l border-primary/10 shadow-[-10px_0_40px_rgba(1,9,13,0.9)] flex flex-col pointer-events-auto"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-8 bg-bg-dull/50 border-b border-primary/5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-3 rounded-2xl bg-primary/10 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                    <Siren className="text-primary" size={22} />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex size-3 rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-1.5 bg-red-500"></span>
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-textColor tracking-tight uppercase italic leading-none">
                    Complaints
                  </h2>
                  <p className="text-[10px] text-primary-dull font-bold uppercase tracking-[0.2em] mt-1.5">
                    Critical Support Queue
                  </p>
                </div>
              </div>
              <button 
                onClick={()=> setShowComplaints(false)}
                className="p-2.5 rounded-xl hover:bg-primary/10 text-textDull hover:text-primary transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {complaintsData.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-5 rounded-2xl border border-primary/5 bg-global/30 hover:bg-primary/[0.03] hover:border-primary/20 transition-all duration-300 shadow-sm"
                >
                  <div className="flex gap-4">
                    {/* User Profile */}
                    <div className="relative shrink-0">
                      <img
                        src={c.image}
                        alt={c.userName}
                        className="size-11 rounded-xl object-cover ring-1 ring-primary/20 p-0.5"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-[15px] font-bold text-textColor truncate">
                          {c.userName}
                        </h4>
                        <span className="text-[9px] text-primary-dull font-black tracking-wider">
                          {c.time}
                        </span>
                      </div>
                      
                      <p className="text-[13px] text-textDull leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                        {c.complaint}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${statusMap[c.status].bg} ${statusMap[c.status].color} ${statusMap[c.status].border}`}>
                          {statusMap[c.status].icon}
                          {statusMap[c.status].label}
                        </div>
                        
                        <button className="flex items-center gap-1 text-[11px] text-primary font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          Resolve <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="p-6 bg-bg-dull border-t border-primary/5">
              <button className="w-full py-4 bg-global border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-primary hover:text-bg transition-all duration-300 shadow-xl">
                Open Support Hub
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}