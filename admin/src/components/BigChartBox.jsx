import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  
  const data = [
    { name: "Sun", books: 4000, clothes: 2400, electronic: 2400 },
    { name: "Mon", books: 3000, clothes: 1398, electronic: 2210 },
    { name: "Tue", books: 2000, clothes: 9800, electronic: 2290 },
    { name: "Wed", books: 2780, clothes: 3908, electronic: 2000 },
    { name: "Thu", books: 1890, clothes: 4800, electronic: 2181 },
    { name: "Fri", books: 2390, clothes: 3800, electronic: 2500 },
    { name: "Sat", books: 3490, clothes: 4300, electronic: 2100 },
  ];
  
  const BigChartBox = () => {
    return (
      <div className="bg-white p-4 rounded-2xl  w-full h-full">
        <h1 className="text-lg font-semibold text-gray-700">Revenue Analytics</h1>
  
        <div className="mt-2 w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
            >
              <XAxis dataKey="name" className="text-sm text-gray-500" />
              <YAxis className="text-sm text-gray-500" />
              <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
  
              <Area
                type="monotone"
                dataKey="electronic"
                stackId="1"
                stroke="#8884d8"
                fill="rgba(136, 132, 216, 0.6)"
              />
              <Area
                type="monotone"
                dataKey="clothes"
                stackId="1"
                stroke="#82ca9d"
                fill="rgba(130, 202, 157, 0.6)"
              />
              <Area
                type="monotone"
                dataKey="books"
                stackId="1"
                stroke="#ffc658"
                fill="rgba(255, 198, 88, 0.6)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  export default BigChartBox;
  