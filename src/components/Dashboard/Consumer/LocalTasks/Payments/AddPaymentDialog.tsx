'use client';

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddPaymentDialogProps {
  newCard: {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
  };
  onNewCardChange: (field: string, value: string) => void;
  onAddCard: () => void;
}

export const AddPaymentDialog = ({
  newCard,
  onNewCardChange,
  onAddCard,
}: AddPaymentDialogProps) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Payment Method</DialogTitle>
    </DialogHeader>

    <div className="space-y-4">
      <div>
        <Label htmlFor="card-name">Cardholder Name</Label>
        <Input
          id="card-name"
          placeholder="John Doe"
          value={newCard.name}
          onChange={(e) => onNewCardChange("name", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="card-number">Card Number</Label>
        <Input
          id="card-number"
          placeholder="1234 5678 9012 3456"
          value={newCard.number}
          onChange={(e) => onNewCardChange("number", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={newCard.expiry}
            onChange={(e) => onNewCardChange("expiry", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            placeholder="123"
            value={newCard.cvc}
            onChange={(e) => onNewCardChange("cvc", e.target.value)}
          />
        </div>
      </div>

      <Button onClick={onAddCard} className="w-full">
        Add Card
      </Button>
    </div>
  </DialogContent>
);