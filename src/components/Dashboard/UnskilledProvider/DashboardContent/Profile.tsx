"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Edit3, Mail, Phone, MapPin, Upload, Star, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar?: string;
}

interface UnskilledProviderProfileProps {
  onBack: () => void;
}

const UnskilledProviderProfile = ({ onBack }: UnskilledProviderProfileProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "রাহুল করিম",
    email: "rahul@example.com",
    phone: "+৮৮০১৭১২৩৪৫৬৭৮",
    location: "ধানমন্ডি, ঢাকা",
    bio: "আমি একজন নির্ভরযোগ্য সেবা প্রদানকারী। যেকোনো ধরনের কাজ দ্রুত এবং নিখুঁতভাবে সম্পন্ন করতে পারি।",
  });

  const handleSave = () => {
    toast({
      title: "প্রোফাইল আপডেট হয়েছে",
      description: "আপনার তথ্য সফলভাবে সংরক্ষিত হয়েছে।",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-card border-b border-border p-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Button>
        <h1 className="text-xl font-bold">প্রোফাইল</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Avatar Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {profile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  ছবি আপলোড করুন
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-primary text-primary-foreground border-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-2xl font-bold">4.7</span>
              </div>
              <p className="text-xs opacity-90">68 reviews from clients</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-accent text-accent-foreground border-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Briefcase className="w-4 h-4" />
                <span className="text-2xl font-bold">127</span>
              </div>
              <p className="text-xs opacity-90">Tasks completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                প্রোফাইল তথ্য
              </span>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  সম্পাদনা
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <Label htmlFor="name">নাম</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">ইমেইল</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">ফোন</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="location">এলাকা</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">বায়ো</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button onClick={handleSave} className="flex-1">
                    সেভ করুন
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="flex-1">
                    বাতিল
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">নাম</p>
                    <p className="font-medium">{profile.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">ইমেইল</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">ফোন</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">এলাকা</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">বায়ো</p>
                  <p className="text-sm">{profile.bio}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnskilledProviderProfile;
