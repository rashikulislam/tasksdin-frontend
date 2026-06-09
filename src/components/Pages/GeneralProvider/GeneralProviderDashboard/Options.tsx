"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Wallet, CheckCircle, Star, CalendarCheck } from "lucide-react";

const mockStats = {
  balance: 2450,
  completedTasks: 127,
  rating: 4.7,
  monthlyEarnings: 8500,
  completedTasksThisMonth: 15,
};

const statsConfig = [
  {
    title: "মোট আয়",
    value: `৳${mockStats.balance.toLocaleString()}`,
    icon: Wallet,
  },
  {
    title: "সম্পন্ন কাজ",
    value: `${mockStats.completedTasks}`,
    icon: CheckCircle,
  },
  {
    title: "রেটিং",
    value: `${mockStats.rating} ⭐`,
    icon: Star,
  },
  {
    title: "এই মাসের কাজ",
    value: `${mockStats.completedTasksThisMonth}`,
    icon: CalendarCheck,
  },
];

const Options = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-4 lg:gap-y-7">
        {statsConfig.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="
    bg-gradient-to-br from-blue-50 via-white to-blue-100 
    dark:from-blue-900 dark:via-blue-800 dark:to-blue-700
    border border-blue-200 dark:border-blue-700
    rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent
                className="
      p-3 lg:p-5 
      flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3"
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-2">
                  <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-700 rounded-full">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-blue-800 dark:text-blue-200 tracking-wide">
                    {stat.title}
                  </span>
                </div>

                {/* Value */}
                <p className="text-xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-100 drop-shadow-sm">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Options;
