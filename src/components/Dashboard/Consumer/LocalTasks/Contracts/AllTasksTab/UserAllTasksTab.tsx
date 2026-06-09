"use client";
import { TaskListHeader } from "./TaskListHeader";
import { TaskCard } from "./TaskCard";
import { useGetParticularConsumerPostedTaskQuery } from "@/redux/features/NonSkilledConsumer.feature";
import TaskFeedSkeleton from "@/components/Skeletons/TaskFeedSkeleton";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";

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
  const { isLoading, data, isError } =
    useGetParticularConsumerPostedTaskQuery(undefined);

  const tasks = data?.data || [];

  return (
    <div className="space-y-4">
      <TaskListHeader taskCount={tasks.length} />
      {isLoading ? (
        <TaskFeedSkeleton />
      ) : isError ? (
        <ManageStatusState
          type="error"
          message="ডাটা লোড করতে সমস্যা হয়েছে"
          description="দয়া করে পেজটি রিফ্রেশ করুন অথবা পরে আবার চেষ্টা করুন।"
        />
      ) : tasks.length === 0 ? (
        <ManageStatusState
          type="notFound"
          message="কোনো টাস্ক নেই"
          description="আপনার কোনো পোস্ট করা টাস্ক নেই"
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
