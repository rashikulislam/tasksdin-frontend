"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Clock } from "lucide-react";
import Link from "next/link";
import { IProposal } from "@/interfaces/proposal";
import moment from "moment";
import { MdPinEnd, MdStart } from "react-icons/md";
import ReviewForm from "@/components/Reusable/ReviewForm";
import { useState } from "react";

interface ContractCardProps {
  contract: IProposal;
}

export function CompleteContractCard({ contract }: ContractCardProps) {
  const [reviewOpen, setReviewOpen] = useState(false);

  return (
    <div>
      <Card className="w-full border border-gray-200 rounded-2xl overflow-hidden shadow transition-shadow duration-300">
        {/* Header */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 pb-3">
          <div className="">
            <CardTitle className="text-lg sm:text-xl font-bold text-primary  ">
              {contract?.task?.task_title}{" "}
            </CardTitle>
            <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">
              {contract?.task?.description}
            </p>
          </div>
        </CardHeader>

        <CardContent className="flex flex-row lg:flex-col gap-2">
          {/* Provider Info */}
          <div>
            <div className="flex  items-center gap-4  bg-muted/20 rounded-xl">
              <Avatar className="h-16 w-16 ring-2 ring-primary/40">
                <AvatarImage src={contract?.provider?.profile_img} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {contract?.provider?.full_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
                <div>
                  <p className="font-semibold text-base sm:text-lg text-gray-600">
                    {contract?.provider?.full_name}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-5">
              {contract?.description && (
                <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">
                  {contract?.description}
                </p>
              )}

              <div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 p-4 bg-muted/20 rounded-xl">
                  <div>
                    <p className="text-sm text-muted-foreground">পেমেন্ট</p>
                    <p className="text-lg sm:text-xl font-bold text-primary">
                      ৳{contract?.proposal_price}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" /> পোস্ট করা হয়েছে
                    </p>
                    <p className="text-sm sm:text-base font-medium text-gray-400">
                      {contract?.task?.created_at
                        ? moment(contract.task.created_at).format("lll")
                        : "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MdStart className="w-4 h-4" /> কাজ শুরু হয়েছে
                    </p>
                    <p className="text-sm sm:text-base font-medium text-gray-400">
                      {contract?.created_at
                        ? moment(contract.task.created_at).format("lll")
                        : "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MdPinEnd className="w-4 h-4" /> শেষ সময়
                    </p>
                    <p className="text-sm sm:text-base font-medium text-gray-400">
                      {contract?.task?.deadline
                        ? moment(contract.task.deadline).format("lll")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Button variant="default" className="flex-1 ">
                <Link
                  href={`/dashboard/consumer/local-tasks/contracts/${contract?.id}`}
                  className="flex items-center justify-center gap-2 w-full"
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" /> বিস্তারিত
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={() => setReviewOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 w-full"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" /> রিভিউ দিন
              </Button>

              {/* <Button variant="outline" className="flex-1 ">
              <Link
                href={`/dashboard/consumer/local-tasks/messages?con=${contract?.conversation?.id}`}
                className="flex items-center justify-center gap-2 w-full"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> বার্তা
              </Link>
            </Button> */}
            </div>
          </div>
        </CardContent>
      </Card>
      {reviewOpen && (
        <ReviewForm
          isOpen={reviewOpen}
          onClose={() => setReviewOpen(false)}
          providerId={contract?.provider_id}
        />
      )}
    </div>
  );
}
