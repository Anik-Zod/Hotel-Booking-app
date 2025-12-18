import Navbar from "../components/Navbar";
import { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import Card from "../components/HorizontalCard";
import SidebarFilter from "../components/filter/SidebarFilter";
import { Home, X } from "lucide-react";

const List = () => {
  const { city, dates, options, dispatch } = useContext(SearchContext);

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // console.log("data =", data);

  const handleType = (e) => {
    const value = e.target.value;

    setSelectedTypes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleCities = (e) => {
    const value = e.target.value;

    setSelectedCities((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  const url = `/hotels?cities=${selectedCities.join(
    ","
  )}&types=${selectedTypes.join(",")}&min=${priceRange.min || 0}&max=${
    priceRange.max || 999
  }`;

  const { data, isLoading, isError, error } = useFetch("list", url);
  return (
    <div className="bg-gray-50 min-h-screen h-screen ">

      <div className="lg:mx-20 border-b border-gray-300  py-6 flex justify-between">
        <div className="flex gap-3 items-center text-[26px] font-semibold">
          <Home/> <p>{data?.totalCount} - Hotels Available</p>
        </div>
        <div className="flex gap-4">
          {selectedTypes.length > 0 && <div onClick={()=>setSelectedTypes([])} className="cursor-pointer flex gap-2 items-center bg-[#FFB700] text-white px-3 rounded-full "> <span className="rounded-full"><X/></span> Clear Type Filter</div>}
          {selectedCities.length > 0 && <div onClick={()=>setSelectedCities([])} className="cursor-pointer flex gap-2 items-center bg-[#FFB700] text-white px-3 rounded-full "> <span className="rounded-full"><X/></span> Clear Type Filter</div>}
        </div>
      </div>

      <div className="flex gap-4  lg:px-20 mt-8">
        {/* Search Sidebar */}
        <div className="sticky top-56 mx-auto ">
          <SidebarFilter
            handleCities={handleCities}
            handleType={handleType}
            selectedCities={selectedCities}
            selectedTypes={selectedTypes}
            setPriceRange={setPriceRange}
            priceRange={priceRange}
          />
        </div>
        {/* Results List */}
        <div className=" cursor-pointer  overflow-y-auto h-screen w-full no-scrollbar">
          {isLoading ? (
            <p className="text-center text-xl font-semibold text-[#003B95]">
              Loading...stays...
            </p>
          ) : isError ? (
            <p className="text-center text-red-500 font-medium">
              {error.message}
            </p>
          ) : !data || data.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No hotels found. Try adjusting your filters!
            </p>
          ) : (
            <div className="space-y-3">
              {data.hotels.map((item) => (
                <Card item={item} key={item._id} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default List;
