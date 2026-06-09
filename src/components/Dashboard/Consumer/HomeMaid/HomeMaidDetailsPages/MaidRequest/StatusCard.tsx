import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BuaHireRequest } from "../../Data/MockData";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  approved: "bg-blue-500",
  assigned: "bg-green-500",
  active: "bg-green-600",
  completed: "bg-gray-500",
};

const statusLabels: Record<string, string> = {
  pending: "অপেক্ষমান",
  approved: "অনুমোদিত",
  assigned: "বুয়া অ্যাসাইন",
  active: "সক্রিয়",
  completed: "সম্পন্ন",
};

export function StatusCard({ request }: { request: BuaHireRequest }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <Badge className={statusColors[request.status]}>
              {statusLabels[request.status]}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              আবেদন: {new Date(request.createdAt).toLocaleDateString("bn-BD")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              ৳{request.totalMonthlyPrice.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">/মাস</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
