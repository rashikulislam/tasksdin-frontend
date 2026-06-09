"use client";
import React from "react";
import {
  MapPin,
  Phone,
  Calendar,
  Users,
  ChefHat,
  ArrowRight,
  CheckCircle,
  Clock,
  Home,
  AlertTriangle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMaidOrder, STATUS } from "@/interfaces/maid";
import Link from "next/link";

interface Props {
  contract: IMaidOrder;
}

export default function BuaContractCard({ contract }: Props) {
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={contract?.consumer?.profile_img as string} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {contract.consumer?.full_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{contract.consumer?.full_name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                {contract?.address}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Badge
              className={
                contract?.status === STATUS.APPROVED
                  ? "bg-green-500"
                  : "bg-gray-500"
              }
            >
              {contract?.status === STATUS.APPROVED ? "সক্রিয়" : "বন্ধ"}
            </Badge>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          {/* Bua Info */}
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage src={contract?.maid?.profile_img} />
              <AvatarFallback className="bg-green-200 text-green-800">
                {contract?.maid?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <p className="font-medium text-sm">{contract?.maid?.name}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Phone className="w-4 h-4" /> {contract?.maid?.phone_number}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {contract?.maid?.address_details}
              </p>
            </div>

            <Badge className="bg-green-600 text-xs">বুয়া</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-full">
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <span>{contract?.people} জন সদস্য</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-full">
                <ChefHat className="w-4 h-4 text-muted-foreground" />
              </div>
              <span>
                {contract?.timesPerDay} বেলা রান্না (
                {contract?.cookingTime.replaceAll("_", " ও ")})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-full">
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
              <span>
                শুরু:{" "}
                {new Date(contract?.startingDate).toLocaleDateString("bn-BD")}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-full">
                <Home className="w-4 h-4 text-muted-foreground" />
              </div>
              <span>পেমেন্ট: প্রতি মাসের {contract?.paymentDate} তারিখ</span>
            </div>
          </div>

          {/* Payment */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              {contract ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Clock className="w-4 h-4 text-yellow-600" />
              )}

              <span className="text-sm">
                গত মাসের পেমেন্ট: {contract ? "পরিশোধিত" : "বাকি"}
              </span>

              {/* contract.lastPaymentStatus === "paid"  */}
            </div>

            <span className="font-bold text-primary">
              ৳{contract?.totalBill?.toLocaleString()}/মাস
            </span>
          </div>

          <Link href={`/dashboard/agent/bua-contracts/${contract.id}`}>
            <Button className="w-full mt-5">
              বিস্তারিত দেখুন
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
