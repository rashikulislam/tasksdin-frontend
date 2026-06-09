"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, ChefHat } from "lucide-react";
import { mockBuaDetails } from "../Data/mockData";

export default function BuaSkills() {
  const bua = mockBuaDetails;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Award className="w-5 h-5" />
          সার্ভিস/দক্ষতা
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {bua.skills.map((skill, idx) => (
            <Badge key={idx} variant="secondary" className="py-1.5 px-3">
              <ChefHat className="w-3 h-3 mr-1" />
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
