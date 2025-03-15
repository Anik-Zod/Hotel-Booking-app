import TopBox from "../components/TopBox"
import ChartBox from "../components/ChartBox"
import { barChartBoxRevenue, barChartBoxVisit, chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser, products, userRows } from "../Data";
import BarChartBox from "../components/BarChartBox";
import PieChartBox from "../components/PieChartBox";
import BigChartBox from "../components/BigChartBox"


export default function Home() {
  return (

<div>
<div class="grid grid-cols-4 gap-2 ">
  <div class="shadow-md border-1 border-gray-300 p-3 row-span-2  rounded-md overflow-auto h-[380px]"><TopBox/></div>
  <div class="shadow-md border-1 border-gray-300 h-[180px] p-2 rounded-md"><ChartBox data={chartBoxUser}/></div>
  <div class="shadow-md border-1 border-gray-300 h-[180px] p-2 rounded-md"><ChartBox data={chartBoxProduct}/></div>
  <div class="shadow-md border-1 border-gray-300 row-span-2  rounded-md"><PieChartBox/></div>
  <div class="shadow-md border-1 border-gray-300 h-[180px] p-2 rounded-md"><ChartBox data={chartBoxConversion}/></div>
  <div class="shadow-md border-1 border-gray-300 h-[180px] p-2 rounded-md"><ChartBox data={chartBoxRevenue}/></div>
  <div class="shadow-md border-1 border-gray-300  rounded-md"><BarChartBox data={barChartBoxVisit}/></div>
  <div class="shadow-md border-1 border-gray-300  col-span-2 rounded-md"><BigChartBox/></div>
  <div class="shadow-md border-1 border-gray-300 rounded-md "><BarChartBox data={barChartBoxRevenue}/></div>
</div>
</div>
  );
}
