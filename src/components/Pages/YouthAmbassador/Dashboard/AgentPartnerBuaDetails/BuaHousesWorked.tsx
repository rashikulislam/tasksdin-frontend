"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, TrendingUp, Briefcase } from "lucide-react";
import { mockBuaDetails } from "../Data/mockData";

export default function BuaHousesWorked() {

  const bua = mockBuaDetails;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          কাজ করা বাড়িসমূহ
          <Badge className="ml-auto">{bua.housesWorked.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bua.housesWorked.map((house) => (
          <Card key={house.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{house.userName}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {house.address}
                  </p>
                </div>
                <Badge
                  className={
                    house.status === "active" ? "bg-green-500" : "bg-gray-500"
                  }
                >
                  {house.status === "active" ? "সক্রিয়" : "সম্পন্ন"}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {house.services.map((service, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{house.duration}</span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-primary">
                  <TrendingUp className="w-4 h-4" />
                  <span>৳{house.monthlyPrice.toLocaleString()}/মাস</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
