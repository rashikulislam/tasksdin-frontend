"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ServiceCard from "./ServiceCard";
import { useGetLocalTaskCategoryQuery } from "@/redux/features/LocalTaskService.features";
import { PopularServiceItem, Service } from "@/interfaces";
import NonSkillCategorySkeleton from "@/components/Skeletons/NonSkillCategorySkeleton";

const PopularServices = () => {
  const { data: apiData, isLoading } = useGetLocalTaskCategoryQuery(undefined);

  const services =
    apiData?.data?.map((item: Service) => ({
      id: item.id,
      title: item.name,
      tags: item.tags,
      price: `${item.avg_min_price_range} - ${item.avg_max_price_range}`,
      duration: item.duration || "১-৪ ঘন্টা",
      rating: item.rating,
      providers: item.totalProviders || 50,
      image: item.image,
      discount: item.discount ? `${item.discount}% ছাড়` : undefined,
      featured: item.priority || false,
      isPopular: item.priority || false,
      slug: item?.slug,
    })) ?? [];

  const isMobile = useIsMobile();

  return (
    <section className="pb-10">
      <div
        className={`flex justify-between items-center mb-6 ${
          isMobile ? "flex-col mb-4" : ""
        }`}
      >
        <div className={isMobile ? "mb-4 text-center" : ""}>
          <h2
            className={`font-bold mb-2 ${
              isMobile ? "text-xl" : "text-2xl lg:text-3xl"
            }`}
          >
            জনপ্রিয় সার্ভিসসমূহ
          </h2>

          <p
            className={`text-muted-foreground ${
              isMobile ? "text-base" : "text-lg"
            }`}
          >
            যাচাইকৃত সেবা প্রদানকারীদের জনপ্রিয় সার্ভিসগুলো দেখুন
          </p>
        </div>

        {!isMobile && (
          <Button variant="outline" size="lg" className="h-10 lg:h-12">
            সব দেখুন
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
      <div>
        {isLoading ? (
          <NonSkillCategorySkeleton isMobile={isMobile} />
        ) : (
          <div
            className={
              isMobile
                ? "grid grid-cols-1 gap-4 h-full"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full"
            }
          >
            {services?.map((service: PopularServiceItem) => (
              <ServiceCard
                key={service.id}
                service={service}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </div>

      {isMobile && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            size="lg"
            className="w-full h-10 lg:h-12 text-base"
          >
            সব দেখুন
          </Button>
        </div>
      )}
    </section>
  );
};

export default PopularServices;
