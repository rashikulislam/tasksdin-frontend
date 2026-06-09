"use client";

import { Card } from "@/components/ui/card";
import { HouseCardProps } from "../../data/mockHouseData";
import ImageSection from "./ImageSection";
import ImportantLocation from "./ImportantLocation";

const HouseCard = ({ house }: HouseCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
      {/* Image */}
      <ImageSection house={house} />

      <ImportantLocation house={house} />
    </Card>
  );
};

export default HouseCard;
