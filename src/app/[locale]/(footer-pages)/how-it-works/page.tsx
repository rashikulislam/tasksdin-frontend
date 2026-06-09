"use client";

import { Search, UserCheck, Calendar, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorksPage = () => {

  const steps = [
    { 
      step: "১", 
      icon: Search, 
      title: "সার্ভিস খুঁজুন", 
      desc: "আপনার প্রয়োজনীয় সার্ভিস ক্যাটাগরি থেকে বেছে নিন বা কাস্টম টাস্ক পোস্ট করুন" 
    },
    { 
      step: "২", 
      icon: UserCheck, 
      title: "প্রোভাইডার নির্বাচন", 
      desc: "যাচাইকৃত প্রোভাইডারদের রেটিং ও রিভিউ দেখে সেরাজনকে নির্বাচন করুন" 
    },
    { 
      step: "৩", 
      icon: Calendar, 
      title: "বুকিং নিশ্চিত", 
      desc: "সুবিধাজনক সময়ে বুকিং করুন এবং নিরাপদ পেমেন্ট সম্পন্ন করুন" 
    },
    { 
      step: "৪", 
      icon: Star, 
      title: "সেবা গ্রহণ ও রিভিউ", 
      desc: "মানসম্পন্ন সেবা উপভোগ করুন এবং প্রোভাইডারকে রেটিং দিন" 
    },
  ];

  return (
    <div>

      {/* Main */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12 mt-16">
          <h2 className="text-3xl font-bold mb-4">সহজ ৪ ধাপে সেবা নিন</h2>
          <p className="text-muted-foreground">
            Tasks Din ব্যবহার করা খুবই সহজ। মাত্র কয়েক মিনিটেই আপনার প্রয়োজনীয় সেবা পেয়ে যান।
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-primary flex items-center justify-center shrink-0">
                      <span className="text-3xl font-bold text-primary-foreground">
                        {item.step}
                      </span>
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <h3 className="font-bold text-lg">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default HowItWorksPage;
