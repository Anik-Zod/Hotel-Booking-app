import { motion } from "framer-motion";
import boltImage from "../assets/bolt.png";
import lightboxImage from "../assets/Logomark (1).png";
import featherDevImage from "../assets/Logomark (2).png";
import spheruleImage from "../assets/Logomark (3).png";
import globalBankImage from "../assets/Logomark (4).png";
import nietzscheImage from "../assets/Logomark (5).png";
import SectionHeader from "./SectionHeader";

const items = [
  {
    title: "Boltshift",
    image: boltImage,
  },
  {
    title: "Lightbox",
    image: lightboxImage,
  },
  {
    title: "FeatherDev",
    image: featherDevImage,
  },
  {
    title: "Spherule",
    image: spheruleImage,
  },
  {
    title: "GlobalBank",
    image: globalBankImage,
  },
  {
    title: "Nietzsche",
    image: nietzscheImage,
  },
];

function Partners() {
  return (
    <section className="py-24 bg-gray-50 z-0">
      <div className="container">
        <div className=" flex flex-col overflow-x-clip sm:flex-row  items-center ">
          <div className="border-l-6   text-xl tracking-wide border-l-blue pl-4 relative min-w-[230px] flex-0">
            <motion.p
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5 }}
            >
              Proud partner at Hubspot & Segment
            </motion.p>
          </div>
          <div className="mt-10 sm:mt-0 mask-none sm:mask-[linear-gradient(to_right,transparent,black_10%,transparent)]">
            <motion.div
              animate={{ x: "-50%" }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            
              className="will-change-transform"
            >
              <motion.div className="flex gap-25 pr-25 translate-x-[0px]">
                {items.concat(items).map((item, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center  flex-1  gap-5 filter grayscale hover:filter-none cursor-pointer "
                  >
                    <img src={item.image} alt="" className="size-14 filter " />
                    <h1 className="text-[24px] bg-gradient-to-r from-blue via-yellow-400 to-green-500 text-transparent bg-clip-text  tracking-wide font-semibold ">
                      {item.title}
                    </h1>
                  </div>
                ))}
              </motion.div>
              {}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Partners;
