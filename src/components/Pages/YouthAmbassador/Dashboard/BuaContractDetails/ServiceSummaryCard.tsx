"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ChefHat, Calendar, CreditCard, FileText } from "lucide-react";
import { IMaidOrder } from "@/interfaces/maid";

export default function ServiceSummaryCard({
  contract,
}: {
  contract: IMaidOrder;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="w-5 h-5" />
          সার্ভিস সারাংশ{" "}
          <span className="text-red-500 text-xl font-bold">
            {" "}
            ৳{contract?.totalBill}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-xs text-muted-foreground">জনসংখ্যা</p>
            <p className="font-bold">{contract?.people} জন</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <ChefHat className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-xs text-muted-foreground">রান্না</p>
            <p className="font-bold">{contract?.timesPerDay} বেলা</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-xs text-muted-foreground">শুরু</p>
            <p className="font-bold">
              {new Date(contract?.startingDate).toLocaleDateString("bn-BD")}
            </p>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg text-center">
            <CreditCard className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-xs text-muted-foreground">মাসিক</p>
            <p className="font-bold text-primary">
              ৳{contract?.totalBill.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="pt-5">
          <h1 className="text-lg font-semibold">অন্যান্য সার্ভিস </h1>

          <div className="gap-2 grid grid-cols-1 lg:grid-cols-2 border-t pt-4">
            {contract?.morningCookingTime && (
              <p>🌅 সকাল রান্না: {contract?.morningCookingTime}</p>
            )}
            {contract?.noonCookingTime && (
              <p>🌞 দুপুর রান্না: {contract?.noonCookingTime}</p>
            )}
            {contract?.nightCookingTime && (
              <p>🌙 রাত রান্না: {contract?.nightCookingTime}</p>
            )}

            {contract?.clothWashing && (
              <p>
                👕 কাপড় ধোয়া: {contract?.clothWashing} বার (৳
                {contract?.clothWashingAmount})
              </p>
            )}

            {contract?.cleaningToilet && (
              <p>
                🚽 টয়লেট পরিষ্কার: {contract?.cleaningToilet} বার (৳
                {contract?.cleaningToiletAmount})
              </p>
            )}

            {contract?.childAge && (
              <p>
                👶 শিশু যত্ন: {contract?.childAge} বছর •{" "}
                {contract?.childcareHour} ঘন্টা (৳
                {contract?.childCareAmount})
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
