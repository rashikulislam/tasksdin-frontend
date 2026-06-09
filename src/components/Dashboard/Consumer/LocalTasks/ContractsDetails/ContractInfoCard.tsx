import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import EndContractModal from "./EndContractModal";
import { IProposal } from "@/interfaces/proposal";
import moment from "moment";
import { useAlert } from "@/components/Reusable/AlertModal";
import { useAcceptCompleteTaskConfirmationMutation } from "@/redux/features/contract.feature";
import { calculateDistance } from "@/components/Dashboard/Common/utils/calculateDistance";
moment.locale("bn");

export default function ContractInfoCard({
  contract,
}: {
  contract: IProposal;
}) {
  const [showEndModal, setShowEndModal] = useState(false);
  const [mutateAsync, { isLoading }] =
    useAcceptCompleteTaskConfirmationMutation();
  const { showAlert, showConfirm } = useAlert();
  const handleEndContractConfirm = async (id: string) => {
    showConfirm({
      title: "আপনি কি কাজটি সম্পন্ন হয়েছে বলে নিশ্চিত করবেন?",
      confirmText: "হ্যাঁ, সম্পন্ন হয়েছে",
      cancelText: "এখন না",
      onConfirm: async () => {
        try {
          const result = await mutateAsync(id).unwrap();
          if (result?.success) {
            showAlert({
              type: "success",
              title: result?.message,
            });
            return;
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log(error);
          return showAlert({
            type: "error",
            title:
              error?.data?.message ||
              "কাজ সম্পন্ন করার অনুরোধ গ্রহণ করা যায়নি",
          });
        }
      },
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-2xl">
              {contract?.task?.task_title}
            </CardTitle>
            <Badge
              variant={contract?.status === "ON_GOING" ? "default" : "outline"}
            >
              {contract?.status === "ON_GOING" ? "সক্রিয়" : "সম্পন্ন"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {contract?.description && (
            <div>
              <h3 className="font-semibold mb-2">বিবরণ</h3>
              <p className="text-muted-foreground">{contract?.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                কনট্র্যাক্টের দাম
              </p>
              <p className="text-2xl font-bold text-primary">
                ৳{contract?.proposal_price}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                পেমেন্টের অবস্থা
              </p>
              {contract?.payment_status ? (
                <Badge className="bg-success text-success-foreground">
                  পরিশোধ হয়েছে
                </Badge>
              ) : (
                <Badge className="bg-warning text-warning-foreground">
                  অপরিশোধিত
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="truncate text-blue-600 font-semibold">
                {`${calculateDistance(
                  {
                    lat1: contract?.task?.latitude,
                    lng1: contract?.task?.longitude,
                  },
                  {
                    lat2: contract?.latitude as number,
                    lng2: contract?.longitude as number,
                  },
                ).toFixed(1)} km`}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                শুরু: {moment(contract?.created_at).format("ll, A h:mm")}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                শেষ:{" "}
                {moment(
                  contract?.completion_date || contract?.task?.deadline,
                ).format("ll, A h:mm")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => setShowEndModal(true)}
              disabled={contract?.status === "COMPLETE" || contract?.end_task}
            >
              বাতিল করুন
            </Button>

            <Button
              onClick={() => handleEndContractConfirm(contract?.id)}
              variant="default"
              className="flex-1"
              disabled={
                !contract?.end_task ||
                isLoading ||
                contract?.status === "COMPLETE"
              }
            >
              কনট্র্যাক্ট শেষ করুন
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* End Contract Modal */}
      <EndContractModal
        isOpen={showEndModal}
        onClose={() => setShowEndModal(false)}
        isProvider={false}
        contractTitle={contract?.task?.task_title}
        contractId={contract?.id}
      />
    </div>
  );
}
