import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Mobile", value: 400, color: "#0088FE" },
  { name: "Desktop", value: 300, color: "#00C49F" },
  { name: "Laptop", value: 300, color: "#FFBB28" },
  { name: "Tablet", value: 200, color: "#FF8042" },
];

const PieChartBox = () => {
  return (
    <div className="bg-white p-4 rounded-2xl  flex flex-col items-center w-full">
      <h1 className="text-lg font-semibold text-gray-700">Leads by Source</h1>

      {/* Pie Chart */}
      <div className="w-full flex justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
            <Pie data={data} innerRadius="65%" outerRadius="90%" paddingAngle={5} dataKey="value">
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.name}</span>
            <span className="text-gray-500">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
