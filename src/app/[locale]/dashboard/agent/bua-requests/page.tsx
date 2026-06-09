"use client";
import BuaRequestsTab from "@/components/Pages/YouthAmbassador/Dashboard/BuaRequestsTab";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";
import TaskFeedSkeleton from "@/components/Skeletons/TaskFeedSkeleton";
import { useGetAgentMaidApplicationQuery } from "@/redux/features/home.maid.feature";

function BuaRequest() {
  const { isError, isLoading, data } =
    useGetAgentMaidApplicationQuery(undefined);

  const results = data?.data || [];

  return (
    <div className="pb-0 lg:pb-10">
      {isLoading ? (
        <TaskFeedSkeleton />
      ) : isError ? (
        <ManageStatusState
          type="error"
          message="কিছু একটা সমস্যা হয়েছে"
          description="দুঃখিত! সার্ভার সমস্যার কারণে তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।"
        />
      ) : !results?.length ? (
        <ManageStatusState
          type="notFound"
          message="কোনো আবেদন পাওয়া যায়নি"
          description="আপনি এখনো কোনো হোম মেইড সার্ভিসের আবেদন করেননি। নতুন আবেদন করতে পারেন।"
        />
      ) : (
        <BuaRequestsTab buaHireRequests={results} />
      )}
    </div>
  );
}

export default BuaRequest;
