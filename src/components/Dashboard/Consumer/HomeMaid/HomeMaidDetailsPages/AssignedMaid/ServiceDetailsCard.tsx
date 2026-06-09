import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { IMaidOrder } from "@/interfaces/maid";

export function ServiceDetailsCard({ request }: { request: IMaidOrder }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="w-5 h-5" />
          সার্ভিস বিবরণ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">প্যাকেজ</p>
            <p className="font-medium">{request?.timesPerDay} বেলা রান্না</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">জনসংখ্যা</p>
            <p className="font-medium">{request?.people} জন</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">শুরুর তারিখ</p>
            <p className="font-medium">
              {new Date(request?.startingDate).toLocaleDateString("bn-BD")}
            </p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">বেতন প্রদান</p>
            <p className="font-medium">
              প্রতি মাসের {request?.paymentDate} তারিখ
            </p>
          </div>
        </div>
        <div className="pt-5">
          <h1 className="text-lg font-semibold">অতিরিক্ত সার্ভিস </h1>

          <div className="gap-2 grid grid-cols-1 lg:grid-cols-2 border-t pt-4">
            {request?.morningCookingTime && (
              <p>🌅 সকাল রান্না: {request?.morningCookingTime}</p>
            )}
            {request?.noonCookingTime && (
              <p>🌞 দুপুর রান্না: {request?.noonCookingTime}</p>
            )}
            {request?.nightCookingTime && (
              <p>🌙 রাত রান্না: {request?.nightCookingTime}</p>
            )}

            {request?.clothWashing && (
              <p>
                👕 কাপড় ধোয়া: {request?.clothWashing} বার (৳
                {request?.clothWashingAmount})
              </p>
            )}

            {request?.cleaningToilet && (
              <p>
                🚽 টয়লেট পরিষ্কার: {request?.cleaningToilet} বার (৳
                {request?.cleaningToiletAmount})
              </p>
            )}

            {request?.childAge && (
              <p>
                👶 শিশু যত্ন: {request?.childAge} বছর • {request?.childcareHour}{" "}
                ঘন্টা (৳
                {request?.childCareAmount})
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
