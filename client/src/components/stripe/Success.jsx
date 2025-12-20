import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Home, Calendar, MapPin, CreditCard, ArrowRight } from 'lucide-react';

const Success = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const radius = 55;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    if (count === 0) navigate('/');
    return () => clearInterval(timer);
  }, [count, navigate]);

  return (
    <div className=" bg-[#050505] text-gray-100 flex items-center justify-center px-8 font-sans antialiased">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-5xl bg-[#0d0d0d] border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row min-h-[550px]">
          
          {/* LEFT: Branding & Circular Countdown */}
          <div className="flex-1 p-12 lg:p-16 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-white/5">
            <div className="mb-auto">
              <h1 className="text-5xl font-bold tracking-tighter mb-4 leading-tight">
                Confirmed <br />
                <span className="text-[#FE9A00] font-serif italic  text-4xl">Successfully</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-sm">
                Your reservation at the Royal Obsidian is now active. We look forward to your arrival.
              </p>
            </div>

            {/* Circular Progress Section */}
            <div className="relative  flex items-center justify-center my-12  md:my-0">
                
              <svg className="size-32 transform -rotate-90">
                {/* Background Track */}

                {/* Animated Progress Circle */}
                <motion.circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  strokeLinecap="round"
                />
              </svg>
              {/* Counter Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-1">
                <span className="text-3xl font-mono font-bold leading-none">{count}</span>
                <span className="text-[10px] uppercase tracking-tighter text-gray-500 font-bold">sec</span>
              </div>
            </div>

            <p className="mt-8 text-xs text-gray-500 uppercase tracking-widest font-semibold">
              Preparing your dashboard...
            </p>
          </div>

          {/* RIGHT: Stay Summary */}
          <div className="w-full  md:w-[420px] bg-white/[0.01] p-12 flex flex-col gap-7">
            <div className="space-y-8 ">
              <div className="pb-0 border-b border-white/5">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl">
                    <Check className="text-emerald-500 w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Order ID</p>
                    <p className="text-sm font-mono text-gray-300">#HB-882910</p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold mb-2">Grand Deluxe Suite</h2>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={16} className="text-emerald-500" />
                  <span className="text-sm">The Palm Jumeirah, Dubai</span>
                </div>
              </div>

              {/* Detail List */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-400 font-medium">Schedule</span>
                  </div>
                  <span className="text-sm font-semibold">Dec 15 — Dec 22</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <CreditCard size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-400 font-medium">Payment</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-emerald-400">$3,450.00</span>
                </div>
              </div>
            </div>

            {/* Manual Action */}
            <button
              onClick={() => navigate('/')}
              className="mt-3 w-full group flex items-center justify-center gap-3 bg-white text-black py-5 rounded-[1.5rem] font-bold text-sm uppercase tracking-widest transition-all hover:bg-emerald-400 active:scale-95"
            >
              <Home size={18} />
              Return Home
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </motion.div>

      {/* Footer Support Info */}
      <div className="fixed bottom-10 text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">
        Luxury Concierge Available 24/7 • +1 800-HOTEL-PRO
      </div>
    </div>
  );
};

export default Success;