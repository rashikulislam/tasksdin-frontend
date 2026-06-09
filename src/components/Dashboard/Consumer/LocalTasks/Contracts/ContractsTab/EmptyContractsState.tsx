// components/contracts/EmptyContractsState.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle } from "lucide-react";

interface EmptyContractsStateProps {
  type: "active" | "completed";
}

export function EmptyContractsState({ type }: EmptyContractsStateProps) {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <div className="text-muted-foreground space-y-2">
          {type === "active" ? (
            <Clock className="w-12 h-12 mx-auto opacity-50" />
          ) : (
            <CheckCircle className="w-12 h-12 mx-auto opacity-50" />
          )}
          <p className="text-lg font-semibold">
            No {type === "active" ? "Active" : "Completed"} Contracts
          </p>
          <p>
            {type === "active"
              ? "You don't have any active contracts at the moment"
              : "Your completed contracts will appear here"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}