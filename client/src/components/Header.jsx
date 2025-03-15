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
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const Header = ({ type }) => {
  const { city,dispatch } = useContext(SearchContext);

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
    setOptions((prev) => {
      return {
        ...prev,
        [type]: Math.max(0, prev[type] + amount),
      };
    });
  };


  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { 
        city:destination, dates:dates, options:options },
    });
  };

 
  
  return (
    <div className="bg-blue-900 text-white flex justify-center relative py-6">
      <div
        className={`w-full max-w-[1024px] ${
          type === "list" ? "mb-0" : "mb-24"
        }`}
      >
        {/* Navigation Icons */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {[
            { icon: FaBed, label: "Stays" },
            { icon: FaPlane, label: "Flights" },
            { icon: FaCar, label: "Car rentals" },
            { icon: FaBed, label: "Attractions" },
            { icon: FaTaxi, label: "Airport taxis" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white cursor-pointer hover:bg-white hover:text-blue-900 transition"
            >
              <item.icon className="text-lg" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {type !== "list" && (
          <>
            <h1 className="text-3xl font-bold text-center md:text-left">
              A lifetime of discounts? Its Genius.
            </h1>
            <p className="my-4 text-lg text-center md:text-left">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account.
            </p>

            {/* Search Box */}
            <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-6">
              {/* Destination Input */}
              <div className="flex items-center border rounded-lg px-4 py-2 w-full">
                <FaBed className="text-gray-500 mr-2" />
                <div>
                  <p className="text-xs text-gray-400">Where to?</p>
                  <input
                    type="text"
                    placeholder="Enter destination"
                    className="outline-none text-sm w-full text-black"
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              {/* Date Picker */}
              <div
                className="text-gray-500 flex items-center border rounded-lg px-4 py-2 w-full cursor-pointer relative"
                onClick={() => setOpenDate(!openDate)}
              >
                <FaCalendarDay className="text-gray-500 mr-2" />
                <div>
                  <p className="text-xs text-gray-400">Dates</p>
                  <span className="text-sm">
                    {`${format(dates[0].startDate, "MMM d")} - ${format(
                      dates[0].endDate,
                      "MMM d"
                    )}`}
                  </span>
                </div>
                {openDate && (
                  <div className="absolute top-12 left-0 bg-white shadow-lg p-3 z-10 rounded-lg">
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

              {/* Travelers Options Dropdown */}
              <div
                className="relative flex items-center border rounded-lg px-4 py-2 w-full cursor-pointer"
                onClick={() => setOpenOption(!openOption)} // Toggle the options dropdown
              >
                <FaUser className="text-gray-500 mr-2" />
                <div>
                  <p className="text-xs text-gray-400">Travelers</p>
                  <span className="text-sm text-gray-500">
                    {`${options.adult} adults · ${options.children} children · ${options.room} room`}
                  </span>
                </div>
              </div>

              {/* Travelers Options Dropdown */}
              {openOption && (
                <div className="absolute  mt-[310px] lg:ml-[500px] w-full max-w-[350px] bg-white shadow-lg rounded-lg p-4 transition-all ease-in-out duration-300 opacity-100 z-10">
                  {/* Adult Option */}
                  <div className="flex justify-between items-center py-2">
                    <span className="capitalize text-gray-700">Adult</span>
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-3 py-1 bg-gray-200 text-black rounded-md transition-all hover:bg-gray-300 disabled:opacity-50"
                        onClick={() => handleChange("adult", -1)} // Decrease the number
                        disabled={options.adult <= 1} // Prevent negative values
                      >
                        -
                      </button>
                      <span className="text-gray-600">{options.adult}</span>
                      <button
                        className="text-black px-3 py-1 bg-gray-200 rounded-md transition-all hover:bg-gray-300"
                        onClick={() => handleChange("adult", 1)} // Increase the number
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children Option */}
                  <div className="flex justify-between items-center py-2">
                    <span className="capitalize text-gray-700">Children</span>
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-black px-3 py-1 bg-gray-200 rounded-md transition-all hover:bg-gray-300 disabled:opacity-50"
                        onClick={() => handleChange("children", -1)} // Decrease the number
                        disabled={options.children <= 0} // Prevent negative values
                      >
                        -
                      </button>
                      <span className="text-gray-600">{options.children}</span>
                      <button
                        className="text-black px-3 py-1 bg-gray-200 rounded-md transition-all hover:bg-gray-300"
                        onClick={() => handleChange("children", 1)} // Increase the number
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Room Option */}
                  <div className="flex justify-between items-center py-2">
                    <span className="capitalize text-gray-700">Room</span>
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-black px-3 py-1 bg-gray-200 rounded-md transition-all hover:bg-gray-300 disabled:opacity-50"
                        onClick={() => handleChange("room", -1)} // Decrease the number
                        disabled={options.room <= 1} // Prevent negative values
                      >
                        -
                      </button>
                      <span className="text-gray-600">{options.room}</span>
                      <button
                        className="text-black px-3 py-1 bg-gray-200 rounded-md transition-all hover:bg-gray-300"
                        onClick={() => handleChange("room", 1)} // Increase the number
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Done Button */}
                  <button
                    className="w-full mt-2 bg-blue-500 text-white py-2 rounded-md transition-all hover:bg-blue-600"
                    onClick={() => setOpenOption(false)} // Close the dropdown
                  >
                    Done
                  </button>
                </div>
              )}

              {/* Search Button */}
              <Link to="/hotels">
              
              <button
                className="flex items-center justify-center bg-blue-600 text-white rounded-full w-56 h-14 hover:bg-blue-700 transition"
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
