"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const ContactPage = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "বার্তা পাঠানো হয়েছে",
      description: "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
    });
  };

  const contactInfo = [
    { icon: Mail, label: "ইমেইল", value: "contact@tasksdin.com" },
    { icon: Phone, label: "ফোন", value: "+880 1XX XXX XXXX" },
    { icon: MapPin, label: "ঠিকানা", value: "ধানমন্ডি, ঢাকা, বাংলাদেশ" },
  ];

  return (
    <div>

      {/* Main */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">বার্তা পাঠান</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">নাম</Label>
                  <Input id="name" name="name" placeholder="আপনার নাম" required />
                </div>
                <div>
                  <Label htmlFor="email">ইমেইল</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="আপনার ইমেইল"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">ফোন</Label>
                  <Input id="phone" name="phone" placeholder="আপনার ফোন নম্বর" />
                </div>
                <div>
                  <Label htmlFor="message">বার্তা</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="আপনার বার্তা লিখুন..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  পাঠান
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">যোগাযোগের তথ্য</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, idx) => {
                    const Icon = info.icon;
                    return (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {info.label}
                          </p>
                          <p className="font-medium">{info.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">কাজের সময়</h3>
                <p className="text-muted-foreground text-sm">
                  শনি - বৃহস্পতি: সকাল ৯টা - রাত ৯টা
                  <br />
                  শুক্রবার: বন্ধ
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
