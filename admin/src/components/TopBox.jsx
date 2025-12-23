import React from "react";
import { topDealUsers } from "../Data.jsx";
import { FaCrown, FaStar } from "react-icons/fa";

export default function TopBox() {
  return (
    <div
      className="h-full flex flex-col p-6 rounded-lg
      bg-bg
      border border-primary/30 shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 shrink-0">
        <div
          className="p-3 rounded-2xl
          bg-primary/40
          text-amber-400 shadow-lg"
        >
          <FaCrown className="text-xl" />
        </div>
        <div>
          <h1 className="text-xl font-black text-textColor">Top Deals</h1>
          <p className="text-xs font-bold mt-1 text-primary uppercase tracking-widest">
            Highest spenders this month
          </p>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-1">
        {topDealUsers.map((user, index) => (
          <div
            key={user.id}
            className="group flex items-center justify-between gap-4 p-4 rounded-2xl
            bg-primary/8 hover:bg-white/10
            border border-white/10 hover:border-white/20
            transition-all duration-300 cursor-pointer"
          >
            {/* Left */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Rank */}
              <div className="relative shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center
                  text-xs font-black shadow-md
                  ${
                    index === 0
                      ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-black"
                      : index === 1
                      ? "bg-gradient-to-br from-slate-300 to-slate-400 text-black"
                      : index === 2
                      ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white"
                      : "bg-slate-700 text-white"
                  }`}
                >
                  {index + 1}
                </div>

                {index < 3 && (
                  <FaStar className="absolute -top-1 -right-1 text-yellow-400 text-xs" />
                )}
              </div>

              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={user.img}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover
                  border-2 border-white/20 group-hover:border-white/40 transition"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>

              {/* Info */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-textColor truncate">
                  {user.username}
                </span>
                <span className="text-xs text-textDull truncate">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Amount */}
            <div className="text-right shrink-0">
              <span className="text-lg font-black text-primary">
                ${user.amount.toLocaleString()}
              </span>
              <p className="text-[10px] text-textDull uppercase tracking-widest">
                USD
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-5 border-t border-white/10 shrink-0">
        <button
          className="w-full py-3 rounded-2xl
          bg-white/5 hover:bg-white/10
          border border-white/10 hover:border-white/20
          text-sm font-bold text-primary
          transition-all hover:shadow-lg hover:shadow-primary/10"
        >
          View All Customers
        </button>
      </div>
    </div>
  );
}
