"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar } from "lucide-react";
import { mockBuaDetails } from "../Data/mockData";

export default function BuaAttendance() {
  const bua = mockBuaDetails;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          উপস্থিতি রেকর্ড (মাসিক)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bua.attendanceHistory.map((month, idx) => {
          const rate = Math.round((month.workedDays / month.totalDays) * 100);
          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">
                  {month.month} {month.year}
                </span>
                <div className="flex items-center gap-2">
                  {month.absentDays > 0 && (
                    <Badge
                      variant="outline"
                      className="text-yellow-600 border-yellow-300"
                    >
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {month.absentDays} দিন অনুপস্থিত
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {month.workedDays}/{month.totalDays} দিন
                  </span>
                </div>
              </div>
              <Progress value={rate} className="h-2" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
