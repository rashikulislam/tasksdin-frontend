"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, MessageCircle } from "lucide-react";

interface HouseProviderInfoProps {
  providerName: string;
  providerPhone: string;
  providerPhoto?: string;
}

const HouseProviderInfo = ({ 
  providerName, 
  providerPhone, 
  providerPhoto 
}: HouseProviderInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>মালিকের তথ্য</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={providerPhoto} />
            <AvatarFallback>{providerName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold text-lg">{providerName}</h4>
            <p className="text-muted-foreground">সম্পত্তি মালিক</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={() => window.open(`tel:${providerPhone}`)}
          >
            <Phone className="w-4 h-4 mr-2" />
            কল করুন
          </Button>
          <Button variant="outline" className="flex-1">
            <MessageCircle className="w-4 h-4 mr-2" />
            মেসেজ করুন
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HouseProviderInfo;
