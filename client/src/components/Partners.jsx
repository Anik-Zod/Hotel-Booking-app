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
    <section className="py-16">
      <div className="container">
        <SectionHeader title="Our Partners" description="We collaborate with industry leaders to bring you the best solutions." button="Become a Partner" />
        <div className="flex flex-col items-center gap-10 my-6 w-full  overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <h1 className="text-[16px]">Join 4,000+ companies already growing</h1>
          <motion.div
            animate={{ x: "-50%" }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          >
            <motion.div
              className="flex gap-16 pr-16 translate-x-[460px]"
            >
              {items.concat(items).map((item, index) => (
                <div
                  key={index}
                  className="inline-flex items-center  flex-1  gap-2"
                >
                  <img src={item.image} alt="" />
                  <h1 className="text-[24px] text-black/70 tracking-wide font-semibold">
                    {item.title}
                  </h1>
                </div>
              ))}
            </motion.div>
            {}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


export default Partners;
