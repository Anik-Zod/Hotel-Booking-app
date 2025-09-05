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

const Header = ({ type }) => {
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
    <div className="bg-blue-900 text-white flex justify-center relative py-6">
      <div className={`w-full max-w-[1024px] ${type === "list" ? "mb-0" : "mb-24"}`}>
        {/* Navigation Icons */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 justify-center">
          {[
            { icon: FaBed, label: "Stays" },
            { icon: FaPlane, label: "Flights" },
            { icon: FaCar, label: "Car rentals" },
            { icon: FaBed, label: "Attractions" },
            { icon: FaTaxi, label: "Airport taxis" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg border border-white cursor-pointer hover:bg-white hover:text-blue-900 transition text-xs sm:text-sm"
            >
              <item.icon className="text-sm sm:text-lg" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {type !== "list" && (
          <>
            <h1 className="text-xl sm:text-3xl font-bold  text-center">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="my-3 sm:my-4 text-sm sm:text-lg text-center md:text-center">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account.
            </p>

            {/* Search Box */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 p-3 md:p-4 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-6 relative">
              {/* Destination Input */}
              <div className="flex items-center border rounded-lg px-3 py-2 w-full">
                <FaBed className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Where to?"
                  className="outline-none text-sm w-full text-black"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              {/* Date Picker */}
              <div
                className="flex items-center border rounded-lg px-3 py-2 w-full cursor-pointer relative"
                onClick={() => setOpenDate(!openDate)}
              >
                <FaCalendarDay className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-500">
                  {`${format(dates[0].startDate, "MMM d")} - ${format(
                    dates[0].endDate,
                    "MMM d"
                  )}`}
                </span>

                {openDate && (
                  <div className="absolute top-12 left-0 bg-white shadow-lg p-2 sm:p-4 rounded-lg z-50">
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
              <div className="relative w-full">
                <div
                  className="flex items-center border rounded-lg px-3 py-2 cursor-pointer w-full"
                  onClick={() => setOpenOption(!openOption)}
                >
                  <FaUser className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-500">
                    {`${options.adult} adults · ${options.children} children · ${options.room} room`}
                  </span>
                </div>

                {openOption && (
                  <div className="absolute top-12 left-0 w-full sm:w-64 bg-white shadow-lg rounded-lg p-4 z-50">
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
                              (opt === "adult" || opt === "room"
                                ? options[opt] <= 1
                                : options[opt] <= 0)
                            }
                          >
                            -
                          </button>
                          <span className="text-gray-600">{options[opt]}</span>
                          <button
                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                            onClick={() => handleChange(opt, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      className="w-full mt-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
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
                  className="flex items-center justify-center bg-blue-600 text-white rounded-full w-full md:w-56 h-12 md:h-14 hover:bg-blue-700 transition"
                  onClick={handleSearch}
                >
                  <FaSearch className="text-lg" />
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
