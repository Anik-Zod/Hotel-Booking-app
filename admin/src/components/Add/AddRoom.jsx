import axios from "axios";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";

export default function AddRoom({ setOpen }) {
  const [info, setInfo] = useState({
    title: "",
    price: "",
    maxPeople: "",
    description: "",
    roomNumbers: [],
    hotelID: "67bb6b924dbdaa83ca069855", // You can change the hotelID as needed
  });
  const [roomNumber, setRoomNumber] = useState("");
  const [unavailableDate, setUnavailableDate] = useState("");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleUnavailableDateChange = (e) => {
    setUnavailableDate(e.target.value);
  };

  const addRoomNumber = () => {
    if (roomNumber) {
      setInfo((prev) => ({
        ...prev,
        roomNumbers: [
          ...prev.roomNumbers,
          { number: roomNumber, unavailableDate: unavailableDate ? [unavailableDate] : [] },
        ],
      }));
      setRoomNumber("");
      setUnavailableDate("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/rooms", info);
      console.log(res);
      alert("Room added successfully!");
      setOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Add New Room</h1>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <MdClose className="text-gray-600 w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
              <input
                required
                onChange={handleChange}
                type="text"
                name="title"
                id="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium text-gray-700">Price</label>
              <input
                required
                onChange={handleChange}
                type="number"
                name="price"
                id="price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="maxPeople" className="text-sm font-medium text-gray-700">Max People</label>
              <input
                required
                onChange={handleChange}
                type="number"
                name="maxPeople"
                id="maxPeople"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                onChange={handleChange}
                name="description"
                id="description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="roomNumber" className="text-sm font-medium text-gray-700">Room Number</label>
              <input
                value={roomNumber}
                onChange={handleRoomNumberChange}
                type="text"
                name="roomNumber"
                id="roomNumber"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="unavailableDate" className="text-sm font-medium text-gray-700">Unavailable Date</label>
              <input
                value={unavailableDate}
                onChange={handleUnavailableDateChange}
                type="date"
                name="unavailableDate"
                id="unavailableDate"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={addRoomNumber}
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Room Number
              </button>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Added Room Numbers</h3>
              <ul>
                {info.roomNumbers.map((room, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    Room {room.number} - Unavailable Dates: {room.unavailableDate.join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
