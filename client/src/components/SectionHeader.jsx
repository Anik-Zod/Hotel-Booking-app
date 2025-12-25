import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { twMerge } from "tailwind-merge";


function SectionHeader({ title, description, highlight }) {
  return (
    <div className={twMerge("gap-6 mb-10 flex justify-center text-center")}>
      <div className="">
        <div className="space-y-3 ">
          <div className="inline-flex items-center gap-2 bg-yellow/5 text-yellow px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wide border border-blue-100 ">
            <Sparkles size={14} />
            Limited Time Deals
          </div>
          <h2 className="text-3xl  font-black text-gray-900 tracking-tight">
            {title} <span className="text-yellow ml-3"> {highlight}</span>
          </h2>
          <p className="text-gray-500 max-w-md text-sm  leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SectionHeader;
