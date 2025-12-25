import { MdClose } from "react-icons/md";
import useFetch from "../hooks/useFetch";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutPage from "./stripe/CheckoutPage";
import { useClickOutside } from "../hooks/useClickOutside";
import { toast } from "react-toastify";

export default function Reserve({ setOpen, hotelId, TotalPrice }) {
  const { selectedDates } = useSelector((state) => state.search);
  const { user } = useSelector((state) => state.auth);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false);

  const handleSelect = (e) => {
    const { checked, value } = e.target;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const navigate = useNavigate();
  const checkoutRef = useRef(null);

  useClickOutside(checkoutRef, () => setOpenCheckout(false));

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

  const alldates = selectedDates[0]
    ? getDatesInRange(selectedDates[0].startDate, selectedDates[0].endDate)
    : [];

  const isAvailable = (roomNumber) => {
    if (
      !roomNumber.unavailableDate ||
      roomNumber.unavailableDate.length === 0
    ) {
      return true;
    }

    const isUnavailable = roomNumber.unavailableDate.some((unavailable) => {
      const unavailableDate = new Date(unavailable).toDateString();
      return alldates.some((selectedDate) => {
        const selectedDateString = new Date(selectedDate).toDateString();
        return selectedDateString === unavailableDate;
      });
    });

    return !isUnavailable;
  };

  const handleClick = async () => {
    if (selectedDates.length < 1) {
      toast.error("select dates");
      return;
    }
    if (selectedRooms.length < 1) {
      toast.error("select rooms");
      return;
    }
    setOpenCheckout(true);
  };

  const { data, isLoading, error, isError } = useFetch(
    hotelId,
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

  const filteredData = data.filter((item) => item !== null);

  return (
    <div className="backdrop-blur-sm bg-white rounded-2xl shadow-lg w-full max-w-[400px] mx-auto overflow-hidden border border-gray-100">
      <div className="px-4 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Available Rooms
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
              Available for your dates
            </p>
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
        >
          <MdClose className="text-lg" />
        </button>
      </div>

      <div className="px-4 py-3 max-h-[40vh] overflow-y-auto">
        <div className="space-y-4">
          {filteredData.map(
            (item) =>
              item && (
                <div key={item._id} className="py-3 group">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-800">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-xs">
                        👤 {item.maxPeople} Guests
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#003B95]">
                        ${item.price}
                      </span>
                      <span className="text-xs text-slate-400">/night</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {item.roomNumbers.map((roomNumber) => {
                      const available = isAvailable(roomNumber);
                      return (
                        <label key={roomNumber._id} className="relative">
                          <input
                            type="checkbox"
                            value={roomNumber._id}
                            disabled={!available}
                            onChange={handleSelect}
                            className="sr-only peer"
                          />
                          <div
                            className={`
                      flex flex-col items-center justify-center py-2 px-1 rounded-lg border transition-all
                      ${
                        available
                          ? "border-slate-300 bg-white cursor-pointer hover:border-blue-200 peer-checked:border-[#003B95] peer-checked:bg-blue-50"
                          : "border-red-200 bg-red-50 cursor-not-allowed opacity-60"
                      }
                    `}
                          >
                            <span
                              className={`text-sm font-bold ${
                                available
                                  ? "text-slate-700 peer-checked:text-[#003B95]"
                                  : "text-red-500"
                              }`}
                            >
                              {roomNumber.number || "N/A"}
                            </span>
                            <span
                              className={`text-[8px] font-bold uppercase ${
                                available
                                  ? "text-slate-400 peer-checked:text-[#003B95]"
                                  : "text-red-400"
                              }`}
                            >
                              {available ? "Select" : "Full"}
                            </span>
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

      <div className="p-4 bg-slate-50/50 border-t">
        <button
          onClick={handleClick}
          className="w-full bg-[#003B95] text-white py-3 rounded-xl font-bold hover:bg-[#002a6b] transition-colors"
        >
          Confirm & Reserve
        </button>
      </div>

      {openCheckout && (
        <div
          ref={checkoutRef}
          className="fixed inset-0 overflow-y-auto bg-white z-50"
        >
          <CheckoutPage
            amount={Math.round(TotalPrice * 100)}
            items={selectedRooms}
            dates={alldates}
            selectedRooms={selectedRooms}
          />
        </div>
      )}
    </div>
  );
}