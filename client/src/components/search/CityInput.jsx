import React from "react";
import { FaBed } from "react-icons/fa";

function CityInput({setDestination}) {
  return (
    <div>
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 w-full ">
        <FaBed className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Where to?"
          className="outline-none text-sm w-full text-gray-800"
          // value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
    </div>
  );
}

export default CityInput;
