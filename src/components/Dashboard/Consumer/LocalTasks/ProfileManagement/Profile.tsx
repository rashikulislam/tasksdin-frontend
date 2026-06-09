'use client';

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Edit3, Trash2, Mail, Phone, MapPin, Star, Calendar, Shield } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  joinDate: string;
  completedOrders: number;
  rating: number;
  verified: boolean;
}

interface ProfileManagementProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onDeleteProfile: () => void;
}

export default function ProfileManagement({ 
  profile, 
  onUpdateProfile, 
  onDeleteProfile 
}: ProfileManagementProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  // Reset when profile prop changes
  // useEffect(() => {
  //   setEditedProfile(profile);
  // }, [profile]);

  const handleSave = useCallback(() => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  }, [editedProfile, onUpdateProfile]);

  const handleCancel = useCallback(() => {
    setEditedProfile(profile);
    setIsEditing(false);
  }, [profile]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Profile Card */}
      <div className="md:col-span-2">
        <Card className="bg-card border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                প্রোফাইল তথ্য
              </span>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      বাতিল
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      সেভ করুন
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleEdit}
                      aria-label="Edit profile"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      সম্পাদনা
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={onDeleteProfile}
                      aria-label="Delete profile"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      ডিলিট
                    </Button>
                  </>
                )}
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">নাম</Label>
                    <Input 
                      id="name" 
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="আপনার নাম"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">ফোন</Label>
                    <Input 
                      id="phone" 
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="01xxxxxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">ইমেইল</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="location">ঠিকানা</Label>
                  <Input 
                    id="location" 
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="ঢাকা, বাংলাদেশ"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">বায়ো</Label>
                  <Textarea 
                    id="bio" 
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    placeholder="আপনার সম্পর্কে কিছু বলুন..."
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Avatar + Name + Bio */}
                <div className="flex items-start gap-4">
                  <Avatar className="w-20 h-20 ring-2 ring-primary/20">
                    <AvatarImage src="/api/placeholder/80/80" alt={profile.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary-foreground text-primary-foreground text-2xl font-bold">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold">{profile.name}</h2>
                      {profile.verified && (
                        <Badge className="bg-success text-success-foreground text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          ভেরিফাইড
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{profile.bio || "কোনো বায়ো নেই"}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>যোগদান: {profile.joinDate}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stats Sidebar */}
      <div className="space-y-6">
        {/* Rating Card */}
        <Card className="bg-gradient-to-br from-primary to-primary-foreground text-primary-foreground border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold mb-2">{profile.rating.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1 text-primary-foreground/90">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-sm">আপনার রেটিং</span>
            </div>
          </CardContent>
        </Card>

        {/* Orders Card */}
        <Card className="bg-gradient-to-br from-accent to-accent-foreground text-accent-foreground border-0 shadow-md">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold mb-2">{profile.completedOrders}</div>
            <div className="text-sm opacity-90">সম্পন্ন অর্ডার</div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card className="bg-card border shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">অ্যাকাউন্ট স্ট্যাটাস</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>ইমেইল ভেরিফিকেশন</span>
              <Badge className="bg-success text-success-foreground text-xs">সম্পন্ন</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>ফোন ভেরিফিকেশন</span>
              <Badge className="bg-success text-success-foreground text-xs">সম্পন্ন</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>আইডি ভেরিফিকেশন</span>
              <Badge className="bg-warning text-warning-foreground text-xs">পেন্ডিং</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}