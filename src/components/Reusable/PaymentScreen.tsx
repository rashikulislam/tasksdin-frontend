// components/proposals/PaymentScreen.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Smartphone, Wallet, CreditCard } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  proposedPrice: string;
}

interface PaymentScreenProps {
  provider: Provider;
  taskId: string;
  onBack: () => void;
  onHire: (providerId: string) => void;
}

export function PaymentScreen({ provider, taskId, onBack, onHire }: PaymentScreenProps) {
  const handlePayment = (method: string) => {
    const paymentData = {
      taskId,
      providerId: provider.id,
      paymentMethod: method,
      onHire,
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem("hirePayment", JSON.stringify(paymentData));
    }
    window.location.href = "/payment-checkout";
  };

  return (
    <div className="container mx-auto px-4">
      <Button variant="ghost" className="mb-6" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Proposals
      </Button>

      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Choose Payment Method</h2>

            <div className="bg-muted/20 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Hiring Summary</h3>
              <p className="text-sm">Provider: {provider.name}</p>
              <p className="text-sm">Proposed Price: ৳{provider.proposedPrice}</p>
            </div>

            <div className="grid gap-4">
              <Button size="lg" className="justify-start p-6 h-auto" onClick={() => handlePayment("bkash")}>
                <Smartphone className="w-6 h-6 mr-4" />
                <div className="text-left">
                  <div className="font-semibold">bKash</div>
                  <div className="text-sm opacity-90">Pay with your bKash account</div>
                </div>
              </Button>

              <Button size="lg" className="justify-start p-6 h-auto bg-orange-600 hover:bg-orange-700" onClick={() => handlePayment("nagad")}>
                <Wallet className="w-6 h-6 mr-4" />
                <div className="text-left">
                  <div className="font-semibold">Nagad</div>
                  <div className="text-sm opacity-90">Pay with your Nagad account</div>
                </div>
              </Button>

              <Button size="lg" className="justify-start p-6 h-auto bg-blue-600 hover:bg-blue-700" onClick={() => handlePayment("card")}>
                <CreditCard className="w-6 h-6 mr-4" />
                <div className="text-left">
                  <div className="font-semibold">Credit/Debit Card</div>
                  <div className="text-sm opacity-90">Pay with your bank card</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}