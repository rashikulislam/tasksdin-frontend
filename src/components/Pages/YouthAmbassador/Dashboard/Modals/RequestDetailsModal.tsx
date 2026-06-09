"use client";

import React from "react";
import {
  Phone,
  MapPin,
  Calendar,
  Users,
  Clock,
  Check,
  Utensils,
  Home,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BuaHireRequestData } from "../Data/types";

interface RequestDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: BuaHireRequestData | null;
}

export default function RequestDetailsModal({
  open,
  onOpenChange,
  request,
}: RequestDetailsModalProps) {
  if (!request) return null;

  const getCookingPeriodLabel = (period?: string) => {
    switch (period) {
      case "morning-noon":
        return "সকাল ও দুপুর";
      case "morning-night":
        return "সকাল ও রাত";
      case "noon-night":
        return "দুপুর ও রাত";
      case "morning":
        return "সকাল";
      case "noon":
        return "দুপুর";
      case "night":
        return "রাত";
      default:
        return period || "-";
    }
  };

  const getTrialTimeLabel = (slot?: string) => {
    switch (slot) {
      case "morning":
        return "সকাল";
      case "afternoon":
        return "দুপুর";
      case "night":
        return "রাত";
      default:
        return slot || "-";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Home className="w-5 h-5 text-primary" />
            বুয়া হায়ার রিকুয়েস্ট বিস্তারিত
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">স্ট্যাটাস</span>
            {request.status === "pending" ? (
              <Badge
                variant="outline"
                className="border-yellow-600 text-yellow-600"
              >
                <Clock className="mr-1 h-3 w-3" /> অপেক্ষমান
              </Badge>
            ) : (
              <Badge className="bg-green-500">
                <Check className="mr-1 h-3 w-3" /> অ্যাসাইন হয়েছে
              </Badge>
            )}
          </div>

          {request.assignedBua && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">অ্যাসাইন করা বুয়া</span>
              <span className="font-medium">{request.assignedBua}</span>
            </div>
          )}

          <Separator />

          {/* User Info */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              ব্যবহারকারী তথ্য
            </h4>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{request.userName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{request.userPhone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span>{request.address || request.location}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Plan Details */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              প্ল্যান বিবরণ
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">প্ল্যান টাইপ</p>
                <p className="font-medium">
                  {request.planType === "monthly" ? "মাসিক" : "লিভ-ইন"}
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">পরিবার টাইপ</p>
                <p className="font-medium">
                  {request.familyType === "bachelor" ? "ব্যাচেলর" : "পরিবার"}
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">জনসংখ্যা</p>
                <p className="font-medium">
                  {request.numPeople || "-"} জন
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">দৈনিক রান্না</p>
                <p className="font-medium">
                  {request.cookingTimes || "-"} বার
                </p>
              </div>
            </div>
          </div>

          {request.cookingPeriod && (
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
              <Utensils className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">রান্নার সময়:</span>
              <span className="font-medium">
                {getCookingPeriodLabel(request.cookingPeriod)}
              </span>
            </div>
          )}

          {/* Services */}
          {request.services && request.services.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  সেবা সমূহ
                </h4>
                <div className="flex flex-wrap gap-2">
                  {request.services.map((service, index) => (
                    <Badge key={index} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Trial Info */}
          {request.wantTrial && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  ট্রায়াল তথ্য
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
                    <p className="text-xs text-muted-foreground">
                      ট্রায়াল তারিখ
                    </p>
                    <p className="font-medium">
                      {request.trialDate || "-"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
                    <p className="text-xs text-muted-foreground">সময়</p>
                    <p className="font-medium">
                      {getTrialTimeLabel(request.trialTimeSlot)}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Date & Price */}
          <Separator />
          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              তারিখ ও মূল্য
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">শুরুর তারিখ</p>
                <p className="flex items-center gap-1 font-medium">
                  <Calendar className="h-3 w-3" />
                  {request.startDate || "-"}
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">বেতন তারিখ</p>
                <p className="font-medium">
                  {request.salaryPaymentDate || "-"} তারিখ
                </p>
              </div>
            </div>

            {request.totalMonthlyPrice && (
              <div className="rounded-lg bg-primary/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">মাসিক মূল্য</span>
                  <span className="text-2xl font-bold text-primary">
                    ৳{request.totalMonthlyPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Request Date */}
          <div className="pt-2 text-center text-sm text-muted-foreground">
            রিকুয়েস্ট তারিখ: {request.requestDate}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
