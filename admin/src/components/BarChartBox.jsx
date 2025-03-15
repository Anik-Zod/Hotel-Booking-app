import { BarChart, Bar, ResponsiveContainer, Tooltip } from "recharts";

export default function BarChartBox({ data }) {
  return (
    <div className="bg-white p-4 rounded-2xl w-full">
      <h1 className="text-lg font-semibold text-gray-700">{data.title}</h1>

      {/* Chart Container */}
      <div className="mt-2">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={data.chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", color: "white", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "transparent" }}
            />
            <Bar dataKey={data.dataKey} fill={data.color} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
