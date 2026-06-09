"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home } from "lucide-react";
import { mockBuaDetails } from "../Data/mockData";

export default function BuaAreasWorked() {
  const bua = mockBuaDetails;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          কাজ করা এলাকাসমূহ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {bua.areasWorked.map((area, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">{area.name}</span>
            </div>
            <Badge variant="secondary">
              <Home className="w-3 h-3 mr-1" />
              {area.housesCount} বাড়ি
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
