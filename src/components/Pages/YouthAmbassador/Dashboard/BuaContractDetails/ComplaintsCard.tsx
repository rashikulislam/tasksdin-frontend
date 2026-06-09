import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockContractDetail } from "../Data/mockData";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IMaidComplain } from "@/interfaces/maid";
import moment from "moment";

function ComplaintsCard({ complains }: { complains: IMaidComplain[] }) {
  const contract = mockContractDetail;
  console.log(complains);
  return (
    <div>
      <Card className={contract.complaints.length > 0 ? "border-red-200" : ""}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            অভিযোগসমূহ
            {complains?.length > 0 && (
              <Badge variant="destructive">{contract.complaints.length}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {complains?.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              কোনো অভিযোগ নেই
            </p>
          ) : (
            <div className="space-y-3">
              {complains?.map((complaint: IMaidComplain) => (
                <div
                  key={complaint.id}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <span className="text-sm text-muted-foreground">
                    {moment(complaint?.createdAt).format("ll")}
                  </span>

                  <p className="text-sm">{complaint?.description}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ComplaintsCard;
