"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, MapPin, Shield, Star } from "lucide-react";
import { mockBuaDetails } from "../Data/mockData";

export default function BuaProfileCard() {
  const bua = mockBuaDetails;
  // Calculate overall attendance rate
  const totalDays = bua.attendanceHistory.reduce(
    (sum, m) => sum + m.totalDays,
    0,
  );
  const workedDays = bua.attendanceHistory.reduce(
    (sum, m) => sum + m.workedDays,
    0,
  );
  const attendanceRate = Math.round((workedDays / totalDays) * 100);

  return (
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
                  className={`w-5 h-5 ${i <= Math.floor(bua.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
              <span className="text-muted-foreground ml-2">({bua.rating})</span>
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
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">ফোন</p>
              <p className="font-medium">{bua.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">ঠিকানা</p>
              <p className="font-medium">{bua.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Shield className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">NID</p>
              <p className="font-medium">{bua.nidNumber}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
