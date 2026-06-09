import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Star } from "lucide-react";
import React from "react";

const GeneralProviderHistory = () => {
  return (
    <div className="container">
      <h1 className=" pb-8 text-lg font-semibold">কাজের ইতিহাস</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-6">
        {[
          {
            title: "বাজার করা এবং বাসায় পৌঁছানো",
            client: "রহিমা খাতুন",
            location: "ধানমন্ডি",
            amount: 300,
            rating: 5.0,
            time: "২ দিন আগে",
          },
          {
            title: "অফিস থেকে ডকুমেন্ট সংগ্রহ",
            client: "করিম আহমেদ",
            location: "মতিঝিল",
            amount: 250,
            rating: 4.8,
            time: "৩ দিন আগে",
          },
          {
            title: "ওষুধ কিনে আনা",
            client: "ফাতেমা বেগম",
            location: "উত্তরা",
            amount: 200,
            rating: 5.0,
            time: "৫ দিন আগে",
          },
        ].map((task, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1 leading-tight">
                    {task.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {task.client} • {task.location}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-3.5 w-3.5" />
                      সম্পন্ন
                    </span>
                    <span className="font-semibold text-green-600">
                      ৳{task.amount}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{task.rating}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {task.time}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GeneralProviderHistory;
