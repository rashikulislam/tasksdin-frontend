"use client";

import { useState } from "react";
import { UserCheck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import AssignedList from "@/components/Dashboard/Consumer/HomeMaid/HomeMaidContent/AssignedList";
import ComplaintModal from "@/components/Dashboard/Consumer/HomeMaid/HomeMaidContent/ComplaintModal";

import { useGetConsumerOrderedMaidQuery } from "@/redux/features/home.maid.feature";
import { IMaidOrder } from "@/interfaces/maid";
import TaskFeedSkeleton from "@/components/Skeletons/TaskFeedSkeleton";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";
export default function BuaHireAssignedPage() {
  const { isError, data, isLoading } =
    useGetConsumerOrderedMaidQuery(undefined);
  const isMobile = useIsMobile();

  const [showComplainModal, setShowComplainModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  );

  const assignedRequests = (data?.data as IMaidOrder[]) || [];
  return (
    <div className="min-h-screen bg-background">
      <div
        className={`${isMobile ? "p-4" : "container mx-auto p-6 max-w-4xl"}`}
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
            <UserCheck className="w-6 h-6 text-primary" />
            অ্যাসাইনড বুয়া
          </h2>
          <p className="text-muted-foreground text-sm">
            আপনার জন্য নির্ধারিত বুয়াদের তালিকা
          </p>
        </div>

        {isLoading ? (
          <TaskFeedSkeleton />
        ) : isError ? (
          <ManageStatusState
            type="error"
            message="কিছু একটা সমস্যা হয়েছে"
            description="দুঃখিত! সার্ভার সমস্যার কারণে তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।"
          />
        ) : !assignedRequests?.length ? (
          <ManageStatusState
            type="notFound"
            message="কোনো আবেদন পাওয়া যায়নি"
            description="আপনি এখনো কোনো হোম মেইড সার্ভিসের আবেদন করেননি। নতুন আবেদন করতে পারেন।"
          />
        ) : (
          <AssignedList
            assignedRequests={assignedRequests}
            onComplain={(id) => {
              setSelectedRequestId(id);
              setShowComplainModal(true);
            }}
          />
        )}
      </div>

      <ComplaintModal
        open={showComplainModal}
        onClose={() => setShowComplainModal(false)}
        requestId={selectedRequestId}
      />
    </div>
  );
}
