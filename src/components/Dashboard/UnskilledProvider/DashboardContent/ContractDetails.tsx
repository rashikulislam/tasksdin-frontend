"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Calendar,
  Star,
  MessageCircle,
  Phone,
  Mail,
  CreditCard,
  Map,
} from "lucide-react";
import { INonSkillContractProvider } from "@/interfaces/proposal";
import moment from "moment";
import "moment/locale/bn";
import Link from "next/link";
import { calculateDistance } from "../../Common/utils/calculateDistance";
import "moment/locale/bn";
import { useAlert } from "@/components/Reusable/AlertModal";
import { useSendCompleteTaskConfirmationMutation } from "@/redux/features/contract.feature";
interface UnskilledContractDetailsProps {
  contract: INonSkillContractProvider;
}

const UnskilledContractDetails = ({
  contract,
}: UnskilledContractDetailsProps) => {
  const { showConfirm, showAlert } = useAlert();
  const [mutateAsync, { isLoading }] =
    useSendCompleteTaskConfirmationMutation();
  const handleSendRequestToComplete = async (id: string) => {
    showConfirm({
      title: "আপনি কি কাজটি সম্পন্ন হয়েছে বলে নিশ্চিত করবেন?",
      description:
        "প্রোভাইডার কাজ শেষের অনুরোধ পাঠিয়েছে। গ্রহণ করলে কাজটি সম্পন্ন হিসেবে আপডেট হবে।",
      confirmText: "হ্যাঁ, সম্পন্ন হয়েছে",
      cancelText: "এখন না",
      onConfirm: async () => {
        try {
          const result = await mutateAsync(id).unwrap();
          if (result?.success) {
            showAlert({
              type: "success",
              title: result?.message,
            });
            return;
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log(error);
          return showAlert({
            type: "error",
            title:
              error?.data?.message ||
              "কাজ সম্পন্ন করার অনুরোধ গ্রহণ করা যায়নি",
          });
        }
      },
    });
  };
  return (
    <div className="bg-background pb-6 pt-5">
      <div>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* বাম সাইড */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl">
                    {contract?.task?.task_title}
                  </CardTitle>
                  <Badge
                    variant={
                      contract?.status === "ON_GOING" ? "default" : "outline"
                    }
                  >
                    {contract?.status === "ON_GOING" ? "চলমান" : "সম্পন্ন"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">কাজের বর্ণনা</h3>
                  <p className="text-muted-foreground">
                    {contract?.task?.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      আপনার আয়
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      ৳{contract?.proposal_price}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      পেমেন্ট স্ট্যাটাস
                    </p>
                    {contract?.payment_status ? (
                      <Badge className="bg-success text-success-foreground">
                        পরিশোধ হয়েছে
                      </Badge>
                    ) : (
                      <Badge className="bg-warning text-warning-foreground">
                        অপরিশোধিত
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="truncate text-blue-600 font-semibold">
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
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      শুরু তারিখ:{" "}
                      {moment(contract?.accepted_date).format("LL, A h:mm")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      শেষ করার তারিখ:{" "}
                      {moment(
                        contract?.completion_date || contract?.task?.deadline,
                      ).format("LL, A h:mm")}
                    </span>
                  </div>
                </div>

                {contract?.status === "ON_GOING" && (
                  <Button
                    disabled={isLoading || contract?.end_task}
                    className="w-full mt-4"
                    onClick={() => handleSendRequestToComplete(contract?.id)}
                  >
                    {contract?.end_task
                      ? "অনুরোধ পাঠানো হয়েছে"
                      : "কাজ শেষের অনুরোধ"}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* পেমেন্ট টাইমলাইন */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  পেমেন্টের ধাপ
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="h-8 w-8 rounded-full bg-success flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">কাজ গ্রহণ করা হয়েছে</p>
                      <p className="text-xs text-muted-foreground">
                        {moment(contract?.created_at).format("ll")}
                      </p>
                    </div>
                  </div>

                  {contract?.status === "PENDING" ? (
                    <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                      <div className="h-8 w-8 rounded-full bg-warning flex items-center justify-center">
                        <span className="text-white text-sm">⏳</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">পেমেন্ট অপেক্ষমান</p>
                        <p className="text-xs text-muted-foreground">
                          কাজ সম্পন্ন হলে পেমেন্ট রিলিজ হবে
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                      <div className="h-8 w-8 rounded-full bg-success flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">পেমেন্ট পাওয়া গেছে</p>
                        <p className="text-xs text-muted-foreground">
                          ৳{contract?.proposal_price}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ডান সাইড */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>গ্রাহকের তথ্য</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* প্রোফাইল */}
                <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={contract?.task?.consumer?.profile_img as string}
                      alt={contract?.task?.consumer?.full_name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {contract?.task?.consumer?.full_name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {contract?.task?.consumer?.full_name}
                    </h3>

                    <div className="mt-1">
                      <span className="text-sm text-muted-foreground">
                        {contract?.totalJobPosted} কাজ পোস্ট করা হয়েছে
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mt-1">
                      সদস্য:{" "}
                      {moment(contract?.task?.consumer?.created_at).format(
                        "ll",
                      )}
                    </p>
                  </div>
                </div>

                {/* যোগাযোগ */}
                <div>
                  <h4 className="font-semibold mb-2">যোগাযোগের তথ্য</h4>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {contract?.task?.consumer?.phone_number}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {contract?.task?.consumer?.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center flex-col w-full gap-2">
                  <Link
                    href={`/dashboard/general-provider/messages?con=${contract?.conversation?.id}`}
                    className="w-full"
                  >
                    <Button className="w-full" size="lg">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      ক্লায়েন্টকে বার্তা পাঠান
                    </Button>
                  </Link>

                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${contract?.task?.latitude},${contract?.task?.longitude}`}
                    className="w-full"
                    target="_blank"
                  >
                    <Button className="w-full" size="lg" variant={"secondary"}>
                      <Map className="w-4 h-4 mr-2" />
                      লোকেশন দেখুন
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnskilledContractDetails;
