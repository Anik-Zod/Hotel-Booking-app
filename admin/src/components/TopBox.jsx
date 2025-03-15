import React from "react";
import { topDealUsers } from "../Data.jsx";

export default function TopBox() {
  return (
    <div >
      <h1>Top Deals</h1>
      
      {topDealUsers.map((user) => (
          <div
            className="text-sm flex items-center justify-between py-3  border-b border-gray-300"
            key={user.id}
          >
            {/* User Info */}
            <div className="flex items-center space-x-4">
              {/* User Image */}
              <img
                src={user.img}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />

              {/* User Details */}
              <div className="flex flex-col">
                <span className="text-gray-800 font-medium">{user.username}</span>
                <span className="text-gray-400 text-sm">{user.email}</span>
              </div>
            </div>

            {/* Amount */}
            <span className="text-green-600 font-semibold">${user.amount}</span>
          </div>
        ))}
    </div>
  );
}
