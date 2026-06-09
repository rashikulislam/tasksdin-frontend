import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ChefHat,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { BuaHireRequest } from "../../Data/MockData";

export function ServiceDetailsCard({ request }: { request: BuaHireRequest }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="w-5 h-5" />
          সার্ভিস বিবরণ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">জনসংখ্যা</p>
              <p className="font-medium">{request.numPeople} জন</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <ChefHat className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">রান্না</p>
              <p className="font-medium">{request.cookingTimes} বেলা</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">শুরুর তারিখ</p>
              <p className="font-medium">
                {new Date(request.startDate).toLocaleDateString("bn-BD")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">বেতন তারিখ</p>
              <p className="font-medium">{request.salaryPaymentDate} তারিখ</p>
            </div>
          </div>
        </div>

        {/* Trial Info */}
        {request.wantTrial && (
          <div
            className={`flex items-center justify-between p-3 rounded-lg ${
              request.trialPaid
                ? "bg-green-50 border border-green-200"
                : "bg-yellow-50 border border-yellow-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {request.trialPaid ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              )}
              <div>
                <p className="font-medium">১ দিনের ট্রায়াল</p>
                <p className="text-xs text-muted-foreground">
                  {request.trialTimeSlot && `সময়: ${request.trialTimeSlot}`}
                  {request.trialDate &&
                    ` • তারিখ: ${new Date(request.trialDate).toLocaleDateString("bn-BD")}`}
                </p>
              </div>
            </div>
            <Badge
              className={request.trialPaid ? "bg-green-600" : "bg-yellow-500"}
            >
              {request.trialPaid ? "৳১০০ পরিশোধিত" : "৳১০০ বাকি"}
            </Badge>
          </div>
        )}

        {/* Services */}
        {request.services.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              অতিরিক্ত সার্ভিস
            </p>
            <div className="flex flex-wrap gap-2">
              {request.services.map((service, idx) => (
                <Badge key={idx} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
