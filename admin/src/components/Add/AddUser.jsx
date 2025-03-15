import axios from "axios";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";


export default function AddUser({ setOpen }) {
  const [info, setInfo] = useState({});


  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(info);
    try {
     const res = await axios.post("/api/auth/register", info)
     console.log(res)
      alert("User created successfully!");
      setOpen(!open);
    } catch (error) {
      console.log(error.message)
    }
  };


  return (
    <div className="fixed inset-0 bg-black/30  backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Add New User</h1>
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
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                required
                onChange={handleChange}
                type="text"
                name="username"
                id="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="img" className="text-sm font-medium text-gray-700">
                Image Link
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="img"
                id="img"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                required
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                required
                onChange={handleChange}
                type="text"
                name="country"
                id="country"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium text-gray-700">
                City
              </label>
              <input
                required
                onChange={handleChange}
                type="text"
                name="city"
                id="city"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                required
                onChange={handleChange}
                type="text"
                name="phone"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                required
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2 flex items-center">
              <input
                type="checkbox"
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, [e.target.name]: e.target.checked }))
                }
                name="isAdmin"
                id="isAdmin"
                className="w-5 h-5 border border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isAdmin" className="ml-2 text-sm font-medium text-gray-700">
                Sign as Admin
              </label>
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

