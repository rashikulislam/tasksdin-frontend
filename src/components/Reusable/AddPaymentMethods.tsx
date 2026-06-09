"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const UnskilledPaymentMethods = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">পেমেন্ট পদ্ধতি</h3>
        <Button size="sm" variant="outline" className="h-8">
          <Plus className="h-4 w-4 mr-1.5" />
          যোগ করুন
        </Button>
      </div>
      
      <div className="space-y-3">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <span className="text-pink-600 font-bold text-sm">bK</span>
                </div>
                <div>
                  <p className="font-medium">bKash</p>
                  <p className="text-sm text-muted-foreground">০১৭XXXXXXXX</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                সক্রিয়
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">N</span>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Nagad</p>
                  <p className="text-sm text-muted-foreground">যোগ করুন</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-8">
                যোগ করুন
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">R</span>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Rocket</p>
                  <p className="text-sm text-muted-foreground">যোগ করুন</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-8">
                যোগ করুন
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnskilledPaymentMethods;
