'use client';

import { useState } from "react";
import { PaymentHeader } from "./PaymentHeader";
import { AddPaymentDialog } from "./AddPaymentDialog";
import { PaymentMethodsList } from "./PaymentMethodsList";
import { TransactionHistory } from "./TransactionHistory";

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "card" as const,
      last4: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: 2,
      type: "mobile" as const,
      provider: "bKash",
      number: "01712345678",
      isDefault: false,
    },
  ]);

  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const handleAddCard = () => {
    console.log("Adding new card:", newCard);
  };

  const handleDeleteMethod = (id: number) => {
    setPaymentMethods((methods) => methods.filter((m) => m.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods((methods) =>
      methods.map((m) => ({ ...m, isDefault: m.id === id }))
    );
  };

  const updateNewCard = (field: string, value: string) => {
    setNewCard((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <PaymentHeader>
        <AddPaymentDialog
          newCard={newCard}
          onNewCardChange={updateNewCard}
          onAddCard={handleAddCard}
        />
      </PaymentHeader>

      <PaymentMethodsList
        methods={paymentMethods}
        onSetDefault={handleSetDefault}
        onDelete={handleDeleteMethod}
      />

      <TransactionHistory />
    </div>
  );
}