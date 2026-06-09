"use client";
import UnskilledTaskFeed from "@/components/Dashboard/UnskilledProvider/DashboardContent/TaskFeed";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";
import TaskFeedSkeleton from "@/components/Skeletons/TaskFeedSkeleton";
import { useGetIncompleteTasksQuery } from "@/redux/features/NonSkilledConsumer.feature";

const UnskilledProviderDashboard = () => {
  const { data, isLoading, isError } = useGetIncompleteTasksQuery(undefined);

  const tasks = data?.data || [];

  return (
    <div className="pb-[65px] lg:pb-0">
      {isLoading ? (
        <TaskFeedSkeleton />
      ) : isError ? (
        <ManageStatusState
          type="error"
          message="ডাটা লোড করতে সমস্যা হয়েছে"
          description="দয়া করে পেজটি রিফ্রেশ করুন অথবা পরে আবার চেষ্টা করুন।"
        />
      ) : (
        <UnskilledTaskFeed tasks={tasks} />
      )}
    </div>
  );
};

export default UnskilledProviderDashboard;
