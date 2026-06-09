import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const GeneralProviderLeaderBoard = () => {
  return (
    <div className="space-y-4 container">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        মাসিক লিডারবোর্ড
      </h3>

      {/* Your Rank Card */}
      <Card className="border border-blue-100 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
        <CardContent className="p-6 text-center">
          <Trophy className="h-12 w-12 text-blue-600 dark:text-blue-300 mx-auto mb-3" />
          <p className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
            আপনার র‍্যাঙ্ক
          </p>
          <p className="text-3xl font-bold text-blue-700 dark:text-blue-100 mb-1">
            #12
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-300">এই মাসে</p>
        </CardContent>
      </Card>

      {/* Leaderboard List */}
      <div className="space-y-2">
        {[
          { rank: 1, name: "সাকিব হাসান", tasks: 95, earnings: 28500 },
          { rank: 2, name: "রফিক উদ্দিন", tasks: 87, earnings: 26100 },
          { rank: 3, name: "নাসির আহমেদ", tasks: 82, earnings: 24600 },
          { rank: 4, name: "মিনহাজ রহমান", tasks: 78, earnings: 23400 },
          { rank: 5, name: "জামিল হোসেন", tasks: 71, earnings: 21300 },
        ].map((provider) => (
          <Card
            key={provider.rank}
            className="hover:shadow-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                {/* Rank & Name */}
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold border ${
                      provider.rank === 1
                        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                        : provider.rank === 2
                        ? "bg-gray-100 text-gray-700 border-gray-300"
                        : provider.rank === 3
                        ? "bg-orange-100 text-orange-700 border-orange-300"
                        : "bg-slate-100 text-slate-700 border-slate-300"
                    }`}
                  >
                    {provider.rank}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800 dark:text-white">
                      {provider.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {provider.tasks} কাজ সম্পন্ন
                    </p>
                  </div>
                </div>

                {/* Earnings */}
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                    ৳{provider.earnings}
                  </p>
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

export default GeneralProviderLeaderBoard;
