"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Shield } from "lucide-react";
import { IHomeMaid } from "@/interfaces/maid";
import Link from "next/link";

export default function BuaInfoCard({ maid }: { maid: IHomeMaid }) {
  return (
    <Card className="border-green-200">
      <CardHeader className="pb-3 bg-green-50/50">
        <CardTitle className="text-lg flex items-center gap-2 text-green-800">
          <Shield className="w-5 h-5" />
          বুয়া তথ্য
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-green-300">
            <AvatarImage src={maid?.profile_img} />
            <AvatarFallback className="bg-green-200 text-green-800 text-xl">
              {maid?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{maid?.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Phone className="w-4 h-4" /> {maid?.phone_number}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">NID নম্বর</p>
            <p className="text-sm font-medium">{maid?.nid}</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">ঠিকানা</p>
            <p className="text-sm font-medium">{maid?.address_details}</p>
          </div>
        </div>

        <Link href={`/dashboard/agent/bua-list/${maid?.id}`}>
          <Button variant="outline" className="w-full mt-5">
            বুয়া প্রোফাইল দেখুন
          </Button>
        </Link>
        <Button variant="destructive" className="w-full mt-5">
          পেমেন্ট দিন
        </Button>
      </CardContent>
    </Card>
  );
}
