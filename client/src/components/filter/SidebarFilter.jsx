import React from "react";

const SidebarFilter = ({ handleCities, handleType, selectedCities, selectedTypes, priceRange, setPriceRange, setSelectedCities, setSelectedTypes }) => {
  const types = ["Hotel", "Apartment", "Resort", "Villa", "Cabin"];
  const cities = ["Chittagong", "Dhaka", "Noakhali", "Barishal", "Sylhet", "Rajshahi", "Cumilla"];

  const handleReset = () => {
    setSelectedCities([]);
    setSelectedTypes([]);
    setPriceRange({ min: "", max: "" });
  };

  return (
    <div className="w-full lg:max-w-xs bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden sticky top-6">
      {/* Header with Gradient Accent */}
      <div className="relative p-6 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xl font-extrabold bg-gradient-to-r from-blue to-slate-700 bg-clip-text text-transparent">
            Filters
          </h3>
          <span className="bg-blue text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
            {selectedCities.length + selectedTypes.length} Active
          </span>
        </div>
        <div className="h-1 w-26 bg-gradient-to-r from-blue to-transparent rounded-full"></div>
      </div>

      <div className="p-6 pt-4 space-y-9">
        
               {/* === Location Section === */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h4 className="text-[13px] font-bold uppercase tracking-wider">Top Cities</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => handleCities({ target: { value: city } })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                  selectedCities.includes(city)
                    ? "bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-200"
                    : "bg-white border-slate-200 text-slate-600 hover:border-rose-300 hover:bg-rose-50"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </section>

        {/* === Property Type Section === */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h4 className="text-[13px] font-bold uppercase tracking-wider">Property Type</h4>
          </div>
          
          <div className="space-y-2">
            {types.map((type) => (
              <label key={type} className="flex items-center group cursor-pointer transition-all duration-200 hover:translate-x-1">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    value={type}
                    onChange={handleType}
                    checked={selectedTypes.includes(type)}
                    className="peer h-5 w-5 appearance-none rounded-lg border-2 border-slate-200 checked:border-indigo-500 checked:bg-indigo-500 transition-all duration-300 shadow-sm"
                  />
                  <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity ml-[3px] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`ml-3 text-[15px] transition-colors duration-200 ${selectedTypes.includes(type) ? "text-indigo-600 font-semibold" : "text-slate-500 group-hover:text-slate-800"}`}>
                  {type}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* === Price Range Section === */}
        <section className="pb-4">
          <div className="flex items-center gap-2 mb-4 text-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="text-[13px] font-bold uppercase tracking-wider">Price Range</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Min Price</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="group">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Max Price</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                  placeholder="Any"
                />
              </div>
            </div>
          </div>
        </section>

      </div>
      
      {/* Clear Button Footer */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100">
        <button 
          onClick={handleReset}
          className="w-full py-3 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
};

export default SidebarFilter;