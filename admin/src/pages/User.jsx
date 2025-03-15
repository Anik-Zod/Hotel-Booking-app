import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

export default function User() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/api/users/${id}`);

  // Dummy data for the chart
  const info = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  // Handle loading and error states
  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex gap-6 p-6">
      {/* Left Section (User Info) */}
      <div className="flex-1 bg-white shadow-2xl rounded-2xl p-8 space-y-6 transform transition-all hover:shadow-3xl">
        {/* User Profile Section */}
        <div className="flex items-center gap-6">
          {/* User Avatar */}
          <div className="relative">
            <img
              src={data.img}
              alt={data.username}
              className="w-20 h-20 rounded-full bg-gray-100 object-cover border-4 border-white shadow-md"
            />
            {/* Online Status Indicator (Optional) */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          {/* Username and Update Button */}
          <div className="flex flex-col space-y-2">
            <span className="text-3xl font-bold text-gray-900">{data.username}</span>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
              Update Info
            </button>
          </div>
        </div>

        {/* User Details Section */}
        <div className="text-gray-700 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <p className="flex items-center space-x-2">
              <strong className="text-gray-800">Email:</strong>
              <span className="text-gray-600">{data.email}</span>
            </p>
            <p className="flex items-center space-x-2">
              <strong className="text-gray-800">Phone:</strong>
              <span className="text-gray-600">{data.phone}</span>
            </p>
            <p className="flex items-center space-x-2">
              <strong className="text-gray-800">Country:</strong>
              <span className="text-gray-600">{data.country}</span>
            </p>
            <p className="flex items-center space-x-2">
              <strong className="text-gray-800">City:</strong>
              <span className="text-gray-600">{data.city}</span>
            </p>
          </div>

          {/* Admin Status and Join Date */}
          <div className="flex items-center space-x-4">
            <p className="flex items-center space-x-2">
              <strong className="text-gray-800">Admin:</strong>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  data.isAdmin ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {data.isAdmin ? "Yes" : "No"}
              </span>
            </p>
            <p className="flex items-center space-x-2">
              <strong className="text-gray-800">Joined:</strong>
              <span className="text-gray-600">
                {new Date(data.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section (Statistics) */}
      <div className="flex-1 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">User Activity (Stats)</h2>
        <p className="text-gray-500 mb-4">
          This section will display relevant activity statistics in the future.
        </p>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={info}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "none",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="uv"
                stroke="#82ca9d"
                strokeDasharray="3 4 5 2"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}