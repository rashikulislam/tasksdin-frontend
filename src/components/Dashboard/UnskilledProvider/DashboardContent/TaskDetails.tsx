"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Phone, Mail, Clock, FileText } from "lucide-react";
import { useGetSingleTaskQuery } from "@/redux/features/NonSkilledConsumer.feature";
import { ITask } from "@/interfaces/task";
import moment from "moment";
import TaskDetailsSkeleton from "@/components/Skeletons/TaskDetailsSkeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import ProposalSubmissionModal from "./ProposalSubmissionModal";
import { Button } from "@/components/ui/button";
import { useFindLocationQuery } from "@/redux/features/location.feature";
import { TUserLocation } from "@/interfaces/location";
import { Skeleton } from "@/components/ui/skeleton";
import { calculateDistance } from "../../Common/utils/calculateDistance";
import { MdSocialDistance } from "react-icons/md";
import useKycStatus from "@/hooks/useKycStatus";
import { showToast } from "@/components/Reusable/CustomToast";

const UnskilledTaskDetails = ({ taskId }: { taskId: string }) => {
  const [showProposalModal, setShowProposalModal] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const { isVerified: isKycVerified } = useKycStatus();

  const handleSendProposalClick = () => {
    if (!isKycVerified) {
      showToast({
        type: "error",
        title: "Identity verification required",
        description: "Please complete your KYC verification before submitting a proposal.",
      });
      return router.push("/dashboard/general-provider/kyc");
    }
    setShowProposalModal(true);
  };

  const { data, isLoading } = useGetSingleTaskQuery(taskId, {
    refetchOnMountOrArgChange: true,
  });
  const task = data?.data as ITask;

  const { data: locationsData, isLoading: getLoading } =
    useFindLocationQuery(undefined);
  const locations = (locationsData?.data as TUserLocation[]) || [];
  const filterDefault = locations?.find(
    (l: TUserLocation) => l?.is_default === true
  );

  return (
    <>
      <div className="min-h-screen bg-background pb-16">
        {/* <div className="sticky top-0 z-50 bg-card border-b border-border p-4 flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Task Details</h1>
        </div> */}

        {isLoading ? (
          <TaskDetailsSkeleton isMobile={isMobile} />
        ) : (
          <div className="container mx-auto p-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Side - Task Details */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-2xl lg:text-3xl">
                        {task?.task_title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2 text-xl">
                        <FileText className="w-4 h-4" />
                        বিস্তারিত বিবরণ
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {task?.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-muted-foreground mb-1">
                          প্রস্তাবিত পেমেন্ট
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          ৳{task?.budget}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">সময়কাল</p>
                        <p className="text-lg font-semibold">
                          {moment(task?.deadline).format(
                            "DD MMM YYYY, hh:mm a"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MdSocialDistance className="w-4 h-4 text-muted-foreground" />

                          <span className="truncate text-[#3C83F6] font-semibold">
                            {getLoading ? (
                              <Skeleton className="w-16 h-4 rounded bg-slate-200 dark:bg-slate-700" />
                            ) : (
                              <>{`${calculateDistance(
                                {
                                  lat1: task?.consumer?.user?.locations[0]
                                    ?.latitude,
                                  lng1: task?.consumer?.user?.locations[0]
                                    ?.longitude,
                                },
                                {
                                  lat2: filterDefault?.latitude as number,
                                  lng2: filterDefault?.longitude as number,
                                }
                              ).toFixed(1)} km`}</>
                            )}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[#3C83F6] font-semibold">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          {task?.consumer?.user?.locations[0]?.area}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="">
                          পোস্ট করা হয়েছে:{" "}
                          {moment(task?.created_at).format(
                            "DD MMM YYYY, hh:mm a"
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {task?.location_info}
                      </p>
                    </div>

                    {/* <div>
                    <h3 className="font-semibold mb-2">ট্যাগ</h3>
                    <div className="flex flex-wrap gap-2">
                      {task..map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div> */}
                  </CardContent>
                </Card>
              </div>

              {/* Right Side - Client Details */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">ক্লায়েন্ট তথ্য</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Client Profile */}
                    <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={task?.consumer?.profile_img}
                          alt={task?.consumer?.full_name}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                          {task?.consumer?.full_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-2xl">
                          {task?.consumer?.full_name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">4</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            • 20 টি কাজ পোস্ট করেছেন
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          সদস্য:{" "}
                          {moment(task?.consumer?.created_at).format(
                            "DD MMM YYYY"
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <h4 className="font-semibold mb-2">সম্পর্কে</h4>
                      <p className="text-muted-foreground">
                        Here is bio comming
                      </p>
                    </div>

                    {/* Location */}
                    {/* <div>
                      <h4 className="font-semibold mb-2">ঠিকানা</h4>
                      <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="">{"Gazipur"}</span>
                      </div>
                    </div> */}

                    {/* Contact Information */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">যোগাযোগের তথ্য</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{task?.consumer?.phone_number}</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{task?.consumer?.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Send Proposal Button */}
                    <Button
                      onClick={handleSendProposalClick}
                      className="w-full"
                      size="lg"
                    >
                      প্রস্তাব পাঠান
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      <ProposalSubmissionModal
        isOpen={showProposalModal}
        onClose={() => setShowProposalModal(false)}
        task={task}
      />
    </>
  );
};

export default UnskilledTaskDetails;
