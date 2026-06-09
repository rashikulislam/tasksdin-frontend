"use client";

import {
  Phone,
  Calendar,
  Clock,
  Check,
  Users,
  ChefHat,
  Home,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IMaidOrder, TAssignMaidModal } from "@/interfaces/maid";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AssignBuaModal from "./Modals/AssignBuaModal";
import { useState } from "react";

interface Props {
  buaHireRequests: IMaidOrder[];
}

const statusConfig = {
  PENDING: {
    label: "অপেক্ষমান",
    badge: "bg-yellow-100 text-yellow-700 border-yellow-300",
    accent: "from-yellow-400 to-yellow-500",
    icon: <Clock className="w-3 h-3 mr-1" />,
  },
  APPROVED: {
    label: "অনুমোদিত",
    badge: "bg-green-100 text-green-700 border-green-300",
    accent: "from-green-500 to-emerald-400",
    icon: <Check className="w-3 h-3 mr-1" />,
  },
  REJECTED: {
    label: "বাতিল",
    badge: "bg-red-100 text-red-700 border-red-300",
    accent: "from-red-400 to-red-500",
    icon: <Clock className="w-3 h-3 mr-1" />,
  },
};

export default function BuaRequestsTab({ buaHireRequests }: Props) {
  const [selectedRequest, setSelectedRequest] =
    useState<TAssignMaidModal | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const handleOpenAssignMaidModal = (request: IMaidOrder) => {
    setShowAssignModal(true);
    const data: TAssignMaidModal = {
      order_id: request?.id,
      full_name: request?.consumer?.full_name,
      mobile_number:
        request?.consumerPhoneNumber || request?.consumer?.phone_number,
      address: request?.address,
      consumer_location: request?.consumer?.user?.locations[0],
    };
    setSelectedRequest(data);
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          বুয়া হায়ার রিকুয়েস্ট
        </h2>
        <p className="text-muted-foreground text-sm">
          ব্যবহারকারীদের থেকে আসা রিকুয়েস্ট তালিকা
        </p>
      </div>

      {/* List */}
      <div className="grid gap-6">
        {buaHireRequests.map((request) => {
          const status = statusConfig[request.status];

          return (
            <Card
              key={request.id}
              className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Top Accent Bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${status.accent}`} />

              <CardContent className="p-6 space-y-5">
                {/* Header Section */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <Avatar className="h-14 w-14 border">
                        <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                          {request?.consumer?.full_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Info */}
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold leading-none">
                          {request?.consumer?.full_name}
                        </h3>

                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{request?.consumerPhoneNumber}</span>
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`inline-flex my-3 items-center px-3 py-1 rounded-full text-xs ${status.badge}`}
                    >
                      {status.icon}
                      {status.label}
                    </Badge>
                    <p className="text-sm mt-2 text-muted-foreground mt-2">
                      আবেদন করেছেন:{" "}
                      {new Date(request.createdAt).toLocaleDateString("bn-BD")}
                    </p>
                  </div>

                  <div className="text-right bg-primary/5 px-4 py-2 rounded-xl">
                    <p className="text-xl font-bold text-primary">
                      ৳{request.totalBill.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">মোট বিল</p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      <Users className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span>{request.people} জন সদস্য</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      <ChefHat className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span>
                      {request.timesPerDay} বেলা রান্না (
                      {request.cookingTime.replaceAll("_", " ও ")})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span>
                      শুরু:{" "}
                      {new Date(request.startingDate).toLocaleDateString(
                        "bn-BD",
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      <Home className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span>পেমেন্ট: {request.paymentDate} তারিখ</span>
                  </div>
                </div>

                {/* Extra Services */}
                <div className="space-y-2 text-sm border-t pt-4">
                  {request.morningCookingTime && (
                    <p>🌅 সকাল রান্না: {request.morningCookingTime}</p>
                  )}
                  {request.noonCookingTime && (
                    <p>🌞 দুপুর রান্না: {request.noonCookingTime}</p>
                  )}
                  {request.nightCookingTime && (
                    <p>🌙 রাত রান্না: {request.nightCookingTime}</p>
                  )}

                  {request.clothWashing && (
                    <p>
                      👕 কাপড় ধোয়া: {request.clothWashing} বার (৳
                      {request.clothWashingAmount})
                    </p>
                  )}

                  {request.cleaningToilet && (
                    <p>
                      🚽 টয়লেট পরিষ্কার: {request.cleaningToilet} বার (৳
                      {request.cleaningToiletAmount})
                    </p>
                  )}

                  {request.childAge && (
                    <p>
                      👶 শিশু যত্ন: {request.childAge} বছর •{" "}
                      {request.childcareHour} ঘন্টা (৳
                      {request.childCareAmount})
                    </p>
                  )}

                  <p>📍 ঠিকানা: {request.address}</p>
                  <p>📞 ফোন: {request.consumerPhoneNumber}</p>
                </div>

                {/* Trial */}
                {request.freeTrailDate && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm">
                    🧪 ট্রায়াল:{" "}
                    {new Date(request.freeTrailDate).toLocaleDateString(
                      "bn-BD",
                    )}{" "}
                    • {request.trailTime}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <Button
                    className="flex-1 rounded-lg h-10"
                    onClick={() => handleOpenAssignMaidModal(request)}
                  >
                    বুয়া অ্যাসাইন করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <AssignBuaModal
        open={showAssignModal}
        onOpenChange={setShowAssignModal}
        selectedRequest={selectedRequest}
        setSelectedRequest={setSelectedRequest}
      />
    </div>
  );
}
