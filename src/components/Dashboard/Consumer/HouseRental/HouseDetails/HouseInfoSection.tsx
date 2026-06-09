"use client"

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Bed, Bath, Maximize, Star } from "lucide-react";
import { House } from "../data/mockHouseData";

interface HouseInfoSectionProps {
  house: House;
}

const HouseInfoSection = ({ house }: HouseInfoSectionProps) => {
  const formatRent = (rent: number) => new Intl.NumberFormat('en-BD').format(rent);

  const getRentTypeLabel = (type: string) => {
    switch (type) {
      case 'monthly': return 'মাস';
      case 'yearly': return 'বছর';
      case 'weekly': return 'সপ্তাহ';
      default: return type;
    }
  };

  const getHouseTypeLabel = (type: string) => {
    switch (type) {
      case 'apartment': return 'অ্যাপার্টমেন্ট';
      case 'house': return 'বাড়ি';
      default: return type;
    }
  };

  return (
    <>
      {/* Title & Price */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-success text-success-foreground">উপলব্ধ</Badge>
          <Badge variant="secondary">{getHouseTypeLabel(house.houseType)}</Badge>
          {house.furnished && <Badge variant="outline">সজ্জিত</Badge>}
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{house.title}</h1>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{house.location}, {house.area}, {house.city}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-warning text-warning" />
            <span className="font-semibold text-lg">{house.rating}</span>
            <span className="text-muted-foreground">({house.totalReviews} রিভিউ)</span>
          </div>
          <div>
            <span className="text-2xl md:text-3xl font-bold text-primary">৳{formatRent(house.rent)}</span>
            <span className="text-muted-foreground">/{getRentTypeLabel(house.rentType)}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="font-semibold">{house.bedrooms}</p>
          <p className="text-sm text-muted-foreground">শয়নকক্ষ</p>
        </Card>
        <Card className="text-center p-4">
          <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="font-semibold">{house.bathrooms}</p>
          <p className="text-sm text-muted-foreground">বাথরুম</p>
        </Card>
        <Card className="text-center p-4">
          <Maximize className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="font-semibold">{house.size}</p>
          <p className="text-sm text-muted-foreground">বর্গফুট</p>
        </Card>
      </div>
    </>
  );
};

export default HouseInfoSection;
