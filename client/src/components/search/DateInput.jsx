import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newSearch } from "../../store/searchSlice";
import { DateRange } from "react-date-range";
import { FaCalendarDay } from "react-icons/fa";
import { format } from "date-fns";
import { useClickOutside } from "../../hooks/useClickOutside";
import { twMerge } from "tailwind-merge";

function DateInput({ className }) {
  const { selectedDates } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [openDate, setOpenDate] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => setOpenDate(false));

  const handleRangeChange = (item) => {
    const newDates = [item.selection];
    dispatch(newSearch({ selectedDates: newDates }));
  };

  // Make sure we have a valid range to display
  const range = selectedDates?.[0];
  const displayText = range
    ? `${format(range.startDate, "MMM d")} - ${format(range.endDate, "MMM d")}`
    : "Select dates";

  return (
    <div
      ref={ref}
      className="flex items-center border border-gray-300 rounded-lg px-3 py-3 w-full cursor-pointer"
      onClick={() => setOpenDate(!openDate)}
    >
      <FaCalendarDay className="text-gray-500 mr-2" />
      <span className="text-sm text-gray-600">{displayText}</span>

      {openDate && (
        <div className={twMerge("bg-white shadow-lg p-4 rounded-lg", className)}>
          <DateRange
            editableDateInputs={true}
            onChange={handleRangeChange}
            moveRangeOnFirstSelection={false}
            ranges={selectedDates}
            minDate={new Date()}
            rangeColors="#262E40"
          />
        </div>
      )}
    </div>
  );
}

export default DateInput;
