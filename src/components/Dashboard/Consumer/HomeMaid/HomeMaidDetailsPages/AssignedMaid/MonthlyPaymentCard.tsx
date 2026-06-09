"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

import { Calendar, CreditCard, Minus, Receipt } from "lucide-react";

// import { mockMonthlyPayments, MonthlyPayment } from "../../Data/MockData";
import { IMaidOrder } from "@/interfaces/maid";
import { Checkbox } from "@/components/ui/checkbox";

export function MonthlyPaymentCard({ request }: { request: IMaidOrder }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [monthlyPayments, setMonthlyPayments] =
  //   useState<MonthlyPayment[]>(mockMonthlyPayments);
  const [checked, setChecked] = useState(false);

  if (!request) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          আবেদন পাওয়া যায়নি
        </CardContent>
      </Card>
    );
  }

  const badDays = request?._count?.maidAbsences as number;
  const dailyRate = request?.totalBill / 30;
  const deduction = checked ? Math.round(dailyRate * badDays) : 0;
  const adjustedPrice = request?.totalBill - deduction;

  // const payMonthly = (paymentId: string) => {
  //   setMonthlyPayments((prev) =>
  //     prev.map((p) =>
  //       p.id === paymentId
  //         ? {
  //             ...p,
  //             status: "paid",
  //             paidDate: new Date().toISOString().split("T")[0],
  //           }
  //         : p,
  //     ),
  //   );
  // };

  // const handlePayMonthly = (paymentId: string, amount: number) => {
  //   payMonthly(paymentId);
  //   toast.success("মাসিক বেতন পরিশোধ সফল!", {
  //     description: `৳${amount.toLocaleString()} পরিশোধ করা হয়েছে`,
  //   });
  // };

  const handleAdvancePayment = () => {
    toast.success("অগ্রিম পেমেন্ট সফল!", {
      description: `৳${adjustedPrice.toLocaleString()} পরিশোধ করা হয়েছে (${badDays} খারাপ দিন বাদ)`,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          মাসিক বেতন পেমেন্ট
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          খারাপ দিন বাদে অগ্রিম মাসিক বেতন প্রদান করুন
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Bad Days */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg space-y-3">
          <Label className="flex items-center gap-2 text-yellow-800">
            <Minus className="w-4 h-4" />
            খারাপ দিন বাদ দিন
          </Label>

          <Input type="number" min={0} max={30} value={badDays} readOnly />

          {badDays > 0 && (
            <p className="text-xs text-yellow-700">
              {badDays} দিনের জন্য ৳{deduction.toLocaleString()} বাদ যাবে
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="skipDays"
            checked={checked}
            onCheckedChange={() => setChecked(!checked)}
          />
          <Label htmlFor="skipDays" className="cursor-pointer">
            বুয়ার না আসা দিনগুলো বাদ দিন
          </Label>
        </div>

        {/* Summary */}
        <div className="p-4 bg-primary/5 rounded-xl border space-y-2">
          <div className="flex justify-between">
            <span>মূল মাসিক বেতন</span>
            <span>৳{request?.totalBill.toLocaleString()}</span>
          </div>

          {badDays > 0 && (
            <div className="flex justify-between text-yellow-700">
              <span>বাদ ({badDays} দিন)</span>
              <span>-৳{deduction.toLocaleString()}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between font-bold text-lg">
            <span>প্রদেয়</span>
            <span className="text-primary">
              ৳{adjustedPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <Button className="w-full h-12" onClick={handleAdvancePayment}>
          <CreditCard className="w-5 h-5 mr-2" />
          অগ্রিম মাসিক বেতন দিন
        </Button>

        <Separator />

        {/* Payment History */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            পেমেন্ট রেকর্ড
          </h4>

          {/* {requestPayments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              কোনো মাসিক পেমেন্ট নেই
            </p>
          ) : (
            <div className="space-y-2">
              {requestPayments.map((payment) => (
                <div
                  key={payment.id}
                  className={`flex justify-between items-center p-3 rounded-lg border ${
                    payment.status === "paid"
                      ? "bg-green-50 border-green-200"
                      : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {payment.status === "paid" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {payment.month} {payment.year}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {payment.status === "paid"
                          ? `পরিশোধ: ${payment.paidDate}`
                          : "বাকি আছে"}
                      </p>
                    </div>
                  </div>

                  {payment.status === "pending" ? (
                    <Button
                      size="sm"
                      onClick={() =>
                        handlePayMonthly(payment.id, payment.amount)
                      }
                    >
                      পরিশোধ
                    </Button>
                  ) : (
                    <Badge className="bg-green-600">পরিশোধিত</Badge>
                  )}
                </div>
              ))}
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
}
