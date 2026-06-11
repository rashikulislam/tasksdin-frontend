"use client";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

interface TaskListHeaderProps {
  taskCount: number;
}

export function TaskListHeader({ taskCount }: TaskListHeaderProps) {
  const t = useTranslations("Dashboard.Consumer.PostedTasks");
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2 sm:gap-0">
      <div>
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="text-muted-foreground mt-1">{t("description")}</p>
      </div>
      <Badge variant="outline" className="text-primary">
        {t("taskCount", { count: taskCount })}
      </Badge>
    </div>
  );
}
