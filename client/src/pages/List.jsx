import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../hooks/useFetch";
import Card from "../components/HorizontalCard";
import SidebarFilter from "../components/filter/SidebarFilter";
import { Home, X, Filter } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const List = () => {
  const { city, selectedDates, options } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="bg-gray-50  px-3 lg:px-0">
      <div className="lg:mx-20 px-4 py-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 gap-4">
        {/* Left: Results Count */}
        <div className="flex gap-4 items-center group">
          <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform duration-300">
            <Home size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              {data?.totalCount || 0}
              <span className="text-slate-400 font-light ml-2">Properties</span>
            </h1>
            <p className="hidden sm:block text-[11px] font-bold text-indigo-600 uppercase tracking-[0.2em] mt-0.5">
              Available in your region
            </p>
          </div>
        </div>

        {/* Right: Actions & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-white border-2 border-slate-900 text-slate-900 px-5 py-2 rounded-xl font-bold text-sm hover:bg-slate-900 hover:text-white transition-all active:scale-95"
          >
            <Filter size={18} />
            Sort & Filter
          </button>

          {/* Clear Filter Chips */}
          <div className="flex gap-2">
            {selectedTypes.length > 0 && (
              <button
                onClick={() => setSelectedTypes([])}
                className="flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200/60 px-4 py-2 rounded-full text-xs font-bold hover:bg-amber-100 transition-colors"
              >
                <X size={14} strokeWidth={3} />
                Clear Types
              </button>
            )}

            {selectedCities.length > 0 && (
              <button
                onClick={() => setSelectedCities([])}
                className="flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200/60 px-4 py-2 rounded-full text-xs font-bold hover:bg-amber-100 transition-colors"
              >
                <X size={14} strokeWidth={3} />
                Clear Cities
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 lg:px-20">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block sticky top-56 mx-auto">
          <SidebarFilter
            handleCities={handleCities}
            handleType={handleType}
            selectedCities={selectedCities}
            selectedTypes={selectedTypes}
            setPriceRange={setPriceRange}
            priceRange={priceRange}
            setSelectedCities={setSelectedCities}
            setSelectedTypes={setSelectedTypes}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 backdrop-blur-sm bg-opacity-50"
                onClick={() => setIsSidebarOpen(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed bottom-0 left-0 right-0 h-max bg-white shadow-lg rounded-t-xl overflow-y-auto max-h-[80vh]"
              >
                <div className="p-0">
                  <SidebarFilter
                    handleCities={handleCities}
                    handleType={handleType}
                    selectedCities={selectedCities}
                    selectedTypes={selectedTypes}
                    setPriceRange={setPriceRange}
                    priceRange={priceRange}
                    setSelectedCities={setSelectedCities}
                    setSelectedTypes={setSelectedTypes}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Results List */}
        <div className=" cursor-pointer  overflow-y-auto h-[730px] w-full no-scrollbar">
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
    </div>
  );
};

export default List;
