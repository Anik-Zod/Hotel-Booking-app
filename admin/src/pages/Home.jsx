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

export default function Home() {
  return (
    <div className="p-3">
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

        {/* Top box spanning 2 rows */}
        <div className="border border-gray-300 p-3 rounded-md overflow-auto h-[380px] sm:col-span-2 lg:row-span-2">
          <TopBox />
        </div>

        {/* Small chart boxes */}
        <div className="shadow-md border border-gray-300 h-[180px] p-2 rounded-md">
          <ChartBox data={chartBoxUser}/>
        </div>
        <div className="shadow-md border border-gray-300 h-[180px] p-2 rounded-md">
          <ChartBox data={chartBoxProduct}/>
        </div>

        {/* Pie chart spans more space */}
        <div className="shadow-md border border-gray-300 rounded-md sm:col-span-2 lg:row-span-2">
          <PieChartBox />
        </div>

        <div className="shadow-md border border-gray-300 h-[180px] p-2 rounded-md">
          <ChartBox data={chartBoxConversion}/>
        </div>
        <div className="shadow-md border border-gray-300 h-[180px] p-2 rounded-md">
          <ChartBox data={chartBoxRevenue}/>
        </div>

        {/* Bar chart visit */}
        <div className="shadow-md border border-gray-300 rounded-md">
          <BarChartBox data={barChartBoxVisit}/>
        </div>

        {/* Big chart spanning across */}
        <div className="shadow-md border border-gray-300 col-span-1 sm:col-span-2 lg:col-span-3 rounded-md">
          <BigChartBox/>
        </div>

        {/* Bar chart revenue */}
        <div className="shadow-md border border-gray-300 rounded-md">
          <BarChartBox data={barChartBoxRevenue}/>
        </div>
      </div>
    </div>
  );
}
