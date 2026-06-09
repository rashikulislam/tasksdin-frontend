// components/tasks/TaskListHeader.tsx
import { Badge } from "@/components/ui/badge";

interface TaskListHeaderProps {
  taskCount: number;
}

export function TaskListHeader({ taskCount }: TaskListHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2 sm:gap-0">
      <div>
        <h2 className="text-2xl font-bold">সকল টাস্ক</h2>
        <p className="text-muted-foreground mt-1">
          আপনার সকল পোস্ট করা টাস্ক দেখুন এবং পরিচালনা করুন
        </p>
      </div>
      <Badge variant="outline" className="text-primary">
        {taskCount} টাস্ক
      </Badge>
    </div>
  );
}
