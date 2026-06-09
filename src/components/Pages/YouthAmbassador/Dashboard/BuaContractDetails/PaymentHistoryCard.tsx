"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  CheckCircle,
  Clock,
  Bell,
  MessageSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { mockContractDetail } from "../Data/mockData";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function PaymentHistoryCard() {
  const [showPaymentNotice, setShowPaymentNotice] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");
  const contract = mockContractDetail;
  const handleSendPaymentNotice = () => {
    toast.success("পেমেন্ট নোটিশ পাঠানো হয়েছে!");
    setShowPaymentNotice(false);
    setNoticeMessage("");
  };
  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              পেমেন্ট ইতিহাস
            </span>
            <Button size="sm" onClick={() => setShowPaymentNotice(true)}>
              <Bell className="w-4 h-4 mr-1" />
              নোটিশ পাঠান
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {contract.paymentHistory.map((payment, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                payment.status === "paid"
                  ? "bg-green-50 border-green-200"
                  : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {payment.status === "paid" ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Clock className="w-5 h-5 text-yellow-600" />
                )}
                <div>
                  <p className="font-medium text-sm">
                    {payment.month} {payment.year}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payment.status === "paid"
                      ? `পরিশোধ: ${payment.paidDate}`
                      : "বাকি আছে"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">৳{payment.amount.toLocaleString()}</p>
                <Badge
                  className={
                    payment.status === "paid" ? "bg-green-500" : "bg-yellow-500"
                  }
                >
                  {payment.status === "paid" ? "পরিশোধিত" : "বাকি"}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={showPaymentNotice} onOpenChange={setShowPaymentNotice}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              পেমেন্ট নোটিশ পাঠান
            </DialogTitle>
            <DialogDescription>
              চলতি মাসের বেতন পরিশোধের জন্য ইউজারকে নোটিশ পাঠান
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="অতিরিক্ত বার্তা লিখুন (ঐচ্ছিক)"
              value={noticeMessage}
              onChange={(e) => setNoticeMessage(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentNotice(false)}
            >
              বাতিল
            </Button>
            <Button onClick={handleSendPaymentNotice}>
              <MessageSquare className="w-4 h-4 mr-2" />
              নোটিশ পাঠান
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
