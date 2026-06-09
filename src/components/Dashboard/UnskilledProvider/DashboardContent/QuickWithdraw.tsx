"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Stats } from "../Data/mockData";

interface UnskilledQuickWithdrawProps {
  stats: Stats;
}

const UnskilledQuickWithdraw = ({ stats }: UnskilledQuickWithdrawProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">টাকা উত্তোলন</h3>
      
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Wallet className="h-6 w-6 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-800">উপলব্ধ ব্যালেন্স</span>
          </div>
          <p className="text-3xl font-bold text-emerald-700 mb-2">৳{stats.balance}</p>
          <p className="text-xs text-emerald-600">এই মাসে ৳{stats.monthlyEarnings} আয়</p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button className="w-full justify-start h-14 px-4" variant="outline">
          <div className="h-10 w-10 bg-pink-100 rounded-xl flex items-center justify-center mr-4">
            <span className="text-pink-600 font-bold text-sm">bK</span>
          </div>
          <div className="text-left">
            <p className="font-medium">bKash এ উত্তোলন</p>
            <p className="text-xs text-muted-foreground">তাৎক্ষণিক</p>
          </div>
        </Button>
        
        <Button className="w-full justify-start h-14 px-4" variant="outline">
          <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
            <span className="text-blue-600 font-bold text-sm">B</span>
          </div>
          <div className="text-left">
            <p className="font-medium">ব্যাংক অ্যাকাউন্ট</p>
            <p className="text-xs text-muted-foreground">২৪ ঘন্টা</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default UnskilledQuickWithdraw;
