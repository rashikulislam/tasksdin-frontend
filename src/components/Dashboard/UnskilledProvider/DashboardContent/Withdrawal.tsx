"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Wallet, Plus, Trash2, CreditCard, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentMethod {
  id: number;
  type: "mobile" | "bank";
  provider?: string;
  number?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  isDefault: boolean;
}

interface UnskilledProviderWithdrawalProps {
  onBack: () => void;
  balance?: number;
}

const UnskilledProviderWithdrawal = ({ onBack, balance = 2450 }: UnskilledProviderWithdrawalProps) => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: "mobile",
      provider: "bKash",
      number: "01712345678",
      isDefault: true
    }
  ]);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<number | null>(1);
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [methodType, setMethodType] = useState<"mobile" | "bank">("mobile");
  const [newMethod, setNewMethod] = useState({
    provider: "",
    number: "",
    bankName: "",
    accountNumber: "",
    accountName: ""
  });

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount <= 0 || amount > balance) {
      toast({
        title: "অবৈধ পরিমাণ",
        description: "দয়া করে একটি বৈধ পরিমাণ লিখুন।",
        variant: "destructive"
      });
      return;
    }
    if (!selectedMethod) {
      toast({
        title: "পেমেন্ট মেথড নির্বাচন করুন",
        description: "টাকা তোলার জন্য একটি পেমেন্ট মেথড নির্বাচন করুন।",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "উত্তোলন অনুরোধ জমা দেওয়া হয়েছে",
      description: `৳${amount} টাকা তোলার অনুরোধ প্রক্রিয়াধীন রয়েছে।`,
    });
    setWithdrawAmount("");
  };

  const handleAddMethod = () => {
    if (methodType === "mobile" && (!newMethod.provider || !newMethod.number)) {
      toast({
        title: "সমস্ত ক্ষেত্র পূরণ করুন",
        variant: "destructive"
      });
      return;
    }
    if (methodType === "bank" && (!newMethod.bankName || !newMethod.accountNumber || !newMethod.accountName)) {
      toast({
        title: "সমস্ত ক্ষেত্র পূরণ করুন",
        variant: "destructive"
      });
      return;
    }

    const method: PaymentMethod = {
      id: Date.now(),
      type: methodType,
      isDefault: paymentMethods.length === 0,
      ...(methodType === "mobile" ? {
        provider: newMethod.provider,
        number: newMethod.number
      } : {
        bankName: newMethod.bankName,
        accountNumber: newMethod.accountNumber,
        accountName: newMethod.accountName
      })
    };

    setPaymentMethods([...paymentMethods, method]);
    setNewMethod({ provider: "", number: "", bankName: "", accountNumber: "", accountName: "" });
    setShowAddMethod(false);
    toast({
      title: "পেমেন্ট মেথড যোগ করা হয়েছে",
      description: "নতুন পেমেন্ট মেথড সফলভাবে যোগ করা হয়েছে।",
    });
  };

  const handleDeleteMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter(m => m.id !== id));
    if (selectedMethod === id) {
      setSelectedMethod(null);
    }
    toast({
      title: "পেমেন্ট মেথড মুছে ফেলা হয়েছে",
    });
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    setSelectedMethod(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-card border-b border-border p-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Button>
        <h1 className="text-xl font-bold">উত্তোলন</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm opacity-90 mb-2">বর্তমান ব্যালেন্স</p>
              <p className="text-4xl font-bold">৳{balance}</p>
            </div>
          </CardContent>
        </Card>

        {/* Withdraw Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="h-5 w-5 mr-2" />
              টাকা তুলুন
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="amount">পরিমাণ (টাকা)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="পরিমাণ লিখুন"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>
            <Button onClick={handleWithdraw} className="w-full">
              উত্তোলন করুন
            </Button>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>পেমেন্ট মেথড</span>
              <Dialog open={showAddMethod} onOpenChange={setShowAddMethod}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    যোগ করুন
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>নতুন পেমেন্ট মেথড যোগ করুন</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>মেথড টাইপ</Label>
                      <Select value={methodType} onValueChange={(value: "mobile" | "bank") => setMethodType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mobile">মোবাইল ব্যাংকিং</SelectItem>
                          <SelectItem value="bank">ব্যাংক অ্যাকাউন্ট</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {methodType === "mobile" ? (
                      <>
                        <div>
                          <Label>প্রদানকারী</Label>
                          <Select value={newMethod.provider} onValueChange={(value) => setNewMethod({ ...newMethod, provider: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bKash">bKash</SelectItem>
                              <SelectItem value="Nagad">Nagad</SelectItem>
                              <SelectItem value="Rocket">Rocket</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>মোবাইল নম্বর</Label>
                          <Input
                            placeholder="01712345678"
                            value={newMethod.number}
                            onChange={(e) => setNewMethod({ ...newMethod, number: e.target.value })}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Label>ব্যাংকের নাম</Label>
                          <Input
                            placeholder="ব্যাংকের নাম লিখুন"
                            value={newMethod.bankName}
                            onChange={(e) => setNewMethod({ ...newMethod, bankName: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>অ্যাকাউন্ট নম্বর</Label>
                          <Input
                            placeholder="অ্যাকাউন্ট নম্বর লিখুন"
                            value={newMethod.accountNumber}
                            onChange={(e) => setNewMethod({ ...newMethod, accountNumber: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>অ্যাকাউন্ট হোল্ডারের নাম</Label>
                          <Input
                            placeholder="নাম লিখুন"
                            value={newMethod.accountName}
                            onChange={(e) => setNewMethod({ ...newMethod, accountName: e.target.value })}
                          />
                        </div>
                      </>
                    )}
                    <Button onClick={handleAddMethod} className="w-full">
                      যোগ করুন
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">কোনো পেমেন্ট মেথড যোগ করা হয়নি</p>
            ) : (
              paymentMethods.map((method) => (
                <Card key={method.id} className={selectedMethod === method.id ? "border-primary" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {method.type === "mobile" ? (
                          <Smartphone className="h-5 w-5 text-primary" />
                        ) : (
                          <CreditCard className="h-5 w-5 text-primary" />
                        )}
                        <div>
                          <p className="font-medium">
                            {method.type === "mobile" ? method.provider : method.bankName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {method.type === "mobile" ? method.number : method.accountNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <Badge variant="secondary">ডিফল্ট</Badge>
                        )}
                        {!method.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefault(method.id)}
                          >
                            ডিফল্ট করুন
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteMethod(method.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnskilledProviderWithdrawal;
