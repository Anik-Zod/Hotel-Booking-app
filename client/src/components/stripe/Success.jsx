import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Home, Calendar, MapPin, CreditCard, ArrowRight, ShieldCheck } from 'lucide-react';

const Success = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const radius = 50; // Refined radius
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    if (count === 0) navigate('/');
    return () => clearInterval(timer);
  }, [count, navigate]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 md:px-12 font-sans selection:bg-emerald-500/30">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-600/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl bg-[#0A0A0A] border border-white/5 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        <div className="flex flex-col md:flex-row min-h-[600px]">
          
          {/* LEFT: Status & Countdown */}
          <div className="flex-1 p-10 lg:p-20 flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-white/5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-auto text-center md:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Payment Verified</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-extralight tracking-tighter mb-4 leading-none">
                Reserved <br />
                <span className="text-emerald-400 font-serif italic font-light">Exclusively.</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-sm font-light leading-relaxed">
                Your suite at the <span className="text-gray-300">Royal Obsidian</span> is prepared. An invitation has been sent to your inbox.
              </p>
            </motion.div>

            {/* Stunning Circular Countdown */}
            <div className="relative flex items-center justify-center my-12 md:my-0 group">
              <svg className="size-40 transform -rotate-90">
                {/* Background Track */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  className="text-white/5"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  strokeLinecap="round"
                />
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={count}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-4xl font-light font-mono tracking-tighter"
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-black">Redirect</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex gap-1">
                {[1,2,3].map(i => (
                   <motion.div 
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                    className="w-1 h-1 rounded-full bg-emerald-500" 
                   />
                ))}
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
                Finalizing your dashboard
              </p>
            </div>
          </div>

          {/* RIGHT: High-End Receipt Summary */}
          <div className="w-full md:w-[450px] bg-white/[0.02] p-10 lg:p-14 flex flex-col justify-between backdrop-blur-3xl">
            <div className="space-y-10">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Conf. Number</p>
                  <p className="text-sm font-mono text-emerald-400/80 tracking-widest">#RO-228910</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
                  <Check className="text-black w-6 h-6 stroke-[3px]" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-light tracking-tight mb-2">Grand Deluxe Suite</h2>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={14} className="text-emerald-500/50" />
                    <span className="text-xs tracking-wide">The Palm Jumeirah, Dubai</span>
                  </div>
                </div>

                <div className="h-px bg-white/5 w-full" />

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={14} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Check In</span>
                    </div>
                    <p className="text-sm font-medium">Dec 15, 2025</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={14} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Check Out</span>
                    </div>
                    <p className="text-sm font-medium">Dec 22, 2025</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <CreditCard size={16} className="text-emerald-500" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium">Total Charged</span>
                  </div>
                  <span className="text-lg font-mono font-bold text-white tracking-tighter">$3,450.00</span>
                </div>
              </div>
            </div>

            {/* Manual Action */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="mt-12 w-full group relative overflow-hidden bg-white text-black py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all"
            >
              <div className="absolute inset-0 bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Home size={16} />
                Explore More
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </div>

        </div>
      </motion.div>

      {/* Support Footer */}
      <div className="fixed bottom-10 flex items-center gap-4 text-[9px] text-gray-600 uppercase tracking-[0.4em] font-black">
        <span className="w-8 h-px bg-gray-800"></span>
        Assistance Available 24/7 • 1-800-OBSIDIAN
        <span className="w-8 h-px bg-gray-800"></span>
      </div>
    </div>
  );
};

export default Success;