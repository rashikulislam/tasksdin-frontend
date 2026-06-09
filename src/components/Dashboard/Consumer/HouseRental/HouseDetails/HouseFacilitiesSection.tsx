"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, Car, Shield, Dumbbell, Waves, CheckCircle2 } from "lucide-react";

interface HouseFacilitiesSectionProps {
  facilities: string[];
  rules: string[];
  description: string;
}

const HouseFacilitiesSection = ({ facilities, rules, description }: HouseFacilitiesSectionProps) => {
  const getFacilityIcon = (facility: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "WiFi": <Wifi className="w-4 h-4" />,
      "Parking": <Car className="w-4 h-4" />,
      "Garage": <Car className="w-4 h-4" />,
      "Security Guard": <Shield className="w-4 h-4" />,
      "Security": <Shield className="w-4 h-4" />,
      "CCTV": <Shield className="w-4 h-4" />,
      "Gym Access": <Dumbbell className="w-4 h-4" />,
      "Swimming Pool": <Waves className="w-4 h-4" />
    };
    return iconMap[facility] || <CheckCircle2 className="w-4 h-4" />;
  };

  return (
    <>
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>বিবরণ</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card>
        <CardHeader>
          <CardTitle>সুবিধা ও সুযোগ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {facilities.map((facility, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                {getFacilityIcon(facility)}
                <span className="text-sm">{facility}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* House Rules */}
      <Card>
        <CardHeader>
          <CardTitle>বাসার নিয়ম</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {rules.map((rule, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{rule}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default HouseFacilitiesSection;
