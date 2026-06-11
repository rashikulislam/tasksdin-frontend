"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { TaskListHeader } from "./TaskListHeader";
import { TaskCard } from "./TaskCard";
import { useGetParticularConsumerPostedTaskQuery } from "@/redux/features/NonSkilledConsumer.feature";
import TaskFeedSkeleton from "@/components/Skeletons/TaskFeedSkeleton";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";
import { useSocketStore } from "@/lib/socketStore";

export interface INonSkilledTask {
  id: string;
  consumer_id: string;
  task_title: string;
  category_id: string;
  description: string;
  budget: number;
  deadline: string;
  urgency_level: "low" | "medium" | "high";
  is_deleted_by_user: boolean;
  is_deleted_by_admin: boolean;
  status: "PENDING" | "APPROVED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  category: {
    name: string;
  };
  _count: {
    proposals: number;
  };
}

export default function UserAllTasksTab() {
  const t = useTranslations("Dashboard.Consumer.PostedTasks");
  const { isLoading, data, isError, refetch } =
    useGetParticularConsumerPostedTaskQuery(undefined, {
      pollingInterval: 15000,
    });

  // Refetch whenever the consumer receives a new socket notification
  // (the backend emits one each time a provider submits a proposal).
  const notifications = useSocketStore((s) => s.notifications);
  useEffect(() => {
    if (notifications.length > 0) {
      refetch();
    }
  }, [notifications.length, refetch]);

  const tasks = data?.data || [];

  return (
    <div className="space-y-4">
      <TaskListHeader taskCount={tasks.length} />
      {isLoading ? (
        <TaskFeedSkeleton />
      ) : isError ? (
        <ManageStatusState
          type="error"
          message={t("errorState.message")}
          description={t("errorState.description")}
        />
      ) : tasks.length === 0 ? (
        <ManageStatusState
          type="notFound"
          message={t("emptyState.message")}
          description={t("emptyState.description")}
        />
      ) : (
        <div className="grid gap-4">
          {tasks?.map((task: INonSkilledTask) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
