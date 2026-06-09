// components/local-tasks/ServiceCard.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Zap } from "lucide-react";
import { PopularServiceItem } from "@/interfaces";
import Link from "next/link";
import Image from "next/image";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

interface ServiceCardProps {
  service: PopularServiceItem;
  isMobile: boolean;
}

const ServiceCard = ({ service, isMobile }: ServiceCardProps) => {
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };

  return (
    <Link
      href={`/dashboard/consumer/local-tasks/service-details/${service?.slug}`}
    >
      <Card
        className={`group border cursor-pointer h-full overflow-hidden transition-all duration-300 shadow hover:shadow-md lg:hover:shadow-lg lg:hover:-translate-y-1  bg-gradient-to-br from-background to-secondary/30`}
      >
        <CardContent
          className={isMobile ? "" : "flex flex-col justify-between h-full"}
        >
          <div>
            <div
              className={`flex justify-between items-start ${
                isMobile ? "mb-3" : ""
              }`}
            >
              <div className={isMobile ? "text-3xl" : "text-5xl"}>
                {service?.image && (
                  <Image
                    src={service.image}
                    alt={service?.title || "সেবার ছবি"}
                    width={100}
                    height={100}
                    className="rounded"
                  />
                )}
              </div>

              <div className="flex flex-col gap-1">
                {service.featured && (
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                    <Zap className="w-3 h-3 mr-1" /> ফিচার্ড
                  </Badge>
                )}
                {service.isPopular && (
                  <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" /> জনপ্রিয়
                  </Badge>
                )}
                {service.discount && (
                  <Badge className="bg-warning/20 text-warning border-warning/30 text-xs">
                    {service?.discount}
                  </Badge>
                )}
              </div>
            </div>

            <h3
              className={`font-bold pt-2 group-hover:text-primary transition-colors ${
                isMobile ? "text-lg mb-1" : "text-xl mb-2"
              }`}
            >
              {service.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-2 mt-2">
              {service?.tags?.map((tag: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs px-2.5 py-0.5 bg-accent/20 text-accent border-accent/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div
              className={`space-y-2 ${isMobile ? "mb-4" : "space-y-3 mb-6"}`}
            >
              <div className="flex justify-between items-center">
                <span
                  className={`text-muted-foreground ${
                    isMobile ? "text-sm" : ""
                  }`}
                >
                  মূল্য
                </span>
                <span
                  className={`font-semibold text-primary ${
                    isMobile ? "text-sm" : ""
                  }`}
                >
                  ৳{service.price}
                </span>
              </div>

              {/* <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">সময়কাল</span>
                <span className={`font-medium ${isMobile ? "text-sm" : ""}`}>
                  {service.duration}
                </span>
              </div> */}

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-500 pt-1.5">
                    {service.rating.toFixed(1)}
                  </span>
                  <div className="flex">
                    <Rating
                      style={{ maxWidth: 100 }}
                      value={service.rating}
                      itemStyles={myStyles}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex items-center text-muted-foreground text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {service.providers} জন প্রদানকারী
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground h-10 lg:h-10 sm:text-base">
            এখনই বুক করুন
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceCard;
