"use client";

import { DollarSign, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  PartnerData,
  ReferralHistoryItem,
} from "@/components/Pages/YouthAmbassador/Dashboard/Data/types";

interface EarningsTabProps {
  partnerData: PartnerData;
  referralHistory: ReferralHistoryItem[];
}
function EarningsTab({ partnerData, referralHistory }: EarningsTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">আয়ের বিবরণ</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
                <DollarSign className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মোট আয়</p>
                <p className="text-3xl font-bold">
                  ৳{partnerData.totalEarnings.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-green-500/20 flex items-center justify-center">
                <Wallet className="h-7 w-7 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">উইথড্র যোগ্য</p>
                <p className="text-3xl font-bold">
                  ৳{partnerData.withdrawableBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>রেভিনিউ শেয়ার বিবরণ</CardTitle>
          <CardDescription>
            প্রতিটি সম্পন্ন কাজ থেকে আপনি {partnerData.sharePercentage}% রেভিনিউ
            পাবেন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {referralHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.type === "bua"
                        ? "বুয়া"
                        : item.type === "provider"
                          ? "প্রোভাইডার"
                          : "বাড়িওয়ালা"}{" "}
                      • {item.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">
                    +৳{item.earnings.toLocaleString()}
                  </p>
                  <Badge variant="outline" className="mt-1">
                    {partnerData.sharePercentage}% শেয়ার
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EarningsTab;
