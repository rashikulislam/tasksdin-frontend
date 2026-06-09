// components/local-tasks/QuickStats.tsx
"use client";

import { Users, Star, Clock, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const quickStats = [
  {
    label: "সক্রিয় সেবাদাতা",
    value: "৫০০+",
    icon: Users,
    color: "text-primary",
  },
  { label: "গড় রেটিং", value: "৪.৮", icon: Star, color: "text-accent" },
  { label: "সেবা উপলভ্যতা", value: "২৪/৭", icon: Clock, color: "text-primary" },
  { label: "সম্পন্ন কাজ", value: "১০০০+", icon: Award, color: "text-accent" },
];

const QuickStats = () => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`grid gap-3 mb-8 ${isMobile ? "grid-cols-2" : "grid-cols-4"}`}
    >
      {quickStats.map((stat, index) => (
        <div
          key={index}
          className={`text-center p-3 rounded-xl bg-card/50 backdrop-blur-sm ${
            isMobile ? "p-3" : "p-4"
          }`}
        >
          <stat.icon
            className={`mx-auto mb-1 ${stat.color} ${
              isMobile ? "w-5 h-5 mb-1" : "w-6 h-6 mb-2"
            }`}
          />
          <div
            className={`font-bold text-primary ${
              isMobile ? "text-lg" : "text-2xl"
            }`}
          >
            {stat.value}
          </div>
          <div
            className={`text-muted-foreground ${
              isMobile ? "text-xs" : "text-sm"
            }`}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
