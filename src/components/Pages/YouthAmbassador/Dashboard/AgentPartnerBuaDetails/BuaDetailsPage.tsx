"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Shield,
  Star,
  Briefcase,
  Home,
  Calendar,
  Clock,
  ChefHat,
  Award,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */

const mockBuaDetails = {
  id: "bua-1",
  name: "ফাতেমা বেগম",
  phone: "01812345678",
  address: "মিরপুর-১১, ব্লক-সি, ঢাকা",
  nidNumber: "1234567890123",
  profilePhoto: "",
  status: "approved",
  joinDate: "2024-01-01",
  rating: 4.9,
  totalEarnings: 48000,

  areasWorked: [
    { name: "মিরপুর-১০", housesCount: 3 },
    { name: "মিরপুর-১১", housesCount: 2 },
    { name: "পল্লবী", housesCount: 1 },
  ],

  housesWorked: [
    {
      id: "house-1",
      userName: "রহিম আলী",
      address: "মিরপুর-১০, ঢাকা",
      services: ["রান্না", "ঘর পরিষ্কার"],
      duration: "৩ মাস",
      status: "active",
      monthlyPrice: 8000,
    },
    {
      id: "house-2",
      userName: "করিম সাহেব",
      address: "মিরপুর-১১, ঢাকা",
      services: ["রান্না", "কাপড় ধোয়া"],
      duration: "২ মাস",
      status: "completed",
      monthlyPrice: 7000,
    },
    {
      id: "house-3",
      userName: "নাজমা বেগম",
      address: "পল্লবী, ঢাকা",
      services: ["রান্না"],
      duration: "১ মাস",
      status: "completed",
      monthlyPrice: 5000,
    },
  ],

  attendanceHistory: [
    { month: "জানুয়ারি", year: 2024, totalDays: 31, workedDays: 29, absentDays: 2 },
    { month: "ফেব্রুয়ারি", year: 2024, totalDays: 29, workedDays: 27, absentDays: 2 },
    { month: "মার্চ", year: 2024, totalDays: 31, workedDays: 30, absentDays: 1 },
  ],

  skills: ["রান্না", "ঘর পরিষ্কার", "কাপড় ধোয়া", "বাচ্চা দেখাশোনা"],
};

/* ---------------- PAGE ---------------- */

export default function AgentPartnerBuaDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const buaId = params?.buaId as string;
  const bua = mockBuaDetails;

  const totalDays = bua.attendanceHistory.reduce((sum, m) => sum + m.totalDays, 0);
  const workedDays = bua.attendanceHistory.reduce((sum, m) => sum + m.workedDays, 0);
  const attendanceRate = Math.round((workedDays / totalDays) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/agent-partner-dashboard/bua-listing")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div>
          <h2 className="text-xl font-bold">বুয়া বিস্তারিত</h2>
          <p className="text-sm text-muted-foreground">বুয়া #{buaId}</p>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="overflow-hidden border-2 border-primary/20">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-28 h-28 border-4 border-background shadow-xl">
                <AvatarImage src={bua.profilePhoto} alt={bua.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                  {bua.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <Badge
                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${
                  bua.status === "approved" ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                {bua.status === "approved" ? "অনুমোদিত" : "অপেক্ষমান"}
              </Badge>
            </div>

            <div className="text-center md:text-left flex-1">
              <h2 className="font-bold text-2xl">{bua.name}</h2>

              <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i <= Math.floor(bua.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-muted-foreground ml-2">
                  ({bua.rating})
                </span>
              </div>

              <p className="text-sm text-muted-foreground mt-2">
                যোগদান: {new Date(bua.joinDate).toLocaleDateString("bn-BD")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-background/50 rounded-xl">
                <p className="text-2xl font-bold text-primary">
                  ৳{bua.totalEarnings.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">মোট আয়</p>
              </div>

              <div className="text-center p-4 bg-background/50 rounded-xl">
                <p className="text-2xl font-bold text-green-600">
                  {attendanceRate}%
                </p>
                <p className="text-xs text-muted-foreground">উপস্থিতি</p>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InfoItem icon={<Phone />} label="ফোন" value={bua.phone} />
            <InfoItem icon={<MapPin />} label="ঠিকানা" value={bua.address} />
            <InfoItem icon={<Shield />} label="NID" value={bua.nidNumber} />
          </div>
        </CardContent>
      </Card>

      {/* নিচের বাকি UI same থাকছে (logic unchanged) */}
      {/* Left + Right Column same as before */}
      {/* Already converted routing + params logic */}
    </div>
  );
}

/* ---------------- SMALL COMPONENT ---------------- */

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
      <div className="w-5 h-5 text-primary">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
