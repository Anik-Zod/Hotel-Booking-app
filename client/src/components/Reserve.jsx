import {
  MdClose,
  MdPeopleOutline,
  MdVerifiedUser,
  MdFlashOn,
  MdCreditCardOff,
} from "react-icons/md";

import useFetch from "../hooks/useFetch";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import CheckoutPage from "./stripe/CheckoutPage";
import { useClickOutside } from "../hooks/useClickOutside";
import { CheckCheck } from "lucide-react";
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
    if (selectedDates.length < 1) return;
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

  // Filter out invalid data (e.g., null or empty rooms)
  const filteredData = data.filter((item) => item !== null);

  return (
    <div className="w-full">
      <div className="backdrop-blur-xl bg-white/90 rounded-[32px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.3)] mx-auto w-[414px] overflow-x-clip border border-white/50 ring-1 ring-black/5">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 px-8 py-6 bg-white/60 backdrop-blur-xl border-b border-gray-100/80 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Available Rooms
            </h2>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
                Live Availability
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2.5 rounded-2xl bg-slate-100/50 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-300 active:scale-90"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        {/* Content Area */}
        <div className="px-8 max-h-[60vh] overflow-y-auto scroll-smooth custom-scrollbar bg-gradient-to-b from-white to-slate-50/30">
          <div className="divide-y divide-gray-100">
            {filteredData.map(
              (item) =>
                item && (
                  <div
                    key={item._id}
                    className="py-8 first:pt-6 last:pb-8 group"
                  >
                    {/* Room Info */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-2.5">
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm line-clamp-2">
                          {item.desc}
                        </p>
                        <div className="flex gap-2 pt-1">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#003B95] rounded-full text-[11px] font-bold uppercase tracking-wider border border-blue-100">
                            <MdPeopleOutline className="text-sm" />{" "}
                            {item.maxPeople} Guests
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          Nightly
                        </p>
                        <div className="flex items-baseline justify-end">
                          <span className="text-2xl font-black text-slate-900 tracking-tighter">
                            ${item.price}
                          </span>
                          <span className="text-sm font-bold text-slate-400 ml-1">
                            /nt
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Room Selection Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {item.roomNumbers.map((roomNumber) => {
                        const available = isAvailable(roomNumber);
                        return (
                          <label
                            key={roomNumber._id}
                            className="relative cursor-pointer group/chip"
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
                        h-14 flex flex-col items-center justify-center rounded-2xl border-2 transition-all duration-300
                        ${
                          available
                            ? "border-slate-200 bg-white hover:border-blue-300 peer-checked:border-[#003B95] peer-checked:bg-blue-50 peer-checked:ring-4 peer-checked:ring-blue-100/50"
                            : " border-red-200 bg-red-200 opacity-40 cursor-not-allowed"
                        }
                      `}
                            >
                              <span
                                className={`text-sm font-black ${
                                  available
                                    ? "text-slate-700 peer-checked:text-[#003B95]"
                                    : "text-slate-400"
                                }`}
                              >
                                {roomNumber.number}
                              </span>
                              {available && (
                                <span className="text-[8px] font-bold uppercase text-slate-400 peer-checked:text-[#003B95]">
                                  Select
                                </span>
                              )}
                            </div>

                            {/* Selection Checkmark */}
                            <div className="absolute -top-1.5 -right-1.5 opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-300 z-10">
                              <div className="bg-[#0cd849] text-white rounded-full p-1 shadow-md">
                                <svg
                                  className="w-2.5 h-2.5"
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
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-slate-50/80 border-t border-gray-100 backdrop-blur-md">
          <button
            onClick={handleClick}
            className="w-full relative group h-16 bg-[#242C3E] hover:bg-[#FE9A00] text-white rounded-2xl overflow-hidden transition-all duration-500 shadow-xl shadow-blue-900/10 active:scale-[0.98]"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[30deg] -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
            <span className="relative font-black text-lg tracking-tight">
              Reserve Selected Rooms
            </span>
          </button>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-6">
            {[
              { label: "No Prepayment", icon: <MdCreditCardOff /> },
              { label: "Instant Booking", icon: <MdFlashOn /> },
              { label: "Secure SSL", icon: <MdVerifiedUser /> },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-1.5">
                <span className="text-[#003B95] text-sm">{f.icon}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes shimmer {
            100% {
              transform: translateX(200%) skewX(-30deg);
            }
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 10px;
          }
        `}</style>
      </div>
    </div>
  );
}
