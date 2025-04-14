import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Define the type for our data
type ChartData = {
  name: string;
  value: number;
};

type BarChartProps = {
  data: ChartData[];
};

const COLORS = ["#fc382f", "#FBBC27", "#12bf68"];

const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={60}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
