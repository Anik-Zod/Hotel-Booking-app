import React, { useState, useEffect } from "react";
import { Tag, Timer, ArrowRight, Sparkles, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Offer = () => {
  // State for the Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: 59, seconds: 59, hours: prev.hours - 1 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate()

  return (
    <section className="container py-12 md:py-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#FE9A00] px-3 py-1 rounded-full font-bold text-xs uppercase tracking-tighter border border-blue-100">
            <Sparkles size={14} />
            Limited Time Deals
          </div>
          <h2 className="text-3xl  font-black text-gray-900 tracking-tight">
            Exclusive <span className="text-[#FE9A00]">Offers</span>
          </h2>
          <p className="text-gray-500 max-w-md text-sm  leading-relaxed">
            Hand-picked premium experiences at prices you won't find anywhere
            else. Updated every 24 hours.
          </p>
        </div>
        <button onClick={()=>navigate("/hotDeals")} className="flex items-center gap-2 group text-[#FE9A00] font-bold text-sm md:text-base hover:gap-3 transition-all cursor-pointer">
          Explore All Deals{" "}
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* MAIN HERO OFFER (Spans 8 columns on large screens) */}
        <div className="lg:col-span-8 relative group overflow-hidden rounded-[40px] h-[450px] md:h-[500px] shadow-2xl shadow-blue-100">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            alt="Tropical Paradise"
          />
          {/* Advanced Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          <div className="absolute top-6 left-6 md:top-10 md:left-10 flex gap-3">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-2xl flex items-center gap-3">
              <Timer size={20} className="text-orange-400 animate-pulse" />
              <div className="font-mono font-bold text-lg md:text-xl tracking-wider">
                {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-orange-400 font-bold uppercase tracking-widest text-xs">
                Summer Flash Sale
              </span>
              <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Maldives Blue <br /> Lagoon Tour
              </h3>
              <p className="text-gray-300 max-w-sm text-sm md:text-base">
                All-inclusive 7-day stay with private flight transfers and
                underwater dining.
              </p>
            </div>
            <button className="text-[#0f6268] hover:bg-[#004C51] hover:text-white bg-white transition-all duration-300  px-8 py-4 rounded-[15px] font-black text-lg shadow-xl shrink-0">
              Book Now — $1,299
            </button>
          </div>
        </div>

        {/* SIDE DEALS (Spans 4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-3 ">
          {/* Card 1: Brand Color Style */}

          <div className="flex-1 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                  <Tag size={24} className="text-blue-400" />
                </div>
                <div className="text-xs font-black bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
                  BEST VALUE
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-2">Group Discount</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Travel with{" "}
                  <span className="text-white font-semibold">5+ guests</span>{" "}
                  and unlock instant savings.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between group-hover:bg-white/10 transition-colors">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">
                    Promo Code
                  </p>
                  <p className="text-2xl font-black text-blue-400 tracking-tighter">
                    OFFER15
                  </p>
                </div>
                <ArrowRight className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

          {/* Card 2: Minimalist Style */}
          <div className="flex-1 relative rounded-[35px] px-8 py-5 overflow-hidden group cursor-pointer transition-all duration-500 shadow-xl hover:shadow-rose-200/50">
            {/* Romantic Professional Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff0180] via-[#8a0e5a] to-black" />
            <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-all duration-700" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-gradient-to-tr from-rose-500 to-pink-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                   <span className="text-[10px] font-black text-rose-200 uppercase tracking-[0.2em]">Signature</span>
                </div>
              </div>

              <div >
                <h4 className="text-2xl font-extrabold text-white leading-tight">
                  Honeymoon <br /> 
                  <span className="bg-gradient-to-r from-rose-300 to-rose-100 bg-clip-text text-transparent italic serif">Elite Experience</span>
                </h4>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-rose-300/50 uppercase font-bold tracking-widest">Starting at</span>
                  <span className="text-xl font-black text-white">$499</span>
                </div>
                <div className="flex items-center gap-2 bg-white text-rose-900 px-4 py-2 rounded-xl font-bold text-xs uppercase group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                  Secure Spot <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
