"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, MapPin, FileText, User } from "lucide-react";
import { mockContractDetail } from "../Data/mockData";

export default function UserInfoCard() {
  const contract = mockContractDetail;
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="w-5 h-5" />
          ইউজার তথ্য
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={contract.user.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {contract.user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{contract.user.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Phone className="w-4 h-4" /> {contract.user.phone}
            </p>
          </div>
        </div>

        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> ঠিকানা
          </p>
          <p className="text-sm">{contract.user.address}</p>
        </div>

        {/* User Requirements */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700 mb-1 flex items-center gap-1">
            <FileText className="w-3 h-3" /> আবেদনের সময় চাহিদা
          </p>
          <p className="text-sm text-blue-900">{contract.user.requirements}</p>
        </div>
      </CardContent>
    </Card>
  );
}
