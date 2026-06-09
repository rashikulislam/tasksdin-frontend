"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Badge, CheckCircle, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LiveInPlan() {
  const router = useRouter();
  const [userName, setUserName] = useState("ব্যবহারকারী নাম");
  const [phoneNumber, setPhoneNumber] = useState("01712345678");
  const [address, setAddress] = useState("");
  // Live-in form
  const [liveInDetails, setLiveInDetails] = useState("");

  const handleLiveInSubmit = () => {
    if (!address || !liveInDetails) {
      toast({
        title: "ত্রুটি",
        description: "সকল তথ্য পূরণ করুন",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "আবেদন জমা হয়েছে",
      description: "আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।",
    });
    router.back();
  };
  return (
    <div>
      <div className="mt-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">লিভ-ইন বুয়া আবেদন</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-accent/20 border border-accent rounded-lg mb-4">
              <p className="text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-accent" />
                লিভ-ইন সার্ভিসের জন্য আমাদের টিম আপনার সাথে যোগাযোগ করে
                বিস্তারিত আলোচনা করবে।
              </p>
            </div>

            <div>
              <Label>আপনার নাম</Label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <Label>ফোন নম্বর</Label>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <Label>ঠিকানা</Label>
              <Textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="বাসা/ফ্ল্যাট নম্বর, রোড, এলাকা, থানা"
                rows={3}
              />
            </div>

            <div>
              <Label>আপনার প্রয়োজনের বিবরণ</Label>
              <Textarea
                value={liveInDetails}
                onChange={(e) => setLiveInDetails(e.target.value)}
                placeholder="কি কি কাজ করাতে চান, পরিবারে কতজন, কোন বিশেষ প্রয়োজন থাকলে লিখুন..."
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center">
            <Badge className="mb-2">মূল্য নির্ধারণ</Badge>
            <p className="text-sm text-muted-foreground">
              লিভ-ইন সার্ভিসের মূল্য আপনার চাহিদা অনুযায়ী নির্ধারণ করা হবে।
              <br />
              আমাদের টিম শীঘ্রই যোগাযোগ করবে।
            </p>
          </CardContent>
        </Card>

        <Button className="w-full h-12" onClick={handleLiveInSubmit}>
          <CheckCircle className="w-5 h-5 mr-2" />
          আবেদন জমা দিন
        </Button>
      </div>
    </div>
  );
}

export default LiveInPlan;
