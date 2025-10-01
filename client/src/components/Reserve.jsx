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
    if (!roomNumber.unavailableDate || roomNumber.unavailableDate.length === 0) {
      return true;
    }

    return !roomNumber.unavailableDate.some((unavailable) => {
      const unavailableTimestamp = new Date(unavailable).getTime();

      console.log("Checking against unavailable date:", unavailableTimestamp);

      return alldates.some((selectedDate) => selectedDate === unavailableTimestamp);
    });
  };

  const handleClick = async () => {
    try {
      // Run all room updates concurrently
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const res = await axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, { dates: alldates });
          return res.data;
        })
      );
      setOpen(false); // Close modal after all updates are done
      alert("Rooms updated successfully!");
    } catch (error) {
      console.error("Error updating room availability:", error);
      alert("An error occurred while updating room availability. Please try again.");
    }
  };

  const { data, isLoading, error, isError } = useFetch("-",`/hotels/rooms/${hotelId}`);

  if (isLoading) return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen text-red-500 font-semibold">Error loading rooms</div>;

  // Filter out invalid data (e.g., null or empty rooms)
  const filteredData = data.filter(item => item !== null);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg md:max-w-2xl">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <span className="text-2xl font-bold">Select Your Rooms</span>
          <MdClose
            className="cursor-pointer text-3xl text-gray-600 hover:text-gray-800 transition"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {filteredData.map((item) => (
            item && (
              <div key={item._id} className="border p-4 rounded-lg shadow-xs">
                <div className="text-lg font-semibold">{item.title}</div>
                <p className="text-gray-500 text-sm mb-2">{item.desc}</p>
                <div className="text-sm">Max People: <b>{item.maxPeople}</b></div>
                <div className="text-sm mb-2">Price: <b>${item.price}</b></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {item.roomNumbers.map((roomNumber) => (
                    <label
                      key={roomNumber._id}
                      className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                    >
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        disabled={!isAvailable(roomNumber)}
                        onChange={handleSelect}
                        className="w-5 h-5 accent-[#003B95]"
                      />
                      <span className="text-sm font-medium">Room {roomNumber.number}</span>
                    </label>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
        <button
          onClick={handleClick}
          className="w-full bg-[#003B95] text-white py-3 rounded-lg mt-4 text-lg font-semibold hover:bg-blue-700 transition"
        >
          Reserve Now
        </button>
      </div>
    </div>
  );
}
