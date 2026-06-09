"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Info,
  Moon,
  Sun,
  Sunset,
} from "lucide-react";
import React, { useState } from "react";

function FinalDetails() {
  const [wantTrial, setWantTrial] = useState(false);
  const [trialTimeSlot, setTrialTimeSlot] = useState<
    "morning" | "afternoon" | "night"
  >("morning");
  const [trialDate, setTrialDate] = useState("");
  const [trialPaymentCompleted, setTrialPaymentCompleted] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [salaryPaymentDate, setSalaryPaymentDate] = useState("1");
  const [userName, setUserName] = useState("ব্যবহারকারী নাম");
  const [phoneNumber, setPhoneNumber] = useState("01712345678");
  const [address, setAddress] = useState("");
  return (
    <div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">অন্যান্য তথ্য</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>সেবা শুরুর তারিখ</Label>
            <div className="relative">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Salary Payment Date Range (1-10) */}
          <div>
            <Label>বেতন পরিশোধের তারিখ</Label>
            <Select
              value={salaryPaymentDate}
              onValueChange={setSalaryPaymentDate}
            >
              <SelectTrigger>
                <SelectValue placeholder="তারিখ নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((date) => (
                  <SelectItem key={date} value={date.toString()}>
                    প্রতি মাসের {date} তারিখ
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <Info className="w-3 h-3" />
              বেতন প্রতি মাসের ১-১০ তারিখের মধ্যে পরিশোধ করতে হবে
            </p>
          </div>

          {/* Trial Option */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trial"
                checked={wantTrial}
                onCheckedChange={(c) => {
                  setWantTrial(c as boolean);
                  if (!c) {
                    setTrialPaymentCompleted(false);
                  }
                }}
              />
              <Label htmlFor="trial" className="cursor-pointer">
                ১ দিনের ট্রায়াল চাই
              </Label>
            </div>
            {wantTrial && (
              <div className="ml-6 space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        ট্রায়ালের জন্য ৳১০০ অগ্রিম বাধ্যতামূলক
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        এই টাকা আপনার পেমেন্ট রেকর্ডে দেখানো হবে। ট্রায়ালে
                        সন্তুষ্ট হলে মাসিক চুক্তি করতে পারবেন।
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trial Time Slot */}
                <div>
                  <Label className="mb-2 block">
                    ট্রায়াল সময়কাল নির্বাচন করুন *
                  </Label>
                  <RadioGroup
                    value={trialTimeSlot}
                    onValueChange={(v) =>
                      setTrialTimeSlot(v as "morning" | "afternoon" | "night")
                    }
                    className="grid grid-cols-3 gap-2"
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="morning" id="trial-morning" />
                      <Label
                        htmlFor="trial-morning"
                        className="cursor-pointer flex items-center gap-2"
                      >
                        <Sun className="w-4 h-4 text-yellow-500" />
                        সকাল
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="afternoon" id="trial-afternoon" />
                      <Label
                        htmlFor="trial-afternoon"
                        className="cursor-pointer flex items-center gap-2"
                      >
                        <Sunset className="w-4 h-4 text-orange-500" />
                        দুপুর
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="night" id="trial-night" />
                      <Label
                        htmlFor="trial-night"
                        className="cursor-pointer flex items-center gap-2"
                      >
                        <Moon className="w-4 h-4 text-blue-500" />
                        রাত
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Trial Date */}
                <div>
                  <Label>ট্রায়ালের তারিখ *</Label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={trialDate}
                      onChange={(e) => setTrialDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Payment Status */}
                {trialPaymentCompleted && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        ৳১০০ ট্রায়াল ফি পরিশোধ সম্পন্ন
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
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
        </CardContent>
      </Card>
    </div>
  );
}

export default FinalDetails;
