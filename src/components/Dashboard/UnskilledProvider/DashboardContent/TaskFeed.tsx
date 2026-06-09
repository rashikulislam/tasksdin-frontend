"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, User } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ProposalSubmissionModal from "./ProposalSubmissionModal";
import { useState } from "react";
import useKycStatus from "@/hooks/useKycStatus";
import { showToast } from "@/components/Reusable/CustomToast";
import { ITask } from "@/interfaces/task";
import { calculateDistance } from "../../Common/utils/calculateDistance";
import { useFindLocationQuery } from "@/redux/features/location.feature";
import { TUserLocation } from "@/interfaces/location";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import "moment/locale/bn";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";
moment.locale("bn");
export interface ITaskConsumer {
  consumer_id: string;
  full_name: string;
}

interface UnskilledTaskFeedProps {
  tasks: ITask[];
}

const UnskilledTaskFeed = ({ tasks }: UnskilledTaskFeedProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [task, setTask] = useState<ITask | null>(null);
  const router = useRouter();
  const { isVerified: isKycVerified } = useKycStatus();

  const handleSendProposalClick = (selectedTask: ITask) => {
    if (!isKycVerified) {
      showToast({
        type: "error",
        title: "Identity verification required",
        description: "Please complete your KYC verification before submitting a proposal.",
      });
      return router.push("/dashboard/general-provider/kyc");
    }
    setIsOpen(true);
    setTask(selectedTask);
  };

  const { data, isLoading: getLoading } = useFindLocationQuery(undefined);
  const locations = (data?.data as TUserLocation[]) || [];
  const filterDefault = locations?.find(
    (l: TUserLocation) => l?.is_default === true,
  );
  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-between items-center pt-6">
          <h3 className="text-xl font-semibold">নতুন কাজসমূহ</h3>
          <Badge variant="secondary" className="text-[17px]">
            আপনার এলাকায় {tasks?.length} টি কাজ
          </Badge>
        </div>

        {!tasks?.length ? (
          <ManageStatusState
            type="notFound"
            message="কোনো টাস্ক পাওয়া যায়নি"
            description="এই মুহূর্তে আপনার এলাকায় কোনো টাস্ক নেই।"
          />
        ) : (
          <>
            {tasks?.map((task: ITask) => (
              <Card
                key={task?.id}
                className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary"
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between flex-col lg:flex-row">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-primary text-2xl leading-tight">
                            {task?.task_title}
                          </h4>
                          {task?.urgency_level == "high" && (
                            <Badge
                              variant="destructive"
                              className="text-xs px-2 py-0?.5"
                            >
                              জরুরি
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {task?.description}
                        </p>
                      </div>
                      <div>
                        {task?.applied && (
                          <p className="bg-red-500 px-4 py-1 text-white rounded text-sm lg:text-[16px]">
                            Applied
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate text-blue-600 font-semibold">
                          {getLoading ? (
                            <Skeleton className="w-16 h-4 rounded bg-slate-200 dark:bg-slate-700" />
                          ) : (
                            <>{`${calculateDistance(
                              {
                                lat1: task?.latitude,
                                lng1: task?.longitude,
                              },
                              {
                                lat2: filterDefault?.latitude as number,
                                lng2: filterDefault?.longitude as number,
                              },
                            ).toFixed(1)} কিমি`}</>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>
                          {moment(task?.deadline).format("ll, A h:mm")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        ৳
                        <span className="font-semibold text-green-600">
                          {task?.budget} টাকা
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">
                          {task?.consumer?.full_name}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between pt-2 border-t">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            পোস্ট করা হয়েছে:{" "}
                            {moment(task?.created_at).format("ll, A h:mm")}
                          </span>

                          {/* <span className="font-semibold text-primary">
                            {task?.area}
                          </span> */}
                        </div>
                        <p className="text-sm text-muted-foreground pt-1">
                          {task?.location_info}
                        </p>
                      </div>
                      {task?.applied ? (
                        ""
                      ) : (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-3 text-xs"
                          >
                            <Link
                              href={`/dashboard/general-provider/tasks-feed/${task?.id}`}
                            >
                              বিস্তারিত
                            </Link>
                          </Button>
                          <Button
                            onClick={() => handleSendProposalClick(task)}
                            size="sm"
                            className="h-8 px-4 text-xs font-medium"
                          >
                            গ্রহণ করুন
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
      {
        <ProposalSubmissionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          task={task as ITask}
        />
      }
    </>
  );
};

export default UnskilledTaskFeed;
