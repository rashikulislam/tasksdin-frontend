"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import {
  Booking,
  HouseBookingsProps,
  PaymentMethod,
} from "../data/mockHouseData";

const HouseBookings = ({ bookings, onCancelBooking }: HouseBookingsProps) => {
  const router = useRouter();

  const getStatusBadge = (status: Booking["status"]) => {
    const statusConfig = {
      pending: { label: "অপেক্ষমান", variant: "outline" as const, icon: Clock },
      confirmed: {
        label: "নিশ্চিত",
        variant: "default" as const,
        icon: CheckCircle,
      },
      cancelled: {
        label: "বাতিল",
        variant: "destructive" as const,
        icon: XCircle,
      },
      completed: {
        label: "সম্পন্ন",
        variant: "secondary" as const,
        icon: CheckCircle,
      },
    };

    const config = statusConfig[status];

    return (
      <Badge variant={config.variant} className="gap-1">
        <config.icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const getPaymentBadge = (
    status: Booking["paymentStatus"],
    method: Booking["paymentMethod"]
  ) => {
    const methodNames: Record<PaymentMethod, string> = {
      bkash: "বিকাশ",
      nagad: "নগদ",
      card: "কার্ড",
      cash: "নগদ/ক্যাশ",
    };

    if (status === "paid") {
      return (
        <Badge className="gap-1 bg-success/10 text-success border border-success">
          <CheckCircle className="w-3 h-3" />
          পরিশোধিত ({methodNames[method]})
        </Badge>
      );
    }

    return (
      <Badge className="gap-1 bg-warning/10 text-warning border border-warning">
        <AlertCircle className="w-3 h-3" />
        পেমেন্ট বাকি
      </Badge>
    );
  };

  const formatRent = (rent: number) =>
    new Intl.NumberFormat("bn-BD").format(rent);

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <Calendar className="w-20 h-20 mx-auto text-muted-foreground/30 mb-4" />
        <h3 className="text-xl font-semibold mb-2">কোনো বুকিং নেই</h3>
        <p className="text-muted-foreground">আপনি এখনো কোনো বাসা বুক করেননি।</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        আমার বুকিং ({bookings.length}টি)
      </h2>

      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardContent className="p-4 space-y-3">
            <div className="flex gap-4">
              {/* House Image */}
              <Image
                src={booking.house.images[0]}
                alt={booking.house.title}
                width={96}
                height={80}
                className="rounded-lg object-cover"
              />

              {/* Info */}
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex justify-between gap-2">
                  <h4 className="font-semibold truncate">
                    {booking.house.title}
                  </h4>
                  {getStatusBadge(booking.status)}
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {booking.house.area}, {booking.house.city}
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  {getPaymentBadge(
                    booking.paymentStatus,
                    booking.paymentMethod
                  )}
                  <span className="text-primary font-bold">
                    ৳{formatRent(booking.amount)}
                  </span>
                </div>

                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    বুকিং: {format(new Date(booking.bookingDate), "dd/MM/yyyy")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    প্রবেশ: {format(new Date(booking.moveInDate), "dd/MM/yyyy")}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => router.push(`/houses/${booking.house.id}`)}
              >
                <Eye className="w-4 h-4 mr-1" />
                বিস্তারিত
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(`tel:${booking.house.providerPhone}`)
                }
              >
                <Phone className="w-4 h-4" />
              </Button>

              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4" />
              </Button>

              {booking.status === "pending" && onCancelBooking && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onCancelBooking(booking.id)}
                >
                  বাতিল
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HouseBookings;
