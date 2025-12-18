import { useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { FaCalendarDay } from "react-icons/fa";
import { format } from "date-fns";
import { useClickOutside } from "../../hooks/useClickOutside";
import { twMerge } from "tailwind-merge";

function DateInput({setDates,dates,className}) {
    const [openDate, setOpenDate] = useState(false);
    const ref = useRef(null)
    useClickOutside(ref,()=>setOpenDate(false))
  return (
    <div
      ref={ref}
      className="flex items-center border border-gray-300 rounded-lg px-3 py-3 w-full cursor-pointer "
      onClick={() => setOpenDate(!openDate)}
    >
      <FaCalendarDay className="text-gray-500 mr-2" />
      <span className="text-sm text-gray-600">
        {`${format(dates[0].startDate, "MMM d")} - ${format(
          dates[0].endDate,
          "MMM d"
        )}`}
      </span>

      {openDate && (
        <div className={twMerge(" bg-white shadow-lg p-4 rounded-lg",className)}>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            minDate={new Date()}
            rangeColors="#262E40"
            color="#262E40"
          />
        </div>
      )}
    </div>
  );
}

export default DateInput;
