import React from "react";

function FooterBanner() {
  return (
    <div className=" mt-12 mb-16">
      <div className="container ">

      <div className=" flex flex-col sm:flex-row items-center justify-between bg-[#003B95] rounded-2xl overflow-hidden shadow-lg">
        
        {/* Info Section */}
        <div className="flex flex-col justify-center px-8 py-10 text-white w-full sm:w-1/2 space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              Give us a shot
            </h1>
            <p className="text-lg sm:text-xl opacity-90">
              Book hotels and get <span className="font-semibold text-[#FFB700]">50% off</span> instantly.
            </p>
          </div>

          {/* Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row gap-4 text-base font-medium">
            <button className="bg-[#FFB700] text-black/80 py-3 px-6 rounded-lg shadow-md hover:bg-yellow-500 transition">
              Get Started
            </button>
            <button className="bg-white/90 text-gray-800 py-3 px-6 rounded-lg shadow-md hover:bg-white transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="sm:w-1/2">
          <img
            src="footer.png"
            alt="Footer illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      </div>
    </div>
  );
}

export default FooterBanner;
