"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  X,
  Trash2,
  Settings,
  ShieldCheck,
} from "lucide-react";

// Mock data included inside for a ready-to-use experience
const defaultNotifications = [
  {
    id: 1,
    title: "New Order Received",
    message: "Order #45321 has been successfully placed.",
    time: "2 min ago",
    icon: <Package size={18} />,
    unread: true,
  },
  {
    id: 2,
    title: "Product Delivered",
    message: "Order #44211 has been delivered to customer.",
    time: "1 hour ago",
    icon: <Truck size={18} />,
    unread: true,
  },
  {
    id: 3,
    title: "Stock Alert",
    message: "Potato 1kg stock is running low (under 10 units).",
    time: "3 hours ago",
    icon: <Clock size={18} />,
    unread: false,
  },
];

export default function NotificationDrawer({ 
  showNotification, 
  setShowNotification, 
  notifications = defaultNotifications 
}) {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <>


      <div className="fixed inset-y-0 right-0 z-[120] flex pointer-events-none">
        <AnimatePresence>
          {showNotification && (
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-[400px] h-screen bg-bg border-l border-primary/10 shadow-2xl flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-8 bg-bg-dull border-b border-primary/5">
                <div className="flex items-center gap-4">
                  <div className="relative p-3 rounded-xl bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(61,214,198,0.1)]">
                    <Bell size={22} className="text-primary" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 size-5 bg-primary text-bg-dull text-[11px] font-black flex items-center justify-center rounded-full border-2 border-bg">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                <div>
                  <h2 className="text-2xl font-black text-textColor tracking-tight uppercase italic">
                    Notification 
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <ShieldCheck size={12} className="text-primary-dull" />
                    <span className="text-[10px] font-bold text-primary-dull uppercase tracking-widest">Secure Session</span>
                  </div>
                </div>
                </div>
                <button 
                  onClick={() => setShowNotification(false)}
                  className="p-2.5 rounded-xl hover:bg-primary/10 text-textDull hover:text-primary transition-all duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Action Strip */}
              <div className="flex items-center justify-between px-6 py-3 bg-global/40 border-b border-primary/5">
                <button className="text-[10px] font-bold text-primary hover:text-textColor transition-colors tracking-widest uppercase">
                  Mark all as read
                </button>
                <div className="flex items-center gap-4 text-textDull">
                  <button className="hover:text-primary transition-colors cursor-pointer">
                    <Settings size={15} />
                  </button>
                  <button className="hover:text-red-400 transition-colors cursor-pointer">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* List Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {notifications.length > 0 ? (
                  notifications.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className={`
                        group relative p-4 rounded-2xl border transition-all duration-300
                        ${n.unread 
                          ? "bg-primary/[0.03] border-primary/20 shadow-sm" 
                          : "bg-transparent border-transparent hover:bg-bg-dull hover:border-primary/5"
                        }
                      `}
                    >
                      <div className="flex gap-4">
                        {/* Icon Box */}
                        <div className={`shrink-0 size-12 rounded-xl flex items-center justify-center bg-global border border-primary/10 ${n.unread ? 'text-primary' : 'text-primary-dull'}`}>
                          {n.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className={`text-[15px] font-bold truncate leading-tight ${n.unread ? "text-textColor" : "text-textDull"}`}>
                              {n.title}
                            </h3>
                            {n.unread && (
                              <span className="size-2 mt-1.5 rounded-full bg-primary shadow-[0_0_8px_#3dd6c6]" />
                            )}
                          </div>
                          
                          <p className={`text-[13px] leading-relaxed mt-1.5 line-clamp-2 ${n.unread ? "text-textDull" : "text-textDull/50"}`}>
                            {n.message}
                          </p>
                          
                          <div className="flex items-center gap-2 mt-3">
                            <Clock size={12} className="text-primary-dull" />
                            <span className="text-[11px] text-primary-dull font-bold tracking-wider">
                              {n.time.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-40">
                    <Bell size={40} className="text-textDull mb-2" />
                    <p className="text-textDull font-bold italic">No new notifications</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 bg-bg-dull/50 border-t border-primary/5">
                <button className="w-full py-4 rounded-xl bg-global border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-bg transition-all duration-300 shadow-xl">
                  View Full History
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}