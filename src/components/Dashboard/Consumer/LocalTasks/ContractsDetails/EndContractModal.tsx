"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  HelpCircle,
} from "lucide-react";
import CustomModal from "@/components/Reusable/CustomModal";
import { useCancelContractMutation } from "@/redux/features/contract.feature";
import { toast } from "sonner";

interface EndContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  isProvider?: boolean;
  contractTitle?: string;
  contractId: string;
}

export default function EndContractModal({
  isOpen,
  onClose,
  isProvider = false,
  contractId,
}: EndContractModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [mutateAsync, { isLoading }] = useCancelContractMutation();
  const providerReasons = [
    {
      id: "work_completed",
      label: "কাজ সম্পন্ন হয়েছে",
      description: "সকল কাজ সফলভাবে শেষ হয়েছে",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: "client_unavailable",
      label: "ক্লায়েন্ট পাওয়া যাচ্ছে না",
      description: "ক্লায়েন্টের সাথে যোগাযোগ করা যাচ্ছে না",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      id: "task_cancelled",
      label: "টাস্ক বাতিল হয়েছে",
      description: "ক্লায়েন্ট টাস্ক বাতিল করেছেন",
      icon: XCircle,
      color: "text-red-600",
    },
    {
      id: "other",
      label: "অন্যান্য কারণ",
      description: "নিচে বিস্তারিত লিখুন",
      icon: HelpCircle,
      color: "text-muted-foreground",
    },
  ];

  const userReasons = [
    {
      id: "work_completed",
      label: "কাজ সম্পন্ন হয়েছে",
      description: "সকল কাজ সফলভাবে শেষ হয়েছে",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: "provider_unavailable",
      label: "Provider পাওয়া যাচ্ছে না",
      description: "Provider এর সাথে যোগাযোগ করা যাচ্ছে না",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      id: "poor_quality",
      label: "কাজের মান ভালো না",
      description: "কাজের গুণগত মান প্রত্যাশা অনুযায়ী নয়",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      id: "task_cancelled",
      label: "টাস্ক বাতিল করতে চাই",
      description: "আমি টাস্কটি বাতিল করতে চাই",
      icon: XCircle,
      color: "text-red-600",
    },
    {
      id: "other",
      label: "অন্যান্য কারণ",
      description: "নিচে বিস্তারিত লিখুন",
      icon: HelpCircle,
      color: "text-muted-foreground",
    },
  ];

  const reasons = isProvider ? providerReasons : userReasons;

  const handleConfirm = async () => {
    if (!selectedReason) return;

    const data = {
      cancel_reason: selectedReason,
      cancel_description: description,
      cancel_by: isProvider ? "PROVIDER" : "CONSUMER",
    };
    const payload = {
      data,
      id: contractId,
    };
    try {
      const result = await mutateAsync(payload).unwrap();
      if (result?.success) {
        setSelectedReason("");
        setDescription("");
        onClose();
        toast.success(result?.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.success(error?.data?.message);
    }
  };

  const handleClose = () => {
    setSelectedReason("");
    setDescription("");
    onClose();
  };

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={handleClose}
        title="কোন্টিরক্টস বাতিল করুন "
        width="lg"
      >
        <div className="space-y-6 py-4">
          {/* Reason Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              কারণ নির্বাচন করুন *
            </Label>
            <RadioGroup
              value={selectedReason}
              onValueChange={setSelectedReason}
              className="space-y-3"
            >
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <div
                    key={reason.id}
                    className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedReason === reason.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedReason(reason.id)}
                  >
                    <RadioGroupItem
                      value={reason.id}
                      id={reason.id}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${reason.color}`} />
                        <Label
                          htmlFor={reason.id}
                          className="font-medium cursor-pointer"
                        >
                          {reason.label}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              বিস্তারিত বর্ণনা{" "}
              {selectedReason === "other" && (
                <span className="text-red-500">*</span>
              )}
            </Label>
            <Textarea
              id="description"
              placeholder="আপনার কারণ বিস্তারিতভাবে লিখুন..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              এই তথ্য আমাদের সার্ভিস উন্নত করতে সাহায্য করবে।
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              বাতিল করুন
            </Button>
            <Button
              className="flex-1"
              onClick={handleConfirm}
              disabled={
                !selectedReason ||
                (selectedReason === "other" && !description.trim()) ||
                isLoading
              }
              variant={
                selectedReason === "work_completed" ? "default" : "destructive"
              }
            >
              {isProvider ? "অনুরোধ পাঠান" : "Contract শেষ করুন"}
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
}
