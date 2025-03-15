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

  const { data, loading, error, reFetch } = useFetch(
    `/api/hotels?city=${destination}&min=${min}&max=${max}`
  );
  if (loading) return <p> Please Wait... </p>;
  if (error) return <p>{error.message}</p>;

  const handleClick = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        city: destination,
        dates: dates,
        options: options,
      },
    });

    // Fetch the data
    reFetch();
  };

  console.log(destination,dates,options);
  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/4 p-4 bg-white border border-gray-300 rounded-lg shadow-md mb-4 lg:mb-0">
            <h1 className="text-2xl font-bold mb-4">Search</h1>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Destination
              </label>
              <input
                placeholder={destination}
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-sm font-semibold mb-2">
                Check-in Date
              </label>
              <input
                type="text"
                value={
                  dates && dates[0].startDate && dates[0].endDate
                    ? `${format(dates[0].startDate, "MMM dd, yyyy")} - ${format(
                        dates[0].endDate,
                        "MMM dd, yyyy"
                      )} (${differenceInDays(
                        dates[0].endDate,
                        dates[0].startDate
                      )} nights)`
                    : "Select Dates"
                }
                className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
                onClick={() => setOpenDate(!openDate)}
                readOnly
              />
              {openDate && (
                <div className="absolute left-0 mt-2 bg-white rounded-md shadow-md p-3 z-50 border border-gray-200">
                  <DateRange
                    onChange={(item) => dispatch({ type: "NEW_SEARCH", payload: { ...options, dates: [item.selection] } })}
                    minDate={new Date()}
                    ranges={dates}
                    className="rounded-md"
                    direction="horizontal"
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Options</label>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Min price per night</span>
                  <input
                    onChange={(e) => setMin(e.target.value)}
                    type="number"
                    className="w-20 p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Max price per night</span>
                  <input
                    onChange={(e) => setMax(e.target.value)}
                    type="number"
                    className="w-20 p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="w-20 p-2 border border-gray-300 rounded-lg"
                    value={options.adult}
                    onChange={(e) =>
                      dispatch({ type: "NEW_SEARCH", payload: { ...options, adult: Number(e.target.value) } })
                    }
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="w-20 p-2 border border-gray-300 rounded-lg"
                    value={options.children}
                    onChange={(e) =>
                      dispatch({
                        type: "NEW_SEARCH",
                        payload: { ...options, children: Number(e.target.value) },
                      })
                    }
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="w-20 p-2 border border-gray-300 rounded-lg"
                    value={options.room}
                    onChange={(e) =>
                      dispatch({ type: "NEW_SEARCH", payload: { ...options, room: Number(e.target.value) } })
                    }
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleClick}
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>
          <div className="lg:w-3/4 p-4 space-y-4 overflow-y-auto">
            {data.map((item) => (
              <SearchItem item={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
