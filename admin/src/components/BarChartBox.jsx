import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChartBox({ data }) {
  const total = data.chartData.reduce((sum, item) => sum + item[data.dataKey], 0);

  const chartData = {
    labels: data.chartData.map((item) => item.name),
    datasets: [
      {
        data: data.chartData.map((item) => item[data.dataKey]),
        // Gradient is handled via the scriptable options below or a hex string
        backgroundColor: data.color, 
        borderRadius: 20, // Fully rounded pill-shaped bars
        borderSkipped: false,
        maxBarThickness: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        backdropBlur: 4,
        padding: 12,
        cornerRadius: 12,
      }
    },
    scales: {
      x: { grid: { display: false }, border: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
      y: { display: false },
    },
  };

  return (
    <div className="relative h-full min-h-[280px] flex flex-col p-5 rounded-3xl bg-bg border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      
      {/* Top Section */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-slate-400 text-sm font-medium">{data.title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tighter">
              {total.toLocaleString()}
            </span>
            <span className="text-emerald-400 text-xs font-bold">+5.2%</span>
          </div>
        </div>
        
        {/* Decorative Mini-Icon */}
        <div 
          className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent border border-white/10"
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: data.color }} />
        </div>
      </div>

      {/* Chart Container with Glass Background */}
      <div className="flex-1 mt-4 bg-white/5 rounded-2xl p-4 border border-white/5 relative overflow-hidden">
        {/* Subtle grid lines in background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-col justify-between p-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full h-[1px] bg-slate-400" />
          ))}
        </div>
        
        <div className="h-full w-full relative z-10">
          <Bar data={chartData} options={options} />
        </div>
      </div>

      {/* Bottom Action */}
      <button className="mt-4 py-2 w-full rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-all border border-white/5">
        View Detailed Report
      </button>
    </div>
  );
}