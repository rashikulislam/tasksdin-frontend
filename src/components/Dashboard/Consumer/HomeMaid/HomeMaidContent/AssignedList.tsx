"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  UserCheck,
  Phone,
  Star,
  Calendar,
  ChevronRight,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { IMaidOrder } from "@/interfaces/maid";
import Link from "next/link";

interface Props {
  assignedRequests: IMaidOrder[];
  onComplain: (id: string) => void;
}

export default function AssignedList({ assignedRequests, onComplain }: Props) {
  if (assignedRequests.length === 0) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="py-16 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <UserCheck className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-2">
            কোনো বুয়া অ্যাসাইন করা হয়নি
          </h3>
          <p className="text-muted-foreground text-sm">
            আপনার আবেদনে বুয়া অ্যাসাইন হলে এখানে দেখাবে
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {assignedRequests?.map((request) => (
        <Card
          key={request.id}
          className="overflow-hidden  hover:shadow-lg transition-all group "
        >
          <CardContent className="p-0">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-primary/5 via-background to-accent/5">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-4 border-primary/20 shadow-lg">
                    <AvatarImage src={request?.maid?.profile_img} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {request?.maid?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{request?.maid?.name}</h3>
                    <Badge className="bg-green-100 text-green-800">
                      যাচাইকৃত
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Phone className="w-4 h-4" />
                    <span>{request?.maid?.phone_number}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      (৪.৯)
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-muted/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      সার্ভিস শুরু
                    </p>
                    <p className="font-medium text-sm">
                      {new Date(request?.startingDate).toLocaleDateString(
                        "bn-BD",
                      )}
                    </p>
                  </div>
                </div>

                <span className="font-bold text-lg text-primary">
                  ৳{request?.totalBill.toLocaleString()}/মাস
                </span>
              </div>

              <div className="flex gap-2">
                <Link
                  className="flex-1"
                  href={`/dashboard/consumer/maid-service/assigned-maid/${request?.id}`}
                >
                  <Button variant="outline" className="w-full">
                    বিস্তারিত
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onComplain(request.id);
                  }}
                >
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  অভিযোগ
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
