'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface PaymentHeaderProps {
  children: React.ReactNode;
}

export const PaymentHeader = ({ children }: PaymentHeaderProps) => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold">Payment Methods</h1>
      <p className="text-muted-foreground">
        Manage your payment methods and billing information
      </p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </DialogTrigger>
      {children}
    </Dialog>
  </div>
);