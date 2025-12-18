import React, { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useClickOutside } from "../../hooks/useClickOutside";

function OptionsInput({ options,handleChange }) {
  const [openOption, setOpenOption] = useState(false);
      const ref = useRef(null)
    useClickOutside(ref,()=>setOpenOption(false))
  return (
    <div ref={ref} className="border border-gray-300 rounded-lg relative w-full min-w-[220px]">
      <div
        className="flex items-center px-3 py-3 cursor-pointer"
        onClick={() => setOpenOption(!openOption)}
      >
        <FaUser className="text-gray-500 mr-2" />
        <span className="text-sm text-gray-600">
          {`${options.adult} adults · ${options.children} children · ${options.room} room`}
        </span>
      </div>

      {openOption && (
        <div className="absolute top-14 left-0 w-full sm:w-64 bg-white shadow-xl rounded-lg p-4 z-50">
          {["adult", "children", "room"].map((opt) => (
            <div key={opt} className="flex justify-between items-center py-2">
              <span className="capitalize text-gray-700">{opt}</span>
              <div className="flex items-center space-x-2">
                <button
                  className="px-3 py-1 bg-gray-200 text-black rounded-md hover:bg-gray-300 disabled:opacity-50"
                  onClick={() => handleChange(opt, -1)}
                  disabled={
                    opt === "adult" || opt === "room"
                      ? options[opt] <= 1
                      : options[opt] <= 0
                  }
                >
                  -
                </button>
                <span className="text-gray-700">{options[opt]}</span>
                <button
                  className="px-3 py-1 z-10 bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={() => handleChange(opt, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <button
            className="w-full mt-3 bg-blue text-white py-2 rounded-lg hover:bg-blue-900 transition"
            onClick={() => setOpenOption(false)}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

export default OptionsInput;
