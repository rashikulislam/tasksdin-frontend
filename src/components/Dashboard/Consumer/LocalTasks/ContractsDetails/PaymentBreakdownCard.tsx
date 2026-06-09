// components/contract/PaymentBreakdownCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

type PaymentBreakdownCardProps = {
  price: number;
};

export default function PaymentBreakdownCard({
  price,
}: PaymentBreakdownCardProps) {
  const serviceFee = Number(price);
  const platformFee = serviceFee * 0.1;
  const total = serviceFee + platformFee;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          পেমেন্ট তথ্য
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">সার্ভিস চার্জ</span>
            <span className="font-medium">৳{serviceFee}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">
              প্ল্যাটফর্ম ফি (১০%)
            </span>
            <span className="font-medium">৳{platformFee.toFixed(0)}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
            <span className="font-semibold">মোট পরিশোধ</span>
            <span className="text-xl font-bold text-primary">
              ৳{total.toFixed(0)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
