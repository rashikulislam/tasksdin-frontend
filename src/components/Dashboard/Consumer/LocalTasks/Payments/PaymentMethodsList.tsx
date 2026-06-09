'use client';

import { PaymentMethodCard } from "./PaymentMethodCard";

interface PaymentMethod {
  id: number;
  type: "card" | "mobile";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  provider?: string;
  number?: string;
  isDefault: boolean;
}

interface PaymentMethodsListProps {
  methods: PaymentMethod[];
  onSetDefault: (id: number) => void;
  onDelete: (id: number) => void;
}

export const PaymentMethodsList = ({ methods, onSetDefault, onDelete }: PaymentMethodsListProps) => (
  <div className="grid gap-4">
    {methods.map((method) => (
      <PaymentMethodCard
        key={method.id}
        method={method}
        onSetDefault={onSetDefault}
        onDelete={onDelete}
      />
    ))}
  </div>
);