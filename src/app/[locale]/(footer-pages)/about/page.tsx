"use client";

import { Users, Target, Award, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {

  const values = [
    {
      icon: Users,
      title: "সম্প্রদায় প্রথম",
      desc: "আমরা স্থানীয় সেবা প্রদানকারী ও গ্রাহকদের মধ্যে সেতুবন্ধন তৈরি করি",
    },
    {
      icon: Target,
      title: "গুণগত মান",
      desc: "প্রতিটি সেবায় সর্বোচ্চ মান নিশ্চিত করা আমাদের অঙ্গীকার",
    },
    {
      icon: Award,
      title: "বিশ্বাসযোগ্যতা",
      desc: "সকল সেবা প্রদানকারী যাচাইকৃত ও প্রশিক্ষিত",
    },
    {
      icon: Heart,
      title: "গ্রাহক সন্তুষ্টি",
      desc: "গ্রাহকের সন্তুষ্টিই আমাদের সাফল্যের মাপকাঠি",
    },
  ];

  return (
    <div>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12 mt-16">
          <h2 className="text-3xl font-bold mb-4">Tasks Din</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            আমরা বাংলাদেশের শীর্ষস্থানীয় লোকাল সার্ভিস প্ল্যাটফর্ম। ঘরোয়া কাজ থেকে
            শুরু করে পেশাদার সেবা - সবকিছুই এক প্ল্যাটফর্মে।
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">আমাদের মিশন</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              প্রতিটি বাংলাদেশি পরিবারের জন্য নিরাপদ, সাশ্রয়ী ও মানসম্পন্ন সেবা নিশ্চিত করা।
              আমরা বিশ্বাস করি যে সঠিক প্রযুক্তি ও মানবিক সেবার সমন্বয়ে জীবনকে আরও সহজ করা সম্ভব।
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AboutPage;
