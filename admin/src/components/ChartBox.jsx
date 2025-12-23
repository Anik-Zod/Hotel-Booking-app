import { Link } from "react-router-dom";
import { FaUsers, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

export default function ChartBox({ data }) {
  const isPositive = data.percentage >= 0;

  const accent = isPositive ? "#22c55e" : "#f43f5e";
  const glowBg = isPositive
    ? "bg-emerald-500/15"
    : "bg-rose-500/15";

  const chartData = {
    labels: data.chartData.map((item) => item.name),
    datasets: [
      {
        data: data.chartData.map((item) => item[data.dataKey]),
        borderColor: accent,
        backgroundColor: `${accent}33`,
        fill: true,
        tension: 0.45,
        borderWidth: 2,
        pointRadius: 1.5,
      },
    ],
  };

  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between  w-full  p-3 sm:p-4 rounded-2xl
      bg-bg
      border border-primary/30 shadow-xl
      hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 "
    >
      {/* Left */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-slate-400">
          <div
            className={`w-7 h-7 flex items-center justify-center rounded-lg ${glowBg}`}
          >
            <FaUsers size={12} className="text-white" />
          </div>
          <span className="text-textColor text-[10px] font-bold uppercase tracking-widest">
            {data.title}
          </span>
        </div>

        <div className="flex items-end gap-2">
          <h2 className="text-xl font-black text-textColor leading-none">
            {data.number}
          </h2>

          <span
            className={`flex items-center gap-0.5 text-[10px] font-bold
            ${isPositive ? "text-emerald-400" : "text-rose-400"}`}
          >
            {isPositive ? (
              <FaArrowUp size={9} />
            ) : (
              <FaArrowDown size={9} />
            )}
            {Math.abs(data.percentage)}%
          </span>
        </div>

        <Link
          to="/"
          className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-indigo-500/40"
        >
          View details
        </Link>
      </div>

      {/* Right – Sparkline */}
      <div className="h-12 w-full sm:w-24 mt-3 sm:mt-0">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { display: false },
              y: { display: false },
            },
          }}
        />
      </div>
    </div>
  );
}
