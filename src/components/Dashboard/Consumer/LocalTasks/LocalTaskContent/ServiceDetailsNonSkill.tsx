// app/service-details/page.tsx  (বা যেখানে আছে)
"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useGetSingleNonSkillTaskCategoryQuery } from "@/redux/features/LocalTaskService.features";
import ServiceHeader from "@/components/Dashboard/Consumer/LocalTasks/PopularCategoryServicesDetails/ServiceHeader";
import ServiceFeatures from "@/components/Dashboard/Consumer/LocalTasks/PopularCategoryServicesDetails/ServiceFeatures";
import ServiceGuidelines from "@/components/Dashboard/Consumer/LocalTasks/PopularCategoryServicesDetails/ServiceGuidelines";
import TaskFromCategoryService from "@/components/Dashboard/Consumer/LocalTasks/PopularCategoryServicesDetails/TaskFormService";
import ServiceDetailsSkeleton from "@/components/Skeletons/ServiceDetailsSkeleton";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ServiceDetailsNonSkill({ slug }: { slug: string }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data: apiData, isLoading } =
    useGetSingleNonSkillTaskCategoryQuery(slug);

  const handlePostTask = () => {
    // তুমি এখানে API call বা redirect করবে
    alert("Task posting logic here");
  };

  if (isLoading)
    return (
      <div>
        <ServiceDetailsSkeleton isMobile={isMobile} />
      </div>
    );
  if (!apiData?.data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <Button onClick={() => router.push("/")}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pb-0 md:pb-10">
        {/* <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button> */}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow">
              <CardContent className="p-8">
                <ServiceHeader serviceData={apiData?.data} />
                <p className="text-muted-foreground mt-3">
                  {apiData?.data?.description}
                </p>
              </CardContent>
            </Card>

            <ServiceFeatures features={apiData?.data?.features} />
            <ServiceGuidelines />
          </div>

          {/* Right Side - Form */}
          <div>
            <TaskFromCategoryService
              categoryId={apiData?.data?.id}
              onPostTask={handlePostTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
