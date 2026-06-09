"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Mail, Bell, Shield, Globe, Trash2 } from "lucide-react";

interface UnskilledProviderSettingsProps {
  onBack: () => void;
}

const UnskilledProviderSettings = ({ onBack }: UnskilledProviderSettingsProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    email: "rahul@example.com",
    phone: "+৮৮০১৭১২৩৪৫৬৭৮",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    language: "bn",
    twoFactorAuth: false
  });

  const handleSave = () => {
    toast({
      title: "সেটিংস আপডেট হয়েছে",
      description: "আপনার সেটিংস সফলভাবে সংরক্ষিত হয়েছে।",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "অ্যাকাউন্ট মুছে ফেলার অনুরোধ",
      description: "অ্যাকাউন্ট মুছতে সাপোর্টের সাথে যোগাযোগ করুন।",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-card border-b border-border p-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Button>
        <h1 className="text-xl font-bold">সেটিংস</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              অ্যাকাউন্ট তথ্য
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">ইমেইল ঠিকানা</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">ফোন নম্বর</Label>
              <Input
                id="phone"
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              নোটিফিকেশন
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">ইমেইল নোটিফিকেশন</Label>
                <p className="text-sm text-muted-foreground">
                  ইমেইলের মাধ্যমে নোটিফিকেশন পান
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications">এসএমএস নোটিফিকেশন</Label>
                <p className="text-sm text-muted-foreground">
                  এসএমএসের মাধ্যমে গুরুত্বপূর্ণ আপডেট পান
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">পুশ নোটিফিকেশন</Label>
                <p className="text-sm text-muted-foreground">
                  মোবাইলে পুশ নোটিফিকেশন পান
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              নিরাপত্তা
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">দুই-ধাপ যাচাইকরণ</Label>
                <p className="text-sm text-muted-foreground">
                  অতিরিক্ত নিরাপত্তার জন্য দুই-ধাপ যাচাইকরণ চালু করুন
                </p>
              </div>
              <Switch
                id="two-factor"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              ভাষা
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label>অ্যাপের ভাষা</Label>
              <div className="flex gap-2">
                <Button
                  variant={settings.language === "bn" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSettings({...settings, language: "bn"})}
                >
                  বাংলা
                </Button>
                <Button
                  variant={settings.language === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSettings({...settings, language: "en"})}
                >
                  English
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full">
          পরিবর্তনগুলি সংরক্ষণ করুন
        </Button>

        {/* Delete Account */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              ডেঞ্জার জোন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              একবার আপনি আপনার অ্যাকাউন্ট মুছে ফেললে, এটি পুনরুদ্ধার করার কোন উপায় নেই।
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  অ্যাকাউন্ট মুছে ফেলুন
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
                  <AlertDialogDescription>
                    এই কাজটি পূর্বাবস্থায় ফিরিয়ে আনা যাবে না। এটি স্থায়ীভাবে আপনার অ্যাকাউন্ট মুছে ফেলবে এবং আমাদের সার্ভার থেকে আপনার ডেটা সরিয়ে দেবে।
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>বাতিল</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground">
                    মুছে ফেলুন
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnskilledProviderSettings;
