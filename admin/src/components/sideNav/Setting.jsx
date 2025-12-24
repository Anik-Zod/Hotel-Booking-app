"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Bell,
  Lock,
  CreditCard,
  Info,
  LogOut,
  ChevronRight,
  Settings as SettingsIcon,
  ShieldCheck,
  X,
} from "lucide-react";

const settingsData = [
  {
    id: 1,
    title: "Profile",
    description: "Personal data & avatar",
    icon: <User size={20} />,
    color: "var(--color-primary)",
  },
  {
    id: 2,
    title: "Notifications",
    description: "Alerts & email frequency",
    icon: <Bell size={20} />,
    color: "var(--color-primary)",
  },
  {
    id: 3,
    title: "Security",
    description: "Password & 2FA settings",
    icon: <Lock size={20} />,
    color: "var(--color-primary)",
  },
  {
    id: 4,
    title: "Billing",
    description: "Subscription & invoices",
    icon: <CreditCard size={20} />,
    color: "var(--color-primary)",
  },
  {
    id: 5,
    title: "About",
    description: "System version & docs",
    icon: <Info size={20} />,
    color: "var(--color-textDull)",
  },
];

export default function SettingsSidebar({ showSettings, setShowSettings }) {
  return (
    <div className="relative z-[100] flex h-full">
      <AnimatePresence>
        {showSettings && (
          <motion.div
            key="settings-sidebar"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 350 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="relative h-full bg-bg border-l border-primary/10 shadow-[-20px_0_50px_rgba(1,9,13,0.7)] flex flex-col overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/5 blur-[100px] pointer-events-none" />

            {/* Header section */}
            <div className="relative px-6 pt-10 pb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-md rounded-full" />
                  <div className="relative size-12 rounded-2xl bg-global border border-primary/20 flex items-center justify-center text-primary shadow-inner">
                    <SettingsIcon
                      size={24}
                      className="animate-[spin_8s_linear_infinite]"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-textColor tracking-tight uppercase italic">
                    Control <span className="text-primary">Center</span>
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <ShieldCheck size={12} className="text-primary-dull" />
                    <span className="text-[10px] font-bold text-primary-dull uppercase tracking-widest">
                      Secure Session
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2.5 absolute right-0 top-5 rounded-xl hover:bg-primary/10 text-textDull hover:text-primary transition-all duration-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Settings Body */}
            <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
              <p className="px-3 pb-2 text-[10px] font-black text-textDull/40 uppercase tracking-[0.3em]">
                General
              </p>

              {settingsData.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  <div className="relative flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-primary/20 transition-all duration-300 cursor-pointer">
                    {/* Icon with hover lift */}
                    <div className="shrink-0 size-11 rounded-xl bg-bg-dull border border-primary/5 flex items-center justify-center text-textDull group-hover:text-primary group-hover:border-primary/40 group-hover:-translate-y-0.5 transition-all duration-300 shadow-lg">
                      {item.icon}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-textColor text-[15px] tracking-wide group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-textDull text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity leading-tight">
                        {item.description}
                      </p>
                    </div>

                    <ChevronRight
                      size={16}
                      className="text-primary-dull opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </motion.div>
              ))}

              <div className="pt-6 pb-2">
                <p className="px-3 pb-2 text-[10px] font-black text-textDull/40 uppercase tracking-[0.3em]">
                  Danger Zone
                </p>
                <div className="p-4 rounded-2xl hover:bg-red-500/5 border border-transparent hover:border-red-500/20 group transition-all duration-300 cursor-pointer flex items-center gap-4">
                  <div className="shrink-0 size-11 rounded-xl bg-bg-dull border border-red-500/10 flex items-center justify-center text-red-500/40 group-hover:text-red-500 group-hover:border-red-500/40 transition-all">
                    <LogOut size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-textColor/60 group-hover:text-red-400 transition-colors">
                      Sign Out
                    </h3>
                    <p className="text-textDull/40 text-[11px] group-hover:text-red-500/60 transition-colors italic">
                      Terminate current session
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with System Status */}
            <div className="p-6 bg-global/50 border-t border-primary/5">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black text-primary uppercase tracking-tighter">
                    System Nominal
                  </span>
                </div>
                <span className="text-[10px] font-medium text-textDull opacity-30">
                  v4.8.0-PRO
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
