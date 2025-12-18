import { useState } from "react";
import axios from "axios";

const SidebarFilter = ({ handleCities,handleType,selectedCities,selectedTypes,priceRange,setPriceRange }) => {
  const types = ["Hotel", "Apartment", "Resort", "Villa", "Cabin"];
  const cities = ["Chittagong","Dhaka","Noakhali","Barishal","Sylhet","Rajshahi","Cumilla"];
  
  return (
    <div className="w-full max-w-xs  border bg-white border-gray-300  ">
      {/* === Hotel Types === */}
      <p className="text-xl border-b border-gray-300 py-3 px-4">Filter by</p>
        
      <div className="px-4">
      

      
      <div className="mb-4 ">
        <h4 className="font-bold my-2 text-[15px]">Property Type</h4>
        {types.map(type => (
          <label key={type} className="flex items-center mb-1">
            <input
              type="checkbox"
              value={type}
              onChange={handleType}
              checked={selectedTypes.includes(type)}
              className="mr-2"
            />
            <span className="text-gray-400 text-[14px]">
              {type}
            </span>
          </label>
        ))}
      </div>

      {/* === Cities === */}
      <div className="mb-4">
        <h4 className="font-bold my-2 text-[15px]">City</h4>
        {cities.map(city => (
          <label key={city} className="flex items-center mb-1">
            <input
              type="checkbox"
              value={city}
              onChange={handleCities}
              checked={selectedCities.includes(city)}
              className="mr-2"
            />
            <span className="text-gray-400 text-[14px]">
            {city}
            </span>
          </label>
        ))}
      </div>

      {/* === Price Range === */}
      <div className="mb-4">
        <h4 className="font-bold my-2 text-[15px]">Price Range</h4>
        <div className="flex items-center mb-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={e => setPriceRange({ ...priceRange, min: e.target.value })}
            className="w-full border px-2 py-1 mr-2"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={e => setPriceRange({ ...priceRange, max: e.target.value })}
            className="w-full border px-2 py-1"
          />
        </div>
      </div>

      </div>  
    </div>
  );
};

export default SidebarFilter;
