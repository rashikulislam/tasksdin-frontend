// components/tasks/EmptyTaskState.tsx
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export function EmptyTaskState() {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <div className="text-muted-foreground space-y-2">
          <FileText className="w-12 h-12 mx-auto opacity-50" />
          <p className="text-lg font-semibold">No Tasks Posted</p>
          <p>Your posted tasks will appear here</p>
        </div>
      </CardContent>
    </Card>
  );
}