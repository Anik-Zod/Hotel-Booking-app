import TopBox from "../components/TopBox"
import ChartBox from "../components/ChartBox"
import { 
  barChartBoxRevenue, 
  barChartBoxVisit, 
  chartBoxConversion, 
  chartBoxProduct, 
  chartBoxRevenue, 
  chartBoxUser 
} from "../Data";
import BarChartBox from "../components/BarChartBox";
import PieChartBox from "../components/PieChartBox";
import BigChartBox from "../components/BigChartBox";
import { motion } from "framer-motion";

export default function Home() {
  // Animation variant for a staggered entrance
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Shared card style to maintain perfection
  const cardStyle = "bg-[#1e2536]/50 backdrop-blur-sm border border-white/5 rounded-2xl shadow-xl hover:border-amber-500/30 transition-all duration-300 overflow-hidden";

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 bg-[#111827] min-h-screen"
    >
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight">System Overview</h1>
        <p className="text-slate-400 text-sm">Welcome back! Here is what's happening today.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

        {/* Top box: Most active users/transactions */}
        <motion.div variants={item} className={`${cardStyle} md:col-span-2 lg:row-span-2 p-6 custom-sidebar-scroll`}>
          <TopBox />
        </motion.div>

        {/* Small Analytics Cards */}
        <motion.div variants={item} className={`${cardStyle} p-6 flex flex-col justify-center`}>
          <ChartBox data={chartBoxUser}/>
        </motion.div>

        <motion.div variants={item} className={`${cardStyle} p-6 flex flex-col justify-center`}>
          <ChartBox data={chartBoxProduct}/>
        </motion.div>

        {/* Pie Chart: Distribution */}
        <motion.div variants={item} className={`${cardStyle} md:col-span-2 lg:row-span-2 p-6`}>
          <PieChartBox />
        </motion.div>

        <motion.div variants={item} className={`${cardStyle} p-6 flex flex-col justify-center`}>
          <ChartBox data={chartBoxConversion}/>
        </motion.div>

        <motion.div variants={item} className={`${cardStyle} p-6 flex flex-col justify-center`}>
          <ChartBox data={chartBoxRevenue}/>
        </motion.div>

        {/* Large Data Visualization */}
        <motion.div variants={item} className={`${cardStyle} md:col-span-2 lg:col-span-3 p-6`}>
          <BigChartBox/>
        </motion.div>

        {/* Bar Charts: Comparison */}
        <motion.div variants={item} className={`${cardStyle} p-6`}>
          <BarChartBox data={barChartBoxVisit}/>
        </motion.div>

        <motion.div variants={item} className={`${cardStyle} p-6`}>
          <BarChartBox data={barChartBoxRevenue}/>
        </motion.div>
      </div>
    </motion.div>
  );
}