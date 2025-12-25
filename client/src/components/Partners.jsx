import { motion } from "framer-motion";
import boltImage from "../assets/bolt.png";
import lightboxImage from "../assets/Logomark (1).png";
import featherDevImage from "../assets/Logomark (2).png";
import spheruleImage from "../assets/Logomark (3).png";
import globalBankImage from "../assets/Logomark (4).png";
import nietzscheImage from "../assets/Logomark (5).png";
import SectionHeader from "./SectionHeader";

const items = [
  { title: "Boltshift", image: boltImage },
  { title: "Lightbox", image: lightboxImage },
  { title: "FeatherDev", image: featherDevImage },
  { title: "Spherule", image: spheruleImage },
  { title: "GlobalBank", image: globalBankImage },
  { title: "Nietzsche", image: nietzscheImage },
];

function Partners() {
  return (
    <section className="py-12  bg-white overflow-hidden container mx-auto">

      <SectionHeader
        title="Our Global"
        highlight="partners"
        description="We collaborate with carefully selected hotels, resorts, and property owners to bring you verified stays."
      />

      <div className="relative mt-10 sm:mt-14">
        {/* FIX: Removed 'sm:' from mask. 
            Used a more balanced gradient: Transparent -> Black (full opacity) -> Transparent 
        */}
        <div className="[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <motion.div
            animate={{ x: "-50%" }}
            transition={{
              duration: 25, // Slightly slower for a more premium feel
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-fit will-change-transform"
          >
            {/* We render the list twice for a seamless loop. 
                Added a larger gap to prevent logos from feeling crowded on mobile.
            */}
            <div className="flex items-center gap-12 lg:gap-24 pr-12 lg:pr-24">
              {[...items, ...items].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-8 w-auto sm:h-10 md:h-13 object-contain"
                  />
                  <span className="font-bold tracking-tight text-slate-700 text-sm sm:text-base md:text-lg whitespace-nowrap">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Partners;
