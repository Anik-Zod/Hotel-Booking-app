import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useState, useContext } from "react";
import { format, differenceInDays } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../components/SearchItem";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";

const List = () => {
  const { city, dates, options, dispatch } = useContext(SearchContext);

  const [destination, setDestination] = useState(city);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(999);
  const [openDate, setOpenDate] = useState(false);

  const { data, isLoading, isError, refetch, error } = useFetch("list",
    `/hotels?city=${destination}&min=${min}&max=${max}`
  );

  const handleClick = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { city: destination, dates, options },
    });
    refetch();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Header type="list" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Search Sidebar */}
          <div className="col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Search Filters</h2>

            {/* Destination Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Destination</label>
              <input
                type="text"
                placeholder={destination}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Date Picker */}
            <div className="mb-6 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in Date</label>
              <input
                type="text"
                value={
                  dates?.[0]?.startDate && dates?.[0]?.endDate
                    ? `${format(dates[0].startDate, "MMM dd, yyyy")} - ${format(dates[0].endDate, "MMM dd, yyyy")} (${differenceInDays(dates[0].endDate, dates[0].startDate)} nights)`
                    : "Select Dates"
                }
                onClick={() => setOpenDate(!openDate)}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white"
              />
              {openDate && (
                <div className="absolute z-50 mt-2 shadow-lg rounded-xl border bg-white">
                  <DateRange
                    onChange={(item) =>
                      dispatch({ type: "NEW_SEARCH", payload: { ...options, dates: [item.selection] } })
                    }
                    minDate={new Date()}
                    ranges={dates}
                    direction="horizontal"
                    className="rounded-xl"
                  />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range & Guests</label>
              <div className="space-y-4">
                {[{ label: "Min price per night", value: min, setter: setMin },
                  { label: "Max price per night", value: max, setter: setMax },
                ].map(({ label, value, setter }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{label}</span>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setter(Number(e.target.value))}
                      className="w-24 px-3 py-1 border border-gray-300 rounded-md focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                ))}
                {["adult", "children", "room"].map((field) => (
                  <div key={field} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 capitalize">{field}</span>
                    <input
                      type="number"
                      min={field === "children" ? 0 : 1}
                      value={options[field]}
                      onChange={(e) =>
                        dispatch({
                          type: "NEW_SEARCH",
                          payload: { ...options, [field]: Number(e.target.value) },
                        })
                      }
                      className="w-24 px-3 py-1 border border-gray-300 rounded-md focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleClick}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200"
            >
              Search Hotels
            </button>
          </div>

          {/* Results List */}
          <div className="col-span-1 lg:col-span-3 space-y-6">
            {isLoading ? (
              <p className="text-center text-xl font-semibold text-blue-600">Loading...stays...</p>
            ) : isError ? (
              <p className="text-center text-red-500 font-medium">{error.message}</p>
            ) : !data || data.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">No hotels found. Try adjusting your filters!</p>
            ) : (
              data.map((item) => <SearchItem item={item} key={item._id} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
