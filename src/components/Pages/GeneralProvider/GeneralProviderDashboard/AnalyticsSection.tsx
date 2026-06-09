"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const earningsData = [
  { month: "Jan", value: 100 },
  { month: "Feb", value: 500 },
  { month: "Mar", value: 10 },
  { month: "Apr", value: 500 },
  { month: "May", value: 450 },
  { month: "Jun", value: 600 },
  { month: "Jul", value: 800 },
];

const pieData = [
  { name: "Completed", value: 60 },
  { name: "Remaining", value: 40 },
];

const COLORS = ["#3b82f6", "#e5e7eb"];

export default function AnalyticsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 pt-10 lg:pt-20">
      {/* Monthly Earnings Trend */}
      <div className="">
        <div>
          <div className="text-lg md:text-xl font-bold">
            Monthly Earnings Trend
          </div>
        </div>
        <div className="h-[280px] sm:h-[320px] md:h-[360px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            className="[&_*]:outline-none [&_*]:focus:outline-none"
          >
            <LineChart
              data={earningsData}
              margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={{ stroke: "#d1d5db" }}
                tick={{ fill: "#6b7280", fontSize: 14 }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: "#d1d5db" }}
                tick={{ fill: "#6b7280", fontSize: 14 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
                formatter={(value: number) => `৳${value.toLocaleString()}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={4}
                dot={{ r: 5, fill: "#3b82f6" }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Completed Tasks (Donut) */}
      <div className="h-[280px] sm:h-[320px] md:h-[360px]">
        <div>
          <div className="text-lg md:text-xl font-bold">
            Completed Tasks Trend
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-10">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius="70%"
                  outerRadius="100%"
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold text-gray-800">
                {pieData[0].value}%
              </span>
              <span className="text-sm sm:text-base text-gray-500">
                Completed
              </span>
            </div>
          </div>
          <div className="mt-4 w-full flex justify-around text-sm sm:text-base text-gray-600">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></span>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
