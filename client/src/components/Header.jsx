import { motion, spring } from "motion/react";
import {
  FaBed,
  FaCalendarDay,
  FaCar,
  FaSearch,
  FaUser,
  FaPlane,
  FaTaxi,
} from "react-icons/fa";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const text = "Find your next stay";

const Header = () => {
  const { city, dispatch } = useContext(SearchContext);
  const [destination, setDestination] = useState(city);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOption, setOpenOption] = useState(false);
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
    <div className="will-change-transform z-10 bg-blue mb-50 md:mb-16 text-white flex justify-center relative py-20  overflow-x-clip">
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
            initial={{ opacity: 0, y: 30 }}
            // Animate to visible state
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4}}
            whileHover={{ scale: 1.08, boxShadow: "0px 4px 16px #00000033" }}
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
          <h1 className="text-3xl inline-flex md:text-5xl ">
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
        <div className="z-50 absolute left-1/2 -translate-x-1/2 w-full  -bottom-55 md:-bottom-10  flex justify-center">
          <motion.div
            initial={{ opacity:0,y: 30 }}
            animate={{ opacity:1,y: 0 }}
            transition={{ duration: 0.5 }}
            className=" ring-4  ring-[#ffb700] flex flex-col md:flex-row items-center gap-4 p-4 bg-white shadow-xl rounded-xl  mx-3  min-w-[390px] md:mx-10 mt-8 relative"
          >
            {/* Destination Input */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 w-full">
              <FaBed className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Where to?"
                className="outline-none text-sm w-full text-gray-800"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Date Picker */}
            <div
              className="flex items-center border border-gray-300 rounded-lg px-3 py-3 w-full cursor-pointer relative"
              onClick={() => setOpenDate(!openDate)}
            >
              <FaCalendarDay className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">
                {`${format(dates[0].startDate, "MMM d")} - ${format(
                  dates[0].endDate,
                  "MMM d"
                )}`}
              </span>

              {openDate && (
                <div className="absolute top-14 left-0 bg-white shadow-lg p-4 rounded-lg z-50">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    minDate={new Date()}
                  />
                </div>
              )}
            </div>

            {/* Travelers Options */}
            <div className="border border-gray-300 rounded-lg relative w-full min-w-[250px]">
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
                    <div
                      key={opt}
                      className="flex justify-between items-center py-2"
                    >
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

            {/* Search Button */}
            <Link to="/hotels" className="w-full md:w-auto">
              <button
                className="flex items-center justify-center bg-[#1e3a8a] text-white w-full py-3 md:px-6 rounded-lg hover:bg-blue-900 transition cursor-pointer"
                onClick={handleSearch}
              >
                <FaSearch className="text-lg mr-2" />
                <span className="font-semibold">Search</span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;
