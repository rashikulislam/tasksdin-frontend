"use client";

import {
  Search,
  MessageCircle,
  FileQuestion,
  CreditCard,
  User,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HelpCenterPage = () => {

  const categories = [
    { icon: User, title: "অ্যাকাউন্ট", desc: "রেজিস্ট্রেশন, লগইন, প্রোফাইল" },
    {
      icon: CreditCard,
      title: "পেমেন্ট",
      desc: "বিলিং, রিফান্ড, পেমেন্ট মেথড",
    },
    { icon: FileQuestion, title: "সেবা", desc: "বুকিং, ক্যান্সেলেশন, সার্ভিস" },
    { icon: Shield, title: "নিরাপত্তা", desc: "প্রাইভেসি, ডেটা সুরক্ষা" },
  ];

  const faqs = [
    {
      q: "কিভাবে সার্ভিস বুক করব?",
      a: "প্রথমে আপনার পছন্দের সার্ভিস ক্যাটাগরি নির্বাচন করুন, তারপর প্রোভাইডার বেছে নিয়ে বুকিং ফর্ম পূরণ করুন এবং পেমেন্ট সম্পন্ন করুন।",
    },
    {
      q: "পেমেন্ট রিফান্ড কিভাবে পাব?",
      a: "সার্ভিস শুরু হওয়ার আগে ক্যান্সেল করলে ৫ কার্যদিবসের মধ্যে পূর্ণ রিফান্ড পাবেন। সার্ভিস শুরু হওয়ার পর রিফান্ড নীতি প্রযোজ্য।",
    },
    {
      q: "প্রোভাইডাররা কি যাচাইকৃত?",
      a: "হ্যাঁ, সকল প্রোভাইডার NID যাচাই, ব্যাকগ্রাউন্ড চেক এবং প্রশিক্ষণ সম্পন্ন করে প্ল্যাটফর্মে যুক্ত হন।",
    },
    {
      q: "সমস্যা হলে কোথায় জানাব?",
      a: "অ্যাপের সাপোর্ট সেকশনে যোগাযোগ করুন অথবা আমাদের হটলাইনে কল করুন। ২৪ ঘণ্টার মধ্যে সমাধান দেওয়া হয়।",
    },
  ];

  return (
    <div>
      {/* Main */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Search */}
        <div className="text-center mb-8 mt-16">
          <h2 className="text-2xl font-bold mb-4">
            আপনাকে কিভাবে সাহায্য করতে পারি?
          </h2>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="সমস্যা খুঁজুন..." className="pl-10" />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Card
                key={idx}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQs */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4">সচরাচর জিজ্ঞাসা</h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">সমস্যা সমাধান হয়নি?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              আমাদের সাপোর্ট টিমের সাথে সরাসরি কথা বলুন
            </p>
            <Button>লাইভ চ্যাট</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HelpCenterPage;
