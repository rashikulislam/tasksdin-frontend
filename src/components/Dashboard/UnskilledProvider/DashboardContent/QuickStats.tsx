"use client"
import { Star } from "lucide-react";
import { Stats } from "../Data/mockData";

interface UnskilledQuickStatsProps {
  stats: Stats;
}

const UnskilledQuickStats = ({ stats }: UnskilledQuickStatsProps) => {
  return (
    <div className="sticky top-[73px] z-40 bg-card border-b">
      <div className="px-4 py-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-3 rounded-xl text-center">
            <p className="text-sm font-bold">৳{stats.balance}</p>
            <p className="text-xs opacity-90">ব্যালেন্স</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-3 w-3 fill-yellow-300 text-yellow-300" />
              <p className="text-sm font-bold">{stats.rating}</p>
            </div>
            <p className="text-xs opacity-90">রেটিং</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-xl text-center">
            <p className="text-sm font-bold">#{stats.rank}</p>
            <p className="text-xs opacity-90">র‍্যাঙ্ক</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnskilledQuickStats;
