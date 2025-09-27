import React from "react";

function SectionHeader({ title, description, button }) {
  return (
    <div>
      <div className="container ">
        <h2 className="text-[24px] sm:text-center font-extrabold sm:text-3xl   text-gray-800  tracking-tight font-sans">
          {title}
        </h2>
        <p className="mb-10 mt-4 sm:text-center text-[14px] tracking-wider sm:text-xl font-serif">
          {description}
        </p>
      </div>
    </div>
  );
}

export default SectionHeader;
