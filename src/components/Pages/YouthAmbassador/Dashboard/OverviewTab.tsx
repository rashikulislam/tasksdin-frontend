"use client";

import {
  DollarSign,
  TrendingUp,
  Users,
  ClipboardList,
  Plus,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BuaHireRequestData,
  ListedBua,
  PartnerData,
} from "@/components/Pages/YouthAmbassador/Dashboard/Data/types";

interface OverviewTabProps {
  partnerData?: PartnerData;
  listedBuas: ListedBua[];
  buaHireRequests: BuaHireRequestData[];
  setActiveTab: (tab: string) => void;
  setShowBuaListingForm: (show: boolean) => void;
  openAssignModal: (request: BuaHireRequestData) => void;
}

function OverviewTab({
  partnerData,
  listedBuas,
  buaHireRequests,
  setActiveTab,
  setShowBuaListingForm,
  openAssignModal,
}: OverviewTabProps) {
  if (!partnerData) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Loading dashboard data...
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Partner Share Banner */}
      <Card className="bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 border-primary/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">
                আপনি একজন ব্যবসায়িক অংশীদার
              </h2>
              <p className="text-muted-foreground">
                প্রতিটি সম্পন্ন কাজ থেকে আপনি {partnerData.sharePercentage}%
                রেভিনিউ পাবেন
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-primary text-white text-lg px-4 py-2">
                {partnerData.sharePercentage}% শেয়ারহোল্ডার
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট আয়</p>
                <p className="text-2xl font-bold">
                  ৳{partnerData.totalEarnings.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  তালিকাভুক্ত বুয়া
                </p>
                <p className="text-2xl font-bold">{partnerData.listedBuas}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">এই মাসে আয়</p>
                <p className="text-2xl font-bold">
                  ৳{partnerData.thisMonthEarnings.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  পেন্ডিং রিকুয়েস্ট
                </p>
                <p className="text-2xl font-bold">
                  {buaHireRequests.filter((r) => r.status === "pending").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setShowBuaListingForm(true)}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">
                বুয়া তালিকাভুক্ত করুন
              </h3>
              <p className="text-sm text-muted-foreground">
                সরাসরি আপনার ড্যাশবোর্ড থেকে নতুন বুয়া যোগ করুন
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Bua Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              নতুন বুয়া হায়ার রিকুয়েস্ট
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("bua-requests")}
            >
              সব দেখুন <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {buaHireRequests
              .filter((r) => r.status === "pending")
              .slice(0, 3)
              .map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-500/10 text-blue-500">
                        {request.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{request.userName}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {request.location}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => openAssignModal(request)}>
                    বুয়া অ্যাসাইন করুন
                  </Button>
                </div>
              ))}
            {buaHireRequests.filter((r) => r.status === "pending").length ===
              0 && (
              <p className="text-center text-muted-foreground py-4">
                কোনো পেন্ডিং রিকুয়েস্ট নেই
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Listed Buas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              সাম্প্রতিক বুয়া তালিকা
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("bua-listing")}
            >
              সব দেখুন <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {listedBuas.slice(0, 3).map((bua) => (
              <div
                key={bua.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{bua.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{bua.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {bua.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    className={
                      bua.status === "approved"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }
                  >
                    {bua.status === "approved" ? "অনুমোদিত" : "অপেক্ষমান"}
                  </Badge>
                  {bua.earnings > 0 && (
                    <p className="text-sm font-medium text-green-600 mt-1">
                      ৳{bua.earnings.toLocaleString()} আয়
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OverviewTab;
