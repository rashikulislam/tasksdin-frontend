import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MapPin } from "lucide-react";
import { BuaHireRequest } from "../../Data/MockData";

export function ContactInfoCard({ request }: { request: BuaHireRequest }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Phone className="w-5 h-5" />
          যোগাযোগ তথ্য
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground">নাম</p>
            <p className="font-medium">{request.userName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground">ফোন</p>
            <p className="font-medium">{request.phoneNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">ঠিকানা</p>
            <p className="font-medium">{request.address}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
