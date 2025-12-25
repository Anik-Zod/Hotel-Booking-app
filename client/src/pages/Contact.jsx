import React from "react";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Globe,
  Sparkles,
} from "lucide-react";
import FAQSection from "../components/FAQSection";
import { motion } from "framer-motion"; // Note: changed from motion/react for standard framer compatibility

export default function Contact() {
  return (
    <div className="bg-blue text-zinc-100 min-h-screen selection:bg-amber-500/30">
      {/* 1. MINIMALIST HERO */}
      <header className="px-6 pt-37 pb-20 max-w-7xl mx-auto border-b border-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-4 text-amber-500">
            <div className="h-px w-12 bg-amber-500"></div>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
              Connect With Us
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black leading-none tracking-tighter uppercase">
            Get In <br />{" "}
            <span
              className="italic text-transparent"
              style={{ WebkitTextStroke: "1px white" }}
            >
              Touch.
            </span>
          </h1>
          <p className="max-w-xl text-zinc-200 text-lg font-light leading-relaxed mt-4">
            Whether you are planning a global gala or a quiet weekend retreat,
            our concierge team is available 24/7 to curate your perfect stay.
          </p>
        </motion.div>
      </header>

      {/* 2. CONTACT CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-24">
        {/* LEFT COLUMN: INFORMATION */}
        <div className="space-y-20">
          <div>
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-10">
              Direct Channels
            </h2>
            <div className="space-y-1">
              <InfoCard
                icon={<MapPin size={18} />}
                title="The Residence"
                desc="123 Skyline Blvd, Manhattan, NY"
              />
              <InfoCard
                icon={<Phone size={18} />}
                title="Priority Line"
                desc="+1 (800) LUMIERE"
              />
              <InfoCard
                icon={<Mail size={18} />}
                title="Digital Concierge"
                desc="villas@lumieregrand.com"
              />
              <InfoCard
                icon={<Clock size={18} />}
                title="Operating Hours"
                desc="24/7 Global Assistance"
              />
            </div>
          </div>

          {/* ASSET PIECE (Visual placeholder to match theme) */}
          <div className="hidden lg:block relative aspect-video border border-zinc-800 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
              className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000"
              alt="Office"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-amber-500">
              <Globe size={14} /> Global Headquarters
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE FORM */}
        <div className="relative">
          <div className="absolute -top-10 -right-10 opacity-10">
            <Sparkles size={150} />
          </div>
          <ContactForm />
        </div>
      </section>

      {/* 3. FAQ SECTION INTEGRATION */}
      <div className="bg-zinc-950/50 border-t border-zinc-900">
        <FAQSection />
      </div>

      {/* 4. LUXURY FOOTER MINI */}
      <footer className="py-20 text-center border-t border-zinc-900">
        <p className="text-[10px] tracking-[0.6em] uppercase text-zinc-300">
          24 / 7 customer support available
        </p>
      </footer>
    </div>
  );
}

const InfoCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ x: 10 }}
    className="group flex items-center gap-8 py-8 border-b border-zinc-900 last:border-0 cursor-pointer"
  >
    <div className="text-amber-500 transition-transform group-hover:scale-125 duration-500">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-600 mb-1">
        {title}
      </p>
      <h3 className="text-xl font-medium text-zinc-200 group-hover:text-white transition-colors">
        {desc}
      </h3>
    </div>
    <ArrowUpRight
      className="ml-auto text-zinc-800 group-hover:text-amber-500 transition-colors"
      size={20}
    />
  </motion.div>
);

function ContactForm() {
  return (
    <div className="bg-zinc-900/30 border border-zinc-800 p-10 md:p-16 backdrop-blur-sm">
      <h2 className="text-3xl font-bold tracking-tighter uppercase mb-10">
        Leave a <span className="text-zinc-500 italic font-light">Message</span>
      </h2>

      <form className="space-y-8 text-white ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          <Input label="Identity" placeholder="Full Name" className="text-white"/>
          <Input
            label="Electronic Mail"
            placeholder="Email Address"
            type="email"
          />
        </div>
        <Input label="Inquiry Subject" placeholder="Nature of Request" />
        <div className="flex flex-col">
          <label className="text-[17px] font-bold tracking-[0.3em] uppercase text-zinc-300 mb-4">
            Detailed Inquiry
          </label>
          <textarea
            rows={4}
            placeholder="How may we assist you today?"
            className="bg-transparent border-b border-zinc-300 pb-2 focus:border-amber-500 outline-none transition-colors resize-none text-zinc-200 text-[16px] placeholder:text-zinc-400"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-amber-500 transition-colors mt-8"
        >
          Dispatch Message
        </motion.button>
      </form>
    </div>
  );
}

const Input = ({ label, placeholder, type = "text" }) => (
  <div className="flex flex-col group ">
    <label className="text-[15px] font-bold tracking-[0.3em] uppercase text-zinc-300 mb-4 transition-colors group-focus-within:text-amber-500">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="bg-transparent border-b border-zinc-300 pb-2 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-500 text-zinc-200"
    />
  </div>
);
