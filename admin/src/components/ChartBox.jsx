import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

export default function ChartBox({ data }) {
  return (
    <div className="flex items-center justify-between p-4  rounded-2xl">
      {/* Left Section */}
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <FaUsers className="h-10 w-9 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">{data.title}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{data.number}</h1>
        <Link
          to="/"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
          style={{ color: data.color }}
        >
          View all
        </Link>
      </div>
      <div className="flex flex-col flex-2 items-end gap-2 w-[120px]">
        <div className="h-[80px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={data.dataKey}
                stroke={data.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="text-right">
          <span
            className="text-lg font-semibold"
            style={{ color: data.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {data.percentage}%
          </span>
          <p className="text-sm text-gray-500">this month</p>
        </div>
      </div>
    </div>
  );
}
