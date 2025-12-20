import { motion } from "motion/react";
import {
  FaBed,
  FaCar,
  FaSearch,
  FaUser,
  FaPlane,
  FaTaxi,
} from "react-icons/fa";

import { useContext, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { Link } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import CityInput from "./search/CityInput";
import DateInput from "./search/DateInput";
import OptionsInput from "./search/OptionsInput";

const text = "Find your next stay";

const Header = () => {
  const { city, dispatch } = useContext(SearchContext);
  const [destination, setDestination] = useState(city);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleChange = (type, amount) => {
    setOptions((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + amount),
    }));
  };

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { city: destination, dates, options },
    });
  };

  return (
    <div className="z-10 bg-blue mb-50 md:mb-16 text-white flex justify-center relative py-20  overflow-x-clip">
      <div className="flex flex-col justify-center">
        {/* Navigation Icons */}
        <div className="flex flex-wrap gap-3 sm:gap-5 mb-8 justify-center">
          {[
            { icon: FaBed, label: "Stays" },
            { icon: FaPlane, label: "Flights" },
            { icon: FaCar, label: "Car rentals" },
            { icon: FaBed, label: "Attractions" },
            { icon: FaTaxi, label: "Airport taxis" },
          ].map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              // Animate to visible state
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/60 cursor-pointer hover:bg-white hover:text-blue-900 transition text-sm sm:text-base"
            >
              <item.icon className="text-base sm:text-lg" />
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Header Text */}
        <div className=" text-center px-4">
          <h1 className="text-3xl  inline-flex md:text-5xl font-light">
            {/* Find your next stay */}
            {text.split("").map((char, i) => (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                key={i}
              >
                {char === " " ? "\u00A0" : char}
              </motion.p>
            ))}
          </h1>
          <p className="mt-3 text-lg font-extralight md:text-xl text-white tracking-tight">
            Find Flights, Hotels, Visa & Holidays
          </p>
        </div>

        {/* Search Box */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full  -bottom-55 md:-bottom-10  flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="ring-4 ring-[#ffb700] flex flex-col md:flex-row items-center gap-4 p-4 bg-white shadow-xl rounded-xl  mx-3  min-w-[390px] md:mx-10 mt-8 relative"
          >
            <div className="w-full">
              <CityInput setDestination={setDestination} />
            </div>

            <DateInput setDates={setDates} dates={dates} className="absolute top-20 "/> 

            <OptionsInput options={options} handleChange={handleChange}/>

            <Link to="/hotels" className="w-full md:w-auto">
              <button
                className="flex gap-2 items-center justify-center bg-[#FE9A00] text-white w-full py-[9px] md:px-4 rounded-lg hover:bg-[#d48206] transition cursor-pointer"
                onClick={handleSearch}
              >
                <FaSearch size={12} />
                <span className="font-light">Search</span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;
