"use client";

import { BuaProfileCard } from "@/components/Dashboard/Consumer/HomeMaid/HomeMaidDetailsPages/AssignedMaid/BuaProfileCard";
import { MonthlyPaymentCard } from "@/components/Dashboard/Consumer/HomeMaid/HomeMaidDetailsPages/AssignedMaid/MonthlyPaymentCard";
import { ServiceDetailsCard } from "@/components/Dashboard/Consumer/HomeMaid/HomeMaidDetailsPages/AssignedMaid/ServiceDetailsCard";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";
import ContractsSkeleton from "@/components/Skeletons/ContractsSkeleton";
import TaskFeedSkeleton from "@/components/Skeletons/TaskFeedSkeleton";
import { IMaidOrder } from "@/interfaces/maid";
import { useGetSingleHiredHomeMaidDetailsForConsumerQuery } from "@/redux/features/home.maid.feature";

import { useParams } from "next/navigation";

export default function AssignedBuaDetailsPage() {
  const { requestId } = useParams<{ requestId: string }>();

  const { isError, isLoading, data } =
    useGetSingleHiredHomeMaidDetailsForConsumerQuery(requestId, {
      refetchOnMountOrArgChange: true,
    });

  const request = data?.data as IMaidOrder;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-5">
        <TaskFeedSkeleton />
        <ContractsSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <ManageStatusState
        type="error"
        message="তথ্য লোড করতে সমস্যা হয়েছে"
        description="দুঃখিত! সার্ভারে সাময়িক ত্রুটি হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।"
      />
    );
  }

  if (!request) {
    return (
      <ManageStatusState
        type="notFound"
        message="কোনো চুক্তি পাওয়া যায়নি"
        description="এখনো আপনার এরিয়ায় কোনো গৃহকর্মী নিয়োগ সম্পন্ন হয়নি। নতুন রিকুয়েস্ট আসলে এখানে দেখানো হবে।"
      />
    );
  }
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Main grid content */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <BuaProfileCard bua={request?.maid} />
          <ServiceDetailsCard request={request} />
        </div>

        <MonthlyPaymentCard request={request} />
      </div>
    </div>
  );
}
