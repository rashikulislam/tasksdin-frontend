"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  ChefHat,
  Home,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { IMaidOrder } from "@/interfaces/maid";

interface RequestCardProps {
  request: IMaidOrder;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500",
  APPROVED: "bg-blue-500",
  ASSIGNED: "bg-green-500",
  ACTIVE: "bg-green-600",
  COMPLETED: "bg-gray-500",
};

const statusLabels: Record<string, string> = {
  PENDING: "অপেক্ষমান",
  APPROVED: "অনুমোদিত",
  ASSIGNED: "বুয়া অ্যাসাইন",
  ACTIVE: "সক্রিয়",
  COMPLETED: "সম্পন্ন",
};

export default function RequestCard({ request }: RequestCardProps) {
  const router = useRouter();

  return (
    <Card className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Top Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-400" />

      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <Badge
              className={`${statusColors[request.status]} text-white px-3 py-1 rounded-full text-xs`}
            >
              {statusLabels[request.status]}
            </Badge>

            <p className="text-xs text-muted-foreground mt-2">
              আবেদন করেছেন:{" "}
              {new Date(request.createdAt).toLocaleDateString("bn-BD")}
            </p>
          </div>

          <div className="text-right bg-green-50 px-4 py-2 rounded-xl">
            <p className="text-xl font-bold text-green-700">
              ৳{request.totalBill?.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">মোট বিল</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-5">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <Users className="w-4 h-4 text-gray-600" />
            </div>
            <span>{request.people} জন সদস্য</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <ChefHat className="w-4 h-4 text-gray-600" />
            </div>
            <span>
              {request.timesPerDay} বেলা রান্না (
              {request.cookingTime?.replaceAll("_", " ও ")})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <Calendar className="w-4 h-4 text-gray-600" />
            </div>
            <span>
              শুরু: {new Date(request.startingDate).toLocaleDateString("bn-BD")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <Home className="w-4 h-4 text-gray-600" />
            </div>
            <span>পেমেন্ট: {request.paymentDate} তারিখ</span>
          </div>
        </div>

        {/* Extra Services */}
        <div className="space-y-2 text-sm mb-4 border-t pt-4">
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
              👶 শিশু যত্ন: {request.childAge} বছর • {request.childcareHour}{" "}
              ঘন্টা (৳{request.childCareAmount})
            </p>
          )}

          <p>📍 ঠিকানা: {request.address}</p>
          <p>📞 ফোন: {request.consumerPhoneNumber}</p>
        </div>

        {/* Trial */}
        {request.freeTrailDate && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm mb-4">
            🧪 ট্রায়াল:{" "}
            {new Date(request.freeTrailDate).toLocaleDateString("bn-BD")} •{" "}
            {request.trailTime}
          </div>
        )}

        {/* Action Button */}
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
          onClick={() =>
            router.push(
              `/dashboard/consumer/maid-service/my-request/${request.id}`,
            )
          }
        >
          বিস্তারিত দেখুন
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
