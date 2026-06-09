"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Star, CheckCircle } from "lucide-react";
import { mockTaskHistory, Stats } from "../Data/mockData";

interface UnskilledTaskHistoryProps {
  stats: Stats;
}

const UnskilledTaskHistory = ({ stats }: UnskilledTaskHistoryProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">কাজের ইতিহাস</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.completedTasks}</p>
            <p className="text-xs text-green-700 font-medium">সম্পন্ন কাজ</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">৳{stats.monthlyEarnings}</p>
            <p className="text-xs text-blue-700 font-medium">এই মাসের আয়</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {mockTaskHistory.map((task, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1 leading-tight">{task.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{task.client} • {task.location}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-3.5 w-3.5" />
                      সম্পন্ন
                    </span>
                    <span className="font-semibold text-green-600">৳{task.amount}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{task.rating}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{task.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UnskilledTaskHistory;
