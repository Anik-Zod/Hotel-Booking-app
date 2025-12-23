import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function User() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useFetch("user", `/users/${id}`);
  console.log("Fetched user data:", data);
  
  const info = [
    { name: "Page A", uv: 4000, pv: 2400 },
    { name: "Page B", uv: 3000, pv: 1398 },
    { name: "Page C", uv: 2000, pv: 9800 },
    { name: "Page D", uv: 2780, pv: 3908 },
    { name: "Page E", uv: 1890, pv: 4800 },
    { name: "Page F", uv: 2390, pv: 3800 },
    { name: "Page G", uv: 3490, pv: 4300 },
  ];

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
      {/* Left Section */}
      <div className="flex-1 min-w-110 bg-white shadow-xl rounded-2xl p-6 lg:p-8 space-y-6 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <img
              src={data?.img}
              alt={data?.username}
              className="w-24 h-24 rounded-full bg-gray-100 object-cover border-4 border-white shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-3">
            <span className="text-2xl lg:text-3xl font-bold text-gray-900">
              {data.username}
            </span>
            <button className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
              Update Info
            </button>
          </div>
        </div>

        <div className="text-gray-700 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong className="text-gray-800">Email:</strong>{" "}
              <span className="text-gray-600">{data.email}</span>
            </p>
            <p>
              <strong className="text-gray-800">Phone:</strong>{" "}
              <span className="text-gray-600">{data.phone}</span>
            </p>
            <p>
              <strong className="text-gray-800">Country:</strong>{" "}
              <span className="text-gray-600">{data.country}</span>
            </p>
            <p>
              <strong className="text-gray-800">City:</strong>{" "}
              <span className="text-gray-600">{data.city}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p>
              <strong className="text-gray-800">Admin:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  data.isAdmin
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {data.isAdmin ? "Yes" : "No"}
              </span>
            </p>
            <p>
              <strong className="text-gray-800">Joined:</strong>{" "}
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

      {/* Right Section */}
      <div className="flex-1 min-w-100 bg-white shadow-xl rounded-2xl p-6 h-auto">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4">
          User Activity
        </h2>
        <div className="w-full h-64 sm:h-72">
          <Line
            data={{
              labels: info.map(item => item.name),
              datasets: [
                {
                  label: 'pv',
                  data: info.map(item => item.pv),
                  borderColor: '#3b82f6',
                  backgroundColor: 'transparent',
                  tension: 0.1,
                },
                {
                  label: 'uv',
                  data: info.map(item => item.uv),
                  borderColor: '#10b981',
                  backgroundColor: 'transparent',
                  tension: 0.1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
                tooltip: {
                  backgroundColor: '#fff',
                  titleColor: '#000',
                  bodyColor: '#000',
                  borderRadius: 8,
                  border: 'none',
                },
              },
              scales: {
                x: {
                  grid: {
                    display: true,
                    color: '#ddd',
                  },
                },
                y: {
                  grid: {
                    display: true,
                    color: '#ddd',
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
