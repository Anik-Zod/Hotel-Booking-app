import React, { useState } from "react";
import { ArrowRight, Bell, Ticket, Gift, Sparkles } from "lucide-react";
import{motion} from "motion/react"

const OfferPage = () => {
  const [activeTab, setActiveTab] = useState("offers");

  const content = {
    offers: [
      {
        id: 1,
        title: "The Penthouse Experience",
        highlight: "30% OFF",
        desc: "Redefine luxury with our signature suite package. Includes private chef service and infinity pool access.",
        image: "hotel5.jpg",
        label: "Limited Availability",
      },
      {
        id: 2,
        title: "Weekend Wellness Retreat",
        highlight: "SPA INCLUDED",
        desc: "Restore your balance with a 2-night stay and unlimited access to our holistic spa and meditation sessions.",
        image: "hotel3.jpg",
        label: "Best Seller",
      },
    ],
    events: [
      {
        id: 3,
        title: "Midnight Masquerade",
        highlight: "DEC 31ST",
        desc: "The city's most exclusive New Year's Eve gala. A night of mystery, champagne, and orchestral performances.",
        image: "hotel2.jpg",
        label: "Black Tie Event",
      },
    ],
    upcoming: [
      {
        id: 4,
        title: "Spring Vernissage 2026",
        highlight: "COMING SOON",
        desc: "An exhibition of contemporary art curated in our Grand Lobby. Early registration for the private viewing starts soon.",
        image: "hotel.jpg",
        label: "Preview",
      },
    ],
  };

  return (
    <div className="bg-blue text-white selection:bg-zinc-900 selection:text-white">
      {/* --- HEADER SECTION --- */}

      <motion.header
                initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
      className="px-6 pt-24 pb-6 max-w-7xl mx-auto leading-relaxed">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-amber-500">
            <div className="h-px w-12 bg-amber-500"></div>
            <span className="text-xs font-bold tracking-[0.4em] uppercase">
              Experiences
            </span>
          </div>
          <h1 className="text-6xl md:text-[9rem] font-black leading-none  tracking-tighter uppercase text-white">
            Curated <br />{" "}
            <span
              className="italic text-transparent border-t-zinc-800"
              style={{ WebkitTextStroke: "1px white" }}
            >
              Moments.
            </span>
          </h1>
        </div>
      </motion.header>
      {/* --- HEADER SECTION --- */}
      <section className=" pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Custom Tabs */}
          <nav className="flex flex-wrap gap-3">
            {Object.keys(content).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "bg-zinc-900 border-zinc-900 text-white"
                    : "bg-transparent border-zinc-200 text-zinc-400 hover:border-zinc-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* --- DYNAMIC SECTION --- */}
      <section className="px-6 max-w-7xl mx-auto space-y-24 py-12">
        {content[activeTab].map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col lg:flex-row gap-12 items-center ${
              index % 2 !== 0 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image Box */}
            <div className="w-full lg:w-3/5 overflow-hidden group relative">
              <div className="absolute top-6 right-6 z-10">
                <span className="bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-tighter shadow-xl">
                  {item.label}
                </span>
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>

            {/* Content Box */}
            <div className="w-full lg:w-2/5 space-y-6">
              <span className="text-amber-600 font-bold tracking-[0.3em] uppercase text-xs flex items-center gap-2">
                <Sparkles size={14} /> {item.highlight}
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                {item.title}
              </h2>
              <p className="text-zinc-500 text-lg leading-relaxed font-light">
                {item.desc}
              </p>

              <div className="pt-6">
                {activeTab === "upcoming" ? (
                  <button className="flex items-center gap-4 group">
                    <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all">
                      <Bell size={20} />
                    </div>
                    <span className="font-bold uppercase text-xs tracking-widest underline decoration-2 underline-offset-8">
                      Notify Me
                    </span>
                  </button>
                ) : (
                  <button className="bg-zinc-900 text-white px-10 py-5 flex items-center gap-6 group hover:bg-zinc-800 transition-all">
                    <span className="font-bold uppercase text-sm tracking-[0.2em]">
                      Explore Experience
                    </span>
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* --- BANNER SECTION --- */}
      <section className="mt-32 bg-zinc-950 py-32 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Become a <br />
              Resident.
            </h2>
            <p className="text-zinc-400 max-w-sm font-medium italic underline decoration-zinc-700 underline-offset-4 cursor-pointer hover:text-white">
              Join the luxury circle for 20% off all bookings.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 border border-zinc-800 flex flex-col items-center justify-center space-y-4 hover:bg-zinc-900 transition-colors">
              <Ticket size={32} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-center">
                Free <br /> Event Entry
              </span>
            </div>
            <div className="p-8 border border-zinc-800 flex flex-col items-center justify-center space-y-4 hover:bg-zinc-900 transition-colors">
              <Gift size={32} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-center">
                Bespoke <br /> Concierge
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OfferPage;
