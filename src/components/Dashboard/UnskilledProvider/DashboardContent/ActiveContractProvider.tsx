import { UrgencyBadge } from "@/components/Reusable/UrgencyBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProposal } from "@/interfaces/proposal";
import {
  CheckCircle,
  Clock,
  Eye,
  MapPin,
  MessageCircle,
  Play,
} from "lucide-react";
import moment from "moment";
import "moment/locale/bn";
import Link from "next/link";
import { MdPinEnd, MdStart } from "react-icons/md";
import { calculateDistance } from "../../Common/utils/calculateDistance";

const ActiveContractProvider = ({ contract }: { contract: IProposal }) => {
  const isOngoing = contract.status === "ON_GOING";
  return (
    <Card className="w-full border border-gray-200 rounded-2xl overflow-hidden shadow transition-shadow duration-300">
      {/* Header */}
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 pb-3">
        <div className="">
          <CardTitle className="text-lg sm:text-xl font-bold text-primary  ">
            {contract?.task?.task_title}{" "}
          </CardTitle>
          {contract?.task?.urgency_level && (
            <UrgencyBadge level={contract?.task?.urgency_level} />
          )}
        </div>

        <Badge
          variant={isOngoing ? "default" : "outline"}
          className="flex items-center gap-1 text-sm sm:text-base px-2 py-1"
        >
          {isOngoing ? (
            <>
              <Play className="w-4 h-4" /> চলমান
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" /> সম্পন্ন
            </>
          )}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-row lg:flex-col gap-2">
        {/* Provider Info */}
        <div>
          <div className="flex flex-row items-center gap-4  bg-muted/20 rounded-xl">
            <Avatar className="h-16 w-16 ring-2 ring-primary/40">
              <AvatarImage src={contract?.task?.consumer?.profile_img} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {contract?.task?.consumer?.full_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
              <div>
                <p className="font-semibold text-base sm:text-lg text-gray-600">
                  {contract?.task?.consumer?.full_name}
                </p>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />{" "}
                    {`${calculateDistance(
                      {
                        lat1: contract?.task?.latitude,
                        lng1: contract?.task?.longitude,
                      },
                      {
                        lat2: contract?.latitude as number,
                        lng2: contract?.longitude as number,
                      },
                    ).toFixed(1)} km`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">
              {contract?.description || contract?.task?.description}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground line-clamp-3 pt-2">
              <span className="pr-2 text-black">অতিরিক্ত ঠিকানা:</span>{" "}
              {contract?.task?.location_info}
            </p>
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
                      ? moment(contract.task.created_at).format("ll, A h:mm")
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MdStart className="w-4 h-4" /> কাজ শুরু হয়েছে
                  </p>
                  <p className="text-sm sm:text-base font-medium text-gray-400">
                    {contract?.accepted_date
                      ? moment(contract?.accepted_date).format("ll, A h:mm")
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MdPinEnd className="w-4 h-4" /> শেষ সময়
                  </p>
                  <p className="text-sm sm:text-base font-medium text-gray-400">
                    {contract?.task?.deadline
                      ? moment(contract.task.deadline).format("ll, A h:mm")
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
                href={`/dashboard/general-provider/contracts/${contract?.id}`}
                className="flex items-center justify-center gap-2 w-full"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" /> বিস্তারিত
              </Link>
            </Button>

            <Button variant="outline" className="flex-1 ">
              <Link
                href={`/dashboard/general-provider/messages?con=${contract?.conversation?.id}`}
                className="flex items-center justify-center gap-2 w-full"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> বার্তা
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveContractProvider;
