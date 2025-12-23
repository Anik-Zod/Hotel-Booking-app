import TopBox from "../components/TopBox";
import ChartBox from "../components/ChartBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../Data";
import BarChartBox from "../components/BarChartBox";
import PieChartBox from "../components/PieChartBox";
import BigChartBox from "../components/BigChartBox";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* The container uses flex */}
      <div className="flex gap-3 w-full ">
        {/* flex-1 ensures this div expands to fill space */}
        <div className="flex-1 min-w-[150px]">
          <ChartBox data={chartBoxProduct} />
        </div>

        <div className="flex-1 min-w-[150px]">
          <ChartBox data={chartBoxRevenue} />
        </div>

        {/* When these are hidden, the two divs above will stretch to 50% each */}
        <div className="hidden sm:flex flex-1 min-w-[200px]">
          <ChartBox data={chartBoxUser} />
        </div>

        <div className="hidden lg:block flex-1 min-w-[200px]">
          <ChartBox data={chartBoxRevenue} />
        </div>
      </div>

      {/* 2nd row */}
      <div className="flex flex-col lg:flex-row gap-3 w-full">
        {/* Takes up 3 parts of available space */}
        <div className="flex-[3] min-w-[300px]">
          <BigChartBox />
        </div>

        {/* Takes up 2 parts of available space */}
        <div className="flex-[2] min-w-[200px]">
          <PieChartBox />
        </div>
      </div>

      {/* 3rd row */}
      {/* Parent Row: Added 'items-stretch' to ensure columns are equal height */}
<div className="flex flex-col lg:flex-row gap-3 w-full items-stretch">
  
  {/* Column 1: TopBox sets the height for the whole row */}
  <div className="flex-1 min-w-[200px]">
    <TopBox />
  </div>

  {/* Column 2: This must be a flex container to pass height down */}
  <div className="flex-1 min-w-[200px] flex flex-col">
    <div className="flex flex-col h-full gap-3">
      
      {/* Chart 1: Used flex-1 to take up the remaining 50% height */}
      <div className="flex-1 min-h-[150px] bg-white/10 rounded-lg">
        <BarChartBox data={barChartBoxVisit} />
      </div>
      
      {/* Chart 2: Removed h-full, used flex-1 to grow vertically */}
      <div className="flex-1 min-h-[150px] bg-white/10 rounded-lg">
        <BarChartBox data={barChartBoxRevenue} />
      </div>

      
    </div>
  </div>
</div>
    </div>
  );
}


