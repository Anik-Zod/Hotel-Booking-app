import React from "react";

function FooterBanner() {
  return (
    <div className="container mx-auto mt-10 sm:px-10 px-2 mb-16">
      <div className="flex flex-col min-w-[343px]  sm:max-h-[400px] sm:flex-row justify-between items-center bg-[#1E3A8A]  rounded-xl overflow-hidden gap-5 ">
        
        {/* Info Section */}
        <div className="flex flex-col justify-center  px-6 sm:pl-10 pt-6 text-white w-full sm:w-1/2">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">Give us a shot</h1>
            <p className="text-lg">
              book hotel and get 50% up Discount 
            </p>
          </div>

          {/* Buttons */}
          <div className="pt-5 flex flex-col sm:flex-row gap-3 text-lg font-semibold">
            <button className="bg-[#2556de] text-white py-3 px-5 rounded-md hover:bg-[#6e48c9] transition">
              Get started
            </button>
            <button className="bg-white text-black py-3 px-5 rounded-md hover:bg-gray-200 transition">
              Learn more
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="sm:w-1/3">
          <img
            src="footer.png"
            alt="Footer illustration"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default FooterBanner;
