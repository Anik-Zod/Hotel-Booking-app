import React, { useState } from "react";
import { 
  ArrowRight, Clock, Star, MapPin, Wifi, Coffee, Utensils, 
  Plane, CheckCircle2, SlidersHorizontal, Info, Shield, Heart,
  Menu, Search, Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK DATA ---
const CATEGORIES = ["All Deals", "Tropical", "City Break", "Alpine", "Retreats"];

const OFFERS = [
  {
    id: 1,
    category: "Tropical",
    title: "Maldives Private Atoll",
    location: "Raa Atoll, Maldives",
    price: 1299,
    originalPrice: 2400,
    rating: 4.9,
    reviews: 128,
    tags: ["All Inclusive", "Flight Included"],
    features: ["Overwater Villa", "Seaplane Transfer"],
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800",
    expiresIn: "12h 30m"
  },
  {
    id: 2,
    category: "City Break",
    title: "Tokyo Skyline Suite",
    location: "Shinjuku, Japan",
    price: 450,
    originalPrice: 890,
    rating: 4.8,
    reviews: 84,
    tags: ["Business Class", "Late Checkout"],
    features: ["City View", "Rooftop Bar"],
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800",
    expiresIn: "2 Days"
  },
  {
    id: 3,
    category: "Alpine",
    title: "Swiss Alps Chalet",
    location: "Zermatt, Switzerland",
    price: 680,
    originalPrice: 1100,
    rating: 5.0,
    reviews: 42,
    tags: ["Ski Pass", "Breakfast"],
    features: ["Private Hot Tub", "Ski-in/Ski-out"],
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800",
    expiresIn: "5h 15m"
  },
  {
    id: 4,
    category: "Retreats",
    title: "Bali Jungle Retreat",
    location: "Ubud, Indonesia",
    price: 299,
    originalPrice: 600,
    rating: 4.7,
    reviews: 210,
    tags: ["Wellness", "Yoga"],
    features: ["Infinity Pool", "Daily Massage"],
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800",
    expiresIn: "1 Day"
  },
  {
    id: 5,
    category: "City Break",
    title: "NYC Loft Experience",
    location: "Manhattan, USA",
    price: 399,
    originalPrice: 750,
    rating: 4.6,
    reviews: 305,
    tags: ["Central Location", "Concierge"],
    features: ["Penthouse", "Gym Access"],
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0d6b21?auto=format&fit=crop&w=800",
    expiresIn: "8h 00m"
  },
  {
    id: 6,
    category: "Tropical",
    title: "Santorini Cave House",
    location: "Oia, Greece",
    price: 850,
    originalPrice: 1500,
    rating: 4.9,
    reviews: 95,
    tags: ["Honeymoon", "Romantic"],
    features: ["Caldera View", "Private Jacuzzi"],
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800",
    expiresIn: "3 Days"
  },
];



const StunningBookingPage = () => {
  const [activeTab, setActiveTab] = useState("All Deals");

  const filteredOffers = activeTab === "All Deals" 
    ? OFFERS 
    : OFFERS.filter(offer => offer.category === activeTab);

  return (
    <div className="lg:px-6 bg-slate-950 text-slate-300 min-h-screen font-sans selection:bg-indigo-500/30 selection:text-white -mt-29">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[1000px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[600px] bg-rose-600/10 blur-[130px] rounded-full opacity-20" />
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-39 pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-indigo-500/30 rounded-full backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Live Inventory Drop</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Get Discounts,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                insane prices.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-400 max-w-md leading-relaxed"
            >
              Access unsold inventory from 5-star resorts worldwide. Up to 60% off. Fully refundable until 48h before check-in.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-white text-slate-950 hover:bg-indigo-50 px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)]">
                Start Exploring
              </button>
              <button className="px-8 py-4 rounded-xl font-bold text-sm text-white border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all flex items-center gap-2">
                 <Clock size={16} className="text-indigo-400"/> Flash Deals
              </button>
            </motion.div>

            <div className="pt-8 flex items-center gap-8 border-t border-slate-800/50">
              <div>
                <p className="text-3xl font-bold text-white">2.4k+</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Trips Booked</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">4.9</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">TrustPilot</p>
              </div>
            </div>
          </div>
          
          {/* Hero Image Card */}
          <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
               className="relative h-[500px] w-full bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl"
            >
               <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Hero" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
               
               <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                          -55% Off
                        </span>
                        <div className="flex text-amber-400">
                          {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor"/>)}
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-1">Bora Bora Overwater</h3>
                      <p className="text-slate-400 flex items-center gap-2 text-sm"><MapPin size={14}/> French Polynesia</p>
                    </div>
                    <div className="text-right">
                       <p className="text-slate-400 line-through text-sm font-medium">$3,200</p>
                       <p className="text-3xl font-bold text-white tracking-tight">$1,450</p>
                       <p className="text-indigo-400 text-xs font-bold mt-1">Total Savings: $1,750</p>
                    </div>
                  </div>
               </div>
            </motion.div>
            
            {/* Floating Badge */}
            <motion.div 
               initial={{ x: 20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="absolute -right-6 top-12 bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl border border-slate-700 shadow-xl max-w-[200px]"
            >
              <div className="flex items-start gap-3">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <CheckCircle2 size={16} className="text-green-500" />
                </div>
                <div>
                   <p className="text-xs text-slate-400 mb-1">Recent Booking</p>
                   <p className="text-sm font-bold text-white">Sarah just saved $450 on this trip</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* --- LISTING SECTION --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Modern Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
           <div>
              <h2 className="text-3xl font-bold text-white mb-2">Exclusive Offers</h2>
              <p className="text-slate-400">Hand-picked packages dropping every Tuesday.</p>
           </div>
           
           <div className="flex p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto max-w-full gap-1">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors z-10 ${
                    activeTab === cat ? "text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {activeTab === cat && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-slate-800 rounded-lg shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
           </div>
        </div>

        {/* Masonry-style Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredOffers.map((offer) => {
              const discountPercentage = Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100);
              
              return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={offer.id}
                className="group relative bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden hover:border-indigo-500/30 hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.15)] transition-all duration-500"
              >
                {/* Image Area */}
                <div className="h-64 relative overflow-hidden">
                   <img src={offer.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt={offer.title} />
                   
                   {/* Top Overlays */}
                   <div className="absolute top-4 left-4 flex gap-2">
                     <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-white flex items-center gap-1.5">
                       <Clock size={12} className="text-rose-400"/> {offer.expiresIn} left
                     </div>
                   </div>
                   <button className="absolute top-4 right-4 bg-slate-950/50 backdrop-blur-md p-2 rounded-full border border-white/10 text-white hover:bg-white hover:text-rose-500 transition-colors">
                      <Heart size={16} />
                   </button>

                   {/* Gradient for text readability */}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                   
                   {/* Floating Tags over Image */}
                   <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {offer.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-white/10 backdrop-blur-md text-white rounded-md border border-white/10">
                           {tag}
                        </span>
                      ))}
                   </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-1">{offer.title}</h3>
                        <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                           <MapPin size={14} className="text-indigo-500" /> {offer.location}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                         <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                           <Star size={14} fill="currentColor" /> {offer.rating}
                         </div>
                         <span className="text-xs text-slate-500">({offer.reviews})</span>
                      </div>
                   </div>

                   {/* Features */}
                   <div className="flex gap-4 mb-6 py-4 border-y border-slate-800">
                      {offer.features.map((feature, idx) => (
                         <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-400">
                            <div className="w-1 h-1 bg-indigo-500 rounded-full" /> {feature}
                         </div>
                      ))}
                   </div>

                   {/* Footer / Price */}
                   <div className="flex items-center justify-between">
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-slate-500 line-through">${offer.originalPrice}</span>
                            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">-{discountPercentage}%</span>
                         </div>
                         <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-white">${offer.price}</span>
                            <span className="text-xs text-slate-400">/ night</span>
                         </div>
                      </div>
                      <button className="group/btn relative overflow-hidden bg-white text-slate-950 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:bg-indigo-50">
                          <span className="relative z-10 flex items-center gap-2">
                            View Deal <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform"/>
                          </span>
                      </button>
                   </div>
                </div>
              </motion.div>
            )})}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-16 text-center">
            <button className="group bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white px-8 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 mx-auto">
                Load More Exclusive Offers
                <ArrowRight size={16} className="group-hover:rotate-90 transition-transform" />
            </button>
        </div>
      </section>

      {/* --- TRUST SIGNALS --- */}
      <section className="border-t border-slate-800 mt-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-slate-900/50" />
         <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
            <div className="grid md:grid-cols-3 gap-12">
               {[
                 { icon: Shield, title: "Escrow Protection", desc: "Funds held securely until you successfully check in." },
                 { icon: Info, title: "Distressed Inventory", desc: "We partner with hotels to sell unsold rooms at cost." },
                 { icon: SlidersHorizontal, title: "Flexible Dates", desc: "Change dates up to 7 days before arrival for free." }
               ].map((item, idx) => (
                 <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 shrink-0">
                       <item.icon size={24} />
                    </div>
                    <div>
                       <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                       <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default StunningBookingPage;