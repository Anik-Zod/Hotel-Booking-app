import { useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";

const AddHotel = ({ setOpen }) => {
  const [hotelInfo, setHotelInfo] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    photos: [],
    title: "",
    desc: "",
    rating: "",
    rooms: [],
    cheapestPrice: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHotelInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/hotels", hotelInfo);
      console.log(res);
      alert("Hotel added successfully!");
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
<div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-xl">
    <div className="flex justify-between">

    <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Hotel</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                <MdClose className="text-gray-600 w-6 h-6" />
              </button>
                  </div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <div className="flex gap-3">
        <input
        type="text"
        name="name"
        placeholder="Hotel Name"
        onChange={handleChange}
        className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        required
      />
      <input
        type="text"
        name="type"
        placeholder="Type (e.g., Hotel)"
        onChange={handleChange}
        className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChange}
        className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        required
      />

    </div>
      
      <input
        type="text"
        name="address"
        placeholder="Address"
        onChange={handleChange}
        className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        required
      />
      <input
        type="text"
        name="distance"
        placeholder="Distance from center"
        onChange={handleChange}
        className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        required
      />
      <textarea
        name="desc"
        placeholder="Description"
        onChange={handleChange}
        className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        rows="4"
        required
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        onChange={handleChange}
        className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        required
      />
      <input
        type="number"
        name="cheapestPrice"
        placeholder="Cheapest Price"
        onChange={handleChange}
        className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        required
      />
      <label className="flex items-center text-gray-700">
        <input
          type="checkbox"
          name="featured"
          onChange={handleChange}
          className="w-5 h-5 border border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="ml-2">Featured</span>
      </label>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Hotel
      </button>
    </form>
  </div>
</div>
  );
};

export default AddHotel;
