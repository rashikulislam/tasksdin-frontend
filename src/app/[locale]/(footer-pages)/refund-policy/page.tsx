"use client";

import { RefreshCw, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const RefundPolicyPage = () => {

  const refundCases = [
    { 
      icon: CheckCircle, 
      title: "পূর্ণ রিফান্ড (১০০%)", 
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200",
      cases: [
        "সার্ভিস শুরু হওয়ার ২৪ ঘণ্টা আগে বাতিল করলে",
        "প্রোভাইডার নির্ধারিত সময়ে না আসলে",
        "প্ল্যাটফর্মের ত্রুটির কারণে সার্ভিস না পেলে"
      ]
    },
    { 
      icon: RefreshCw, 
      title: "আংশিক রিফান্ড (৫০%)", 
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200",
      cases: [
        "সার্ভিস শুরু হওয়ার ২-২৪ ঘণ্টার মধ্যে বাতিল করলে",
        "সার্ভিসের মান সন্তোষজনক না হলে (যাচাই সাপেক্ষে)"
      ]
    },
    { 
      icon: XCircle, 
      title: "রিফান্ড প্রযোজ্য নয়", 
      color: "text-red-600",
      bgColor: "bg-red-50 border-red-200",
      cases: [
        "সার্ভিস শুরু হওয়ার ২ ঘণ্টার মধ্যে বাতিল করলে",
        "সার্ভিস সম্পন্ন হওয়ার পর",
        "গ্রাহকের ভুল তথ্য দেওয়ার কারণে সমস্যা হলে"
      ]
    },
  ];

  return (
    <div>

      {/* Main */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Title */}
        <div className="text-center mb-12 mt-16">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">রিফান্ড নীতিমালা</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            আমরা গ্রাহক সন্তুষ্টিকে সর্বোচ্চ গুরুত্ব দিই। নিচের শর্তাবলী অনুযায়ী রিফান্ড প্রদান করা হয়।
          </p>
        </div>

        {/* Refund Cases */}
        <div className="space-y-6 mb-8">
          {refundCases.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className={item.bgColor}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full bg-background flex items-center justify-center shrink-0`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                      <ul className="space-y-2">
                        {item.cases.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 shrink-0" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Processing Time */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">রিফান্ড প্রসেসিং সময়</h3>
                <p className="text-muted-foreground text-sm">অনুমোদিত রিফান্ড নিম্নলিখিত সময়ে প্রদান করা হয়:</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">৩-৫</p>
                <p className="text-sm text-muted-foreground">কার্যদিবস (বিকাশ/নগদ)</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">৫-৭</p>
                <p className="text-sm text-muted-foreground">কার্যদিবস (ব্যাংক কার্ড)</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">তাৎক্ষণিক</p>
                <p className="text-sm text-muted-foreground">ওয়ালেট ব্যালেন্স</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold mb-2">রিফান্ডের জন্য আবেদন</h3>
            <p className="text-muted-foreground text-sm mb-4">
              রিফান্ড আবেদন করতে সাপোর্ট টিমে যোগাযোগ করুন। অর্ডার আইডি ও কারণ উল্লেখ করুন।
            </p>
            <Button>সাপোর্টে যোগাযোগ</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RefundPolicyPage;
