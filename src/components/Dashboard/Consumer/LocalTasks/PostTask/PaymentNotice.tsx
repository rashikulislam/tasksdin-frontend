// components/task/PaymentNotice.tsx
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface PaymentNoticeProps {
  isMobile: boolean;
}

export const PaymentNotice = ({ isMobile }: PaymentNoticeProps) => (
  <Card className={`mb-6 border-primary/20 ${isMobile ? "card-mobile" : ""}`}>
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
        <div>
          <h4 className="font-semibold text-primary mb-1">পেমেন্ট প্রয়োজন</h4>
          <p className={`text-muted-foreground ${isMobile ? "text-sm" : ""}`}>
            আপনার কাজটি লাইভ করতে ৳৫০ পোস্টিং ফি প্রদান করতে হবে। এটি মানসম্মত
            সাবমিশন নিশ্চিত করে এবং স্প্যাম প্রতিরোধে সহায়তা করে।
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);
