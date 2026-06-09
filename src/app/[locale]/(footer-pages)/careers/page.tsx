"use client";

import { Briefcase, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CareersPage = () => {

  const jobs = [
    { 
      title: "সফটওয়্যার ইঞ্জিনিয়ার", 
      department: "Engineering", 
      location: "ঢাকা", 
      type: "Full-time",
      description: "React, Node.js এবং আধুনিক ওয়েব প্রযুক্তিতে দক্ষ ডেভেলপার খুঁজছি"
    },
    { 
      title: "প্রোডাক্ট ম্যানেজার", 
      department: "Product", 
      location: "ঢাকা", 
      type: "Full-time",
      description: "প্রোডাক্ট স্ট্র্যাটেজি ও ডেভেলপমেন্ট পরিচালনার জন্য অভিজ্ঞ PM প্রয়োজন"
    },
    { 
      title: "কাস্টমার সাপোর্ট", 
      department: "Support", 
      location: "রিমোট", 
      type: "Full-time",
      description: "গ্রাহক সেবায় আগ্রহী ও বাংলা-ইংরেজিতে দক্ষ প্রার্থী চাই"
    },
  ];

  return (
    <div>

      {/* Main */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12 mt-16">
          <h2 className="text-3xl font-bold mb-4">আমাদের টিমে যোগ দিন</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tasks Din একটি দ্রুত বর্ধনশীল স্টার্টআপ। আমরা প্রতিভাবান ও উদ্যমী মানুষদের খুঁজছি যারা বাংলাদেশের সেবা খাতে বিপ্লব আনতে চান।
          </p>
        </div>

        {/* Job List */}
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <Card key={idx} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {job.department}
                      </Badge>
                      <Badge variant="outline">
                        <MapPin className="w-3 h-3 mr-1" />
                        {job.location}
                      </Badge>
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {job.type}
                      </Badge>
                    </div>
                  </div>
                  <Button className="shrink-0">আবেদন করুন</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CV Section */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-2">আপনার পছন্দের পজিশন নেই?</h3>
            <p className="text-muted-foreground mb-4">
              আমাদের কাছে আপনার CV পাঠান। ভবিষ্যতে সুযোগ হলে যোগাযোগ করব।
            </p>
            <Button variant="outline">CV জমা দিন</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CareersPage;
