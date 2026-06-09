"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Shield,
  Calendar,
  MapPin,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { House } from "../data/mockHouseData";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface HousePaymentModalProps {
  open: boolean;
  onClose: () => void;
  house: House;
  moveInDate?: Date;
  onPaymentSuccess: (paymentDetails: {
    method: "bkash" | "nagad" | "card";
    transactionId: string;
    amount: number;
  }) => void;
}

export default function HousePaymentModal({
  open,
  onClose,
  house,
  moveInDate,
  onPaymentSuccess,
}: HousePaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<
    "bkash" | "nagad" | "card"
  >("bkash");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<
    "select" | "details" | "processing" | "success"
  >("select");

  const advancePayment = house.rent;
  const serviceFee = Math.round(house.rent * 0.02);
  const totalAmount = advancePayment + serviceFee;

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("bn-BD").format(amount);

  const validatePayment = () => {
    if (paymentMethod !== "card") {
      if (phoneNumber.length !== 11) {
        toast({
          title: "ত্রুটি",
          description: "সঠিক মোবাইল নম্বর দিন",
          variant: "destructive",
        });
        return false;
      }
    } else {
      if (cardNumber.length < 16 || !cardExpiry || !cardCvv || !cardName) {
        toast({
          title: "ত্রুটি",
          description: "সব কার্ড তথ্য পূরণ করুন",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validatePayment()) return;

    setIsProcessing(true);
    setStep("processing");

    await new Promise((r) => setTimeout(r, 2000));

    const transactionId = `TXN${Date.now()}${Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()}`;

    setStep("success");
    setIsProcessing(false);

    setTimeout(() => {
      onPaymentSuccess({
        method: paymentMethod,
        transactionId,
        amount: totalAmount,
      });
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setStep("select");
    setPhoneNumber("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setCardName("");
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === "success" ? "পেমেন্ট সফল!" : "বুকিং পেমেন্ট"}
          </DialogTitle>
        </DialogHeader>

        {step === "success" && (
          <div className="text-center py-8">
            <CheckCircle2 className="w-14 h-14 text-success mx-auto mb-3" />
            <p className="font-semibold">পেমেন্ট সম্পন্ন হয়েছে</p>
          </div>
        )}

        {step === "processing" && (
          <div className="text-center py-10">
            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3" />
            <p>পেমেন্ট প্রক্রিয়াধীন...</p>
          </div>
        )}

        {step === "select" && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-3 flex gap-3">
                <Image
                  src={house.images[0]}
                  alt={house.title}
                  width={80}
                  height={64}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{house.title}</p>
                  <p className="text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {house.area}
                  </p>
                  <p className="text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {moveInDate
                      ? format(moveInDate, "dd/MM/yyyy")
                      : "তারিখ নির্বাচন করা হয়নি"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span>অগ্রিম</span>
                <span>৳{formatAmount(advancePayment)}</span>
              </div>
              <div className="flex justify-between">
                <span>সার্ভিস ফি</span>
                <span>৳{formatAmount(serviceFee)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>মোট</span>
                <span className="text-primary">
                  ৳{formatAmount(totalAmount)}
                </span>
              </div>
            </div>

            <RadioGroup
              value={paymentMethod}
              onValueChange={(v) =>
                setPaymentMethod(v as "bkash" | "nagad" | "card")
              }
              className="space-y-2"
            >
              {["bkash", "nagad", "card"].map((m) => (
                <label
                  key={m}
                  className="flex gap-3 items-center border p-3 rounded-lg cursor-pointer"
                >
                  <RadioGroupItem value={m} />
                  <span className="capitalize">{m}</span>
                </label>
              ))}
            </RadioGroup>

            <Button className="w-full" onClick={() => setStep("details")}>
              পেমেন্ট করুন <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-4">
            {paymentMethod !== "card" && (
              <>
                <Label>মোবাইল নম্বর</Label>
                <Input
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 11)
                    )
                  }
                  placeholder="01XXXXXXXXX"
                />
              </>
            )}

            {paymentMethod === "card" && (
              <>
                <Input
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 16)
                    )
                  }
                />
                <Input
                  placeholder="Card Holder Name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                  />
                  <Input
                    placeholder="CVV"
                    value={cardCvv}
                    onChange={(e) =>
                      setCardCvv(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("select")}>
                পেছনে
              </Button>
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1"
              >
                {isProcessing && (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                )}
                পেমেন্ট সম্পন্ন
              </Button>
            </div>

            <div className="flex justify-center gap-1 text-xs">
              <Shield className="w-4 h-4" /> SSL সুরক্ষিত
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
