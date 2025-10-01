import { motion } from "motion/react";
import React from "react";

function SectionHeader({ title, description, button }) {
  return (
    <div className="overflow-x-clip">
      <div className="container border-l-6 border-blue  ">
        <motion.div
          initial={{ opacity:0,x: -20 }}
          whileInView={{ opacity:1,x: 0 }}
          viewport={{amount:0.3}}
          transition={{ duration: 0.5,ease:"easeOut"}}
          className="will-change-transform"
        >
          <h1 className="text-[24px] pl-2 font-extrabold sm:text-3xl text-blue tracking-wide ">
            {title}
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{amount:0.3}}
          transition={{ duration: 0.6,ease:"easeOut" }}
          className="mb-10 mt-4 pl-2.5 max-w-[500px] text-[14px] tracking-wider sm:text-xl font-serif"
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

export default SectionHeader;
