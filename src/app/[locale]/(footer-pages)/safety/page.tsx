"use client";

import { Shield, UserCheck, Lock, AlertTriangle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SafetyPage = () => {

  const safetyMeasures = [
    { 
      icon: UserCheck, 
      title: "যাচাইকৃত প্রোভাইডার", 
      desc: "সকল সেবা প্রদানকারী NID, পুলিশ ভেরিফিকেশন এবং ব্যাকগ্রাউন্ড চেকের মাধ্যমে যাচাই করা হয়" 
    },
    { 
      icon: Lock, 
      title: "নিরাপদ পেমেন্ট", 
      desc: "SSL এনক্রিপ্টেড পেমেন্ট গেটওয়ে ব্যবহার করা হয়। আপনার আর্থিক তথ্য সম্পূর্ণ সুরক্ষিত" 
    },
    { 
      icon: Shield, 
      title: "ইন্সুরেন্স কভারেজ", 
      desc: "সার্ভিস চলাকালীন কোনো দুর্ঘটনা হলে ইন্সুরেন্স কভারেজ প্রযোজ্য" 
    },
    { 
      icon: AlertTriangle, 
      title: "জরুরি সহায়তা", 
      desc: "২৪/৭ জরুরি সাপোর্ট লাইন চালু আছে। যেকোনো সমস্যায় তাৎক্ষণিক সাহায্য পান" 
    },
  ];

  return (
    <div>

      {/* Main */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-12 mt-16">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">আপনার নিরাপত্তা আমাদের অগ্রাধিকার</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tasks Din-এ আমরা গ্রাহক ও প্রোভাইডার উভয়ের নিরাপত্তা নিশ্চিত করতে বহুস্তরীয় সুরক্ষা ব্যবস্থা গ্রহণ করেছি।
          </p>
        </div>

        {/* Safety Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {safetyMeasures.map((measure, idx) => {
            const Icon = measure.icon;
            return (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{measure.title}</h3>
                      <p className="text-muted-foreground">{measure.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Emergency Section */}
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <Phone className="w-7 h-7 text-red-600" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="font-bold text-lg text-red-800">জরুরি হটলাইন</h3>
              <p className="text-red-700 text-sm">যেকোনো জরুরি পরিস্থিতিতে এই নম্বরে কল করুন</p>
            </div>
            <Button variant="destructive" size="lg">
              <Phone className="w-4 h-4 mr-2" />
              999
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SafetyPage;
