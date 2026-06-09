"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  onPay: () => void;
};

export default function TrialPaymentDialog({
  open,
  onClose,
  onPay,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ট্রায়াল পেমেন্ট</DialogTitle>
        </DialogHeader>

        <Button onClick={onPay}>৳১০০ পরিশোধ করুন</Button>
      </DialogContent>
    </Dialog>
  );
}
