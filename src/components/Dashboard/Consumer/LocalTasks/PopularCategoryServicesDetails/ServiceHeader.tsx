// components/service-details/ServiceHeader.tsx
import { Badge } from "@/components/ui/badge";
import { Service } from "@/interfaces";
import { Star, Users, Clock } from "lucide-react";

type ServiceHeaderProps = {
  serviceData: Service;
};

export default function ServiceHeader({ serviceData }: ServiceHeaderProps) {
  return (
    <div>
      {/* Header: Service Name & Price */}
      <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center mb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-0">
          {serviceData.name}
        </h1>

        <div className="text-left md:text-right">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
            ৳{serviceData.avg_min_price_range} -{" "}
            {serviceData.avg_max_price_range}
          </div>
          {/* <div className="flex items-center text-xs sm:text-sm text-muted-foreground mt-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {serviceData.duration || "2-3 hours"}
          </div> */}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {serviceData.tags?.map((tag: string, index: number) => (
          <Badge key={index} className="bg-red-500 text-white text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Rating & Providers */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm sm:text-base text-muted-foreground mt-2">
        <div className="flex items-center mb-2 sm:mb-0">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="font-medium">{serviceData.rating}</span>
        </div>

        <div className="flex items-center">
          <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span>{serviceData.totalProviders || 50} জন প্রদানকারী</span>
        </div>
      </div>
    </div>
  );
}
