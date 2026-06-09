"use client";

import { Card, CardContent } from "@/components/ui/card";

const TermsOfServicePage = () => {

  const sections = [
    {
      title: "১. সেবার শর্তাবলী",
      content: "Tasks Din প্ল্যাটফর্ম ব্যবহার করে আপনি এই শর্তাবলী মেনে নিচ্ছেন। এই শর্তগুলো গ্রাহক ও সেবা প্রদানকারী উভয়ের জন্য প্রযোজ্য।"
    },
    {
      title: "২. অ্যাকাউন্ট",
      content: "আপনি সঠিক তথ্য দিয়ে অ্যাকাউন্ট তৈরি করবেন এবং পাসওয়ার্ড গোপন রাখবেন। অ্যাকাউন্টের সকল কার্যক্রমের জন্য আপনি দায়ী।"
    },
    {
      title: "৩. সেবা ব্যবহার",
      content: "প্ল্যাটফর্ম শুধুমাত্র বৈধ উদ্দেশ্যে ব্যবহার করবেন। অবৈধ বা ক্ষতিকর কোনো কাজে ব্যবহার নিষিদ্ধ।"
    },
    {
      title: "৪. পেমেন্ট",
      content: "সেবার জন্য নির্ধারিত মূল্য পরিশোধ করতে হবে। পেমেন্ট সংক্রান্ত বিরোধ প্ল্যাটফর্মের মাধ্যমে সমাধান করা হবে।"
    },
    {
      title: "৫. বাতিল নীতি",
      content: "সার্ভিস শুরু হওয়ার ২৪ ঘণ্টা আগে বাতিল করলে পূর্ণ রিফান্ড পাওয়া যাবে। এর পরে বাতিল করলে রিফান্ড নীতি প্রযোজ্য হবে।"
    },
    {
      title: "৬. দায়বদ্ধতা",
      content: "Tasks Din প্ল্যাটফর্ম হিসেবে কাজ করে। সেবা প্রদানকারীদের কাজের মান বা আচরণের জন্য সরাসরি দায়ী নই, তবে সমস্যা সমাধানে সর্বোচ্চ চেষ্টা করি।"
    },
    {
      title: "৭. পরিবর্তন",
      content: "আমরা যেকোনো সময় এই শর্তাবলী পরিবর্তন করতে পারি। গুরুত্বপূর্ণ পরিবর্তন হলে আপনাকে জানানো হবে।"
    },
  ];

  return (
    <div>

      {/* Main */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8 mt-16">
          <h2 className="text-2xl font-bold mb-2">Terms of Service</h2>
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

export default TermsOfServicePage;
