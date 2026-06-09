"use client";
import {
  BuaHireRequest,
  mockRequests,
} from "@/components/Dashboard/Consumer/HomeMaid/Data/MockData";
import RequestCard from "@/components/Dashboard/Consumer/HomeMaid/HomeMaidContent/RequestCard";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";
import TaskFeedSkeleton from "@/components/Skeletons/TaskFeedSkeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { IMaidOrder } from "@/interfaces/maid";
import { useGetConsumerMaidApplicationQuery } from "@/redux/features/home.maid.feature";

const BuaHireMyRequestsPage = () => {
  const { isLoading, data, isError } =
    useGetConsumerMaidApplicationQuery(undefined);
  const isMobile = useIsMobile();
  const requests = data?.data || [];
  return (
    <div className="min-h-screen bg-background">
      <div
        className={`${isMobile ? "p-4" : "container mx-auto p-6 max-w-3xl"} space-y-6`}
      >
        {/* All Requests */}
        <div>
          {isLoading ? (
            <TaskFeedSkeleton />
          ) : isError ? (
            <ManageStatusState
              type="error"
              message="কিছু একটা সমস্যা হয়েছে"
              description="দুঃখিত! সার্ভার সমস্যার কারণে তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।"
            />
          ) : !requests?.length ? (
            <ManageStatusState
              type="empty"
              message="কোনো আবেদন পাওয়া যায়নি"
              description="আপনি এখনো কোনো হোম মেইড সার্ভিসের আবেদন করেননি। নতুন আবেদন করতে পারেন।"
            />
          ) : (
            <div className="space-y-4">
              {requests?.map((request: IMaidOrder) => (
                <RequestCard key={request?.id} request={request} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuaHireMyRequestsPage;
