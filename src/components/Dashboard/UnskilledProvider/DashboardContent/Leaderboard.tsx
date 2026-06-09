"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { mockLeaderboard, Stats } from "../Data/mockData";

interface UnskilledLeaderboardProps {
  stats: Stats;
}

const UnskilledLeaderboard = ({ stats }: UnskilledLeaderboardProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">মাসিক লিডারবোর্ড</h3>
      
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300">
        <CardContent className="p-6 text-center">
          <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
          <p className="font-semibold text-yellow-800 mb-1">আপনার র‍্যাঙ্ক</p>
          <p className="text-3xl font-bold text-yellow-600 mb-1">#{stats.rank}</p>
          <p className="text-sm text-yellow-700">এই মাসে</p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {mockLeaderboard.map((provider) => (
          <Card 
            key={provider.rank} 
            className={`hover:shadow-md transition-shadow ${
              provider.rank <= 3 ? "border-l-4 border-l-yellow-400 bg-gradient-to-r from-yellow-50/50 to-transparent" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    provider.rank === 1 ? "bg-yellow-100 text-yellow-600 border-2 border-yellow-300" :
                    provider.rank === 2 ? "bg-gray-100 text-gray-600 border-2 border-gray-300" :
                    provider.rank === 3 ? "bg-orange-100 text-orange-600 border-2 border-orange-300" :
                    "bg-blue-100 text-blue-600"
                  }`}>
                    {provider.rank}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{provider.name}</p>
                    <p className="text-xs text-muted-foreground">{provider.tasks} কাজ সম্পন্ন</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">৳{provider.earnings}</p>
                  <p className="text-xs text-muted-foreground">এই মাসে</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UnskilledLeaderboard;
