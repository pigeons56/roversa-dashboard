import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Define the type for our data
type ChartData = {
  name: string;
  value: number;
};

type PieChartProps = {
  data: ChartData[];
};

const COLORS = ["#fc382f", "#FBBC27", "#12bf68"];

const BatteryChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="70%" height="70%">
      <PieChart width={200} height={200}>
        <text
          x={195}
          y={15}
          fill="#3d155c"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan fontSize="20">Battery Overview</tspan>
        </text>
        <Pie
          data={data}
          dataKey="value"
          cx="20%"
          cy="60%"
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

export default BatteryChart;
