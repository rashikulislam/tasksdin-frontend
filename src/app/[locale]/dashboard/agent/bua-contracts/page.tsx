"use client";

import React from "react";
import { FileText } from "lucide-react";
import BuaContractCard from "@/components/Pages/YouthAmbassador/Dashboard/BuaContractTab";
import { useGetAgentHiredMaidQuery } from "@/redux/features/home.maid.feature";
import TaskFeedSkeleton from "@/components/Skeletons/TaskFeedSkeleton";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";
import { IMaidOrder } from "@/interfaces/maid";

export default function AgentPartnerBuaContractsPage() {
  const { data, isLoading, isError } = useGetAgentHiredMaidQuery(undefined);
  const contracts = (data?.data as IMaidOrder[]) || [];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          বুয়া চুক্তি
        </h2>
        <p className="text-muted-foreground text-sm">
          আপনার এরিয়ায় সফলভাবে সম্পন্ন হওয়া গৃহকর্মী নিয়োগের তালিকা
        </p>
      </div>

      {isLoading ? (
        <TaskFeedSkeleton />
      ) : isError ? (
        <ManageStatusState
          type="error"
          message="তথ্য লোড করতে সমস্যা হয়েছে"
          description="দুঃখিত! সার্ভারে সাময়িক ত্রুটি হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।"
        />
      ) : !contracts?.length ? (
        <ManageStatusState
          type="notFound"
          message="কোনো চুক্তি পাওয়া যায়নি"
          description="এখনো আপনার এরিয়ায় কোনো গৃহকর্মী নিয়োগ সম্পন্ন হয়নি। নতুন রিকুয়েস্ট আসলে এখানে দেখানো হবে।"
        />
      ) : (
        <div className="grid gap-4">
          {contracts?.map((contract: IMaidOrder) => (
            <BuaContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      )}
    </div>
  );
}
