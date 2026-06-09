"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UnskilledProviderAuthProps {
  onAuthSuccess: () => void;
  onBack: () => void;
}

export default function UnskilledProviderAuth({ onAuthSuccess, onBack }: UnskilledProviderAuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    otp: "",
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const handleNextStep = () => {
    if (step === 1) {
      toast({
        title: "OTP পাঠানো হয়েছে",
        description: `আপনার ফোনে (${formData.phone}) OTP পাঠানো হয়েছে`,
      });
      setStep(2);
    } else if (step === 2) {
      toast({
        title: "নিবন্ধন সম্পন্ন!",
        description: "আপনার অ্যাকাউন্ট তৈরি হয়েছে।",
      });

      setTimeout(() => onAuthSuccess(), 1000);
    }
  };

  const renderRegistrationStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">নাম</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="আপনার পূর্ণ নাম লিখুন"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">ইমেইল</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="example@mail.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">ফোন নম্বর</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+8801XXXXXXXXX"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">পাসওয়ার্ড</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="নতুন পাসওয়ার্ড"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="referralCode">রেফারেল কোড (ঐচ্ছিক)</Label>
              <Input
                id="referralCode"
                value={formData.referralCode}
                onChange={(e) => handleInputChange("referralCode", e.target.value)}
                placeholder="রেফারেল কোড"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">ফোন ভেরিফিকেশন</h3>
              <p className="text-sm text-muted-foreground mb-4">
                আপনার ফোনে OTP পাঠানো হয়েছে
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp">OTP কোড</Label>
              <Input
                id="otp"
                value={formData.otp}
                onChange={(e) => handleInputChange("otp", e.target.value)}
                placeholder="6 ডিজিট"
                className="text-center text-2xl tracking-widest"
                maxLength={6}
              />
            </div>

            <Button variant="outline" size="sm">
              পুনরায় পাঠান
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  // -------------------------
  // UI RETURN
  // -------------------------
  if (isLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/10 to-primary/5">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Button variant="ghost" onClick={onBack} className="p-0 h-auto mb-4 w-fit">
              <ArrowLeft className="h-4 w-4 mr-2" />
              ফিরে যান
            </Button>
            <CardTitle>লগইন</CardTitle>
            <CardDescription>আপনার অ্যাকাউন্টে প্রবেশ করুন</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>ফোন নম্বর</Label>
              <Input
                placeholder="+8801XXXXXXXXX"
              />
            </div>

            <div className="space-y-2">
              <Label>পাসওয়ার্ড</Label>
              <Input
                type="password"
                placeholder="পাসওয়ার্ড"
              />
            </div>

            <Button className="w-full">
            </Button>

            <div className="text-center">
              <Button variant="link" onClick={() => setIsLogin(false)} className="text-sm">
                নতুন অ্যাকাউন্ট তৈরি করুন
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/10 to-primary/5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={step === 1 ? onBack : () => setStep(step - 1)}
              className="p-0 h-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {step === 1 ? "ফিরে যান" : "পূর্ববর্তী"}
            </Button>

            <span className="text-sm text-muted-foreground">ধাপ {step}/2</span>
          </div>

          <CardTitle>নিবন্ধন</CardTitle>
          <CardDescription>
            {step === 1 ? "মৌলিক তথ্য প্রদান করুন" : "ফোন নম্বর যাচাই করুন"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {renderRegistrationStep()}

          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setIsLogin(true)}>
              লগইন পেজ
            </Button>
            <Button onClick={handleNextStep}>
              {step === 2 ? "সম্পন্ন করুন" : "পরবর্তী"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
