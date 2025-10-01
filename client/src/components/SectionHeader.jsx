import { motion } from "motion/react";
import React from "react";

function SectionHeader({ title, description, button }) {
  return (
    <div className="overflow-x-clip">
      <div className="container border-l-6 border-blue  ">
        <motion.div
          initial={{ x: -200 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.5,delay:0.09 }}
          className=""
        >
          <h1 className="text-[24px] pl-2 font-extrabold sm:text-3xl   text-gray-800/80  tracking-wide ">
            {title}
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5,delay:0.09 }}
          className="mb-10 mt-4 pl-2.5 max-w-[500px] text-[14px] tracking-wider sm:text-xl font-serif"
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

export default SectionHeader;
