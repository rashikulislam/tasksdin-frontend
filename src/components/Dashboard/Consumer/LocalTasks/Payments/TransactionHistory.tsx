'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

interface Transaction {
  id: number;
  description: string;
  amount: string;
  date: string;
  status: string;
}

interface TransactionHistoryProps {
  transactions?: Transaction[];
}

const defaultTransactions: Transaction[] = [
  { id: 1, description: "House Cleaning Service", amount: "৳2,500", date: "Jan 25, 2024", status: "Completed" },
  { id: 2, description: "Plumbing Repair", amount: "৳1,800", date: "Jan 22, 2024", status: "Completed" },
  { id: 3, description: "Gardening Service", amount: "৳3,200", date: "Jan 20, 2024", status: "Completed" },
];

export const TransactionHistory = ({ transactions = defaultTransactions }: TransactionHistoryProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Transactions</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between py-3 border-b last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">{t.description}</p>
                <p className="text-sm text-muted-foreground">{t.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{t.amount}</p>
              <Badge variant="secondary" className="text-xs">{t.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);