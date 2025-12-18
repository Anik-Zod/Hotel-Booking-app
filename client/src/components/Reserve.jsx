import { MdClose } from "react-icons/md";
import useFetch from "../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import axios from "axios";

export default function Reserve({ setOpen, hotelId }) {
  const { dates } = useContext(SearchContext);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleSelect = (e) => {
    const { checked, value } = e.target;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];
    while (date <= end) {
      list.push(date.getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    if (
      !roomNumber.unavailableDate ||
      roomNumber.unavailableDate.length === 0
    ) {
      return true;
    }

    return !roomNumber.unavailableDate.some((unavailable) => {
      const unavailableTimestamp = new Date(unavailable).getTime();

      console.log("Checking against unavailable date:", unavailableTimestamp);

      return alldates.some(
        (selectedDate) => selectedDate === unavailableTimestamp
      );
    });
  };

  const handleClick = async () => {
    try {
      // Run all room updates concurrently
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const res = await axios.put(
            `http://localhost:8800/api/rooms/availability/${roomId}`,
            { dates: alldates }
          );
          return res.data;
        })
      );
      setOpen(false); // Close modal after all updates are done
      alert("Rooms updated successfully!");
    } catch (error) {
      console.error("Error updating room availability:", error);
      alert(
        "An error occurred while updating room availability. Please try again."
      );
    }
  };

  const { data, isLoading, error, isError } = useFetch(
    "-",
    `/hotels/rooms/${hotelId}`
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        Error loading rooms
      </div>
    );

  // Filter out invalid data (e.g., null or empty rooms)
  const filteredData = data.filter((item) => item !== null);

  return (
    <div className="backdrop-blur-sm rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] w-full overflow-hidden border border-gray-100 ">
      {/* Sticky Header with Backdrop Blur */}
      <div className=" px-8 py-6 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
            Select Rooms
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
              Available for your dates
            </p>
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 active:scale-90"
        >
          <MdClose className="text-xl" />
        </button>
      </div>

      {/* Content Area */}
      <div className="px-8 py-2 max-h-[60vh] overflow-y-auto scroll-smooth custom-scrollbar">
        <div className="divide-y divide-gray-100">
          {filteredData.map(
            (item) =>
              item && (
                <div key={item._id} className="py-8 first:pt-4 last:pb-4 group">
                  {/* Room Info */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold text-slate-800 group-hover:text-[#003B95] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                        {item.desc}
                      </p>
                      <div className="flex gap-3 pt-1">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                          <span className="text-xs font-bold text-slate-600 tracking-tight">
                            👤 {item.maxPeople} Guests
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Price
                      </div>
                      <div className="flex items-baseline justify-end gap-0.5">
                        <span className="text-2xl font-black text-[#003B95] tracking-tighter">
                          ${item.price}
                        </span>
                        <span className="text-sm font-bold text-slate-400">
                          /nt
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Room Selection Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {item.roomNumbers.map((roomNumber) => {
                      const available = isAvailable(roomNumber);
                      return (
                        <label
                          key={roomNumber._id}
                          className="relative group/chip"
                        >
                          <input
                            type="checkbox"
                            value={roomNumber._id}
                            disabled={!available}
                            onChange={handleSelect}
                            className="sr-only peer"
                          />
                          <div
                            className={`
                      h-full flex flex-col items-center justify-center py-4 px-3 rounded-2xl border-2 transition-all duration-300
                      ${
                        available
                          ? "border-slate-300 bg-white cursor-pointer hover:border-blue-200 peer-checked:border-[#003B95] peer-checked:bg-blue-50/50 peer-checked:ring-4 peer-checked:ring-blue-100"
                          : "border-transparent bg-slate-50 opacity-40 cursor-not-allowed"
                      }
                    `}
                          >
                            <span
                              className={`text-lg font-black transition-colors ${
                                available
                                  ? "text-slate-700 peer-checked:text-[#003B95]"
                                  : "text-slate-400"
                              }`}
                            >
                              {roomNumber.number}
                            </span>
                            <span
                              className={`text-[9px] font-black uppercase tracking-widest mt-1 ${
                                available
                                  ? "text-slate-400 peer-checked:text-[#003B95]"
                                  : "text-slate-300"
                              }`}
                            >
                              {available ? "Select" : "Booked"}
                            </span>

                            {/* Checkmark Icon that appears on check */}
                            <div className="absolute -top-1 -right-1 opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-300">
                              <div className="bg-[#003B95] text-white rounded-full p-1 shadow-lg">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={4}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* Perfected Footer */}
      <div className="p-8 bg-slate-50/50 border-t border-gray-100">
        <button
          onClick={handleClick}
          className="w-full relative group h-16 bg-[#30394d] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(0,59,149,0.35)] active:scale-[0.98]"
        >
          <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <span className="relative text-white font-black text-lg tracking-tight">
            Confirm & Reserve
          </span>
        </button>

        <div className="flex justify-center gap-8 mt-6">
          {["No Prepayment", "Instant Booking", "Secure SSL"].map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#003B95]"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
