"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, CreditCard, User } from "lucide-react";
import { AssignedBua } from "../Data/MockData";

interface AssignedBuaCardProps {
  bua: AssignedBua;
}

export default function AssignedBuaCard({ bua }: AssignedBuaCardProps) {
  return (
    <Card className="border-green-200 bg-green-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-green-800">
            অ্যাসাইন করা বুয়া
          </CardTitle>
          <Badge className="bg-green-600">সক্রিয়</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-start gap-4">
          <Avatar className="w-20 h-20 border-2 border-green-300">
            <AvatarImage src={bua.photoUrl} alt={bua.name} />
            <AvatarFallback className="bg-green-200 text-green-800 text-xl">
              {bua.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-lg">{bua.name}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4 text-green-600" />
              <span>{bua.phone}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <CreditCard className="w-4 h-4 text-green-600" />
              <span>NID: {bua.nidNumber}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
