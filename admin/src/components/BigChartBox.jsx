import { useEffect, useRef, useState } from "react";
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
  Filler,
} from "chart.js";
import { FaChartLine, FaArrowUp, FaEllipsisH } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BigChartBox = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue("--color-primary").trim();
    const primaryRGB = styles.getPropertyValue("--color-primary-rgb")?.trim();
    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
    gradient.addColorStop(0, "rgba(99,102,241,0.45)");
    gradient.addColorStop(1, "rgba(99,102,241,0)");

    setChartData({
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Revenue",
          data: [4000, 3000, 5000, 2780, 1890, 2390, 3490],
          borderColor: primary,
          backgroundColor: `${primary}30`,
          fill: true,
          tension: 0.45,
          borderWidth: 3,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderWidth: 3,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#020617",
        titleColor: "#fff",
        bodyColor: "#c7d2fe",
        padding: 14,
        borderColor: "#1e293b",
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#94a3b8",
          font: { size: 11, weight: "bold" },
        },
      },
      y: {
        border: { display: false },
        grid: { color: "rgba(255,255,255,0.06)" },
        ticks: {
          color: "#94a3b8",
          font: { size: 11 },
          callback: (v) => `$${v / 1000}k`,
        },
      },
    },
  };

  return (
    <div
      className="flex flex-col h-full w-full rounded-lg p-6 md:pt-8
      bg-bg
      border border-primary/30 shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <div
            className=" p-3 flex items-center justify-center rounded-2xl
            bg-primary/40 text-textColor shadow-lg"
          >
            <FaChartLine size={25} />
          </div>
          <div>
            <h3 className="font-black text-textColor text-xl leading-tight">
              Revenue Dynamics
            </h3>
            <p className="text-xs font-bold mt-1 text-primary uppercase tracking-widest">
              Weekly performance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="hidden sm:flex items-center gap-1 px-2.5 py-1
            bg-emerald-500/15 text-emerald-400
            text-[10px] font-bold rounded-lg uppercase tracking-wider"
          >
            <FaArrowUp className="text-[9px]" /> 12%
          </span>
          <button className="p-2 text-slate-400 hover:text-white transition">
            <FaEllipsisH />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0 w-full relative">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>

      {/* Footer */}
      <div className="border-t border-primary/40 mt-3 flex items-center justify-between shrink-0">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Total Earned
          </span>
          <p className="text-xl font-black text-white">$24,592.00</p>
        </div>
        <button
          className="text-xs font-bold text-primary hover:text-indigo-300
          underline underline-offset-4 decoration-indigo-500/40"
        >
          View Report
        </button>
      </div>
    </div>
  );
};

export default BigChartBox;
