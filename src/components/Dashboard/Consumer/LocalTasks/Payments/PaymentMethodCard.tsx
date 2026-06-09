'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone, Trash2 } from "lucide-react";

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

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onSetDefault: (id: number) => void;
  onDelete: (id: number) => void;
}

export const PaymentMethodCard = ({ method, onSetDefault, onDelete }: PaymentMethodCardProps) => (
  <Card className="relative">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            {method.type === "card" ? (
              <CreditCard className="h-6 w-6 text-primary" />
            ) : (
              <Smartphone className="h-6 w-6 text-primary" />
            )}
          </div>

          <div>
            {method.type === "card" ? (
              <>
                <h3 className="font-semibold">
                  {method.brand} ending in {method.last4}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Expires {method.expiryMonth}/{method.expiryYear}
                </p>
              </>
            ) : (
              <>
                <h3 className="font-semibold">{method.provider}</h3>
                <p className="text-sm text-muted-foreground">{method.number}</p>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {method.isDefault && <Badge variant="secondary">Default</Badge>}

          <div className="flex gap-2">
            {!method.isDefault && (
              <Button variant="outline" size="sm" onClick={() => onSetDefault(method.id)}>
                Set Default
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(method.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);