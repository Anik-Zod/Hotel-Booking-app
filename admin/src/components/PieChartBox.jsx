import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaChartPie, FaEllipsisH } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

// Modern Blue / Cyan / Violet palette
const data = [
  { name: "Mobile", value: 450, color: "#0ea5e9" },   // Sky
  { name: "Desktop", value: 350, color: "#22c55e" }, // Emerald
  { name: "Laptop", value: 300, color: "#a855f7" },  // Violet
  { name: "Tablet", value: 200, color: "#f59e0b" },  // Amber
];

const PieChartBox = () => {
  const totalVisits = data.reduce((sum, item) => sum + item.value, 0);

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => item.color),
        borderWidth: 0,
        hoverOffset: 18,
        borderRadius: 18,
        spacing: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "78%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#020617",
        padding: 14,
        cornerRadius: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        displayColors: false,
      },
    },
  };

  return (
    <div className="w-full h-full rounded-lg pt-7 pb-5 px-5
      bg-bg
      shadow-2xl border border-primary/30 backdrop-blur-xl">

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-4">
          <div className=" flex p-3 rounded-2xl
            bg-primary/40
            text-textColor shadow-lg">
            <FaChartPie size={25} className="text-xl" />
          </div>

          <div>
            <h2 className="text-xl font-black text-textColor leading-tight">
              Traffic Overview
            </h2>
            <p className="text-xs font-bold mt-1 text-primary uppercase tracking-widest ">
              Device Distribution
            </p>
          </div>
        </div>

        <button className="p-2 rounded-xl hover:bg-white/10 text-slate-400 transition">
          <FaEllipsisH />
        </button>
      </div>

      {/* Chart */}
      <div className="relative flex items-center justify-center min-h-[200px]">
        <Pie data={chartData} options={options} />

        {/* Center Info */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl sm:text-2xl font-black text-textColor">
            {totalVisits.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">
            Total Units
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mt-8  ">
        {data.map(item => (
          <div
            key={item.name}
            className="rounded-2xl p-4 text-center
              bg-primary/25 border border-white/10
              hover:bg-primary/10 hover:-translate-y-1
              transition-all duration-300"
          >
            <div
              className="w-3 h-3 rounded-full mx-auto mb-2"
              style={{ backgroundColor: item.color }}
            />
            <p className="text-xs uppercase tracking-wider text-textColor font-bold">
              {item.name}
            </p>
            <p className="text-lg font-black text-textDull">
              {((item.value / totalVisits) * 100).toFixed(0)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
