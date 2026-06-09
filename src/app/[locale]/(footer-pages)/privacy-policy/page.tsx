"use client";

import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicyPage = () => {

  const sections = [
    {
      title: "তথ্য সংগ্রহ",
      content: "আমরা আপনার নাম, ইমেইল, ফোন নম্বর, ঠিকানা এবং পেমেন্ট সংক্রান্ত তথ্য সংগ্রহ করি। এই তথ্য সেবা প্রদান ও উন্নতির জন্য ব্যবহৃত হয়।"
    },
    {
      title: "তথ্য ব্যবহার",
      content: "আপনার তথ্য সেবা প্রদান, যোগাযোগ, পেমেন্ট প্রসেসিং এবং প্ল্যাটফর্ম উন্নতির জন্য ব্যবহৃত হয়। আমরা তৃতীয় পক্ষের কাছে আপনার ব্যক্তিগত তথ্য বিক্রি করি না।"
    },
    {
      title: "তথ্য সুরক্ষা",
      content: "আমরা SSL এনক্রিপশন, ফায়ারওয়াল এবং নিয়মিত সিকিউরিটি অডিটের মাধ্যমে আপনার তথ্য সুরক্ষিত রাখি।"
    },
    {
      title: "কুকিজ",
      content: "আমাদের ওয়েবসাইট কুকিজ ব্যবহার করে ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে। আপনি ব্রাউজার সেটিংস থেকে কুকিজ নিয়ন্ত্রণ করতে পারেন।"
    },
    {
      title: "তৃতীয় পক্ষ",
      content: "পেমেন্ট প্রসেসিং ও অন্যান্য সেবার জন্য আমরা বিশ্বস্ত তৃতীয় পক্ষের সাথে কাজ করি। তারাও কঠোর গোপনীয়তা নীতি মেনে চলে।"
    },
    {
      title: "আপনার অধিকার",
      content: "আপনি যেকোনো সময় আপনার তথ্য দেখতে, সংশোধন করতে বা মুছে ফেলতে অনুরোধ করতে পারেন। এজন্য আমাদের সাপোর্ট টিমে যোগাযোগ করুন।"
    },
  ];

  return (
    <div>

      {/* Main */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8 mt-16">
          <h2 className="text-2xl font-bold mb-2">গোপনীয়তা নীতি</h2>
          <p className="text-muted-foreground text-sm">সর্বশেষ আপডেট: জানুয়ারি ২০২৬</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-lg mb-2">{section.title}</h3>
                <p className="text-muted-foreground">{section.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
