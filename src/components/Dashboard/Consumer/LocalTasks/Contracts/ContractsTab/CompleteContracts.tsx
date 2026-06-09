"use client";
import ContractsSkeleton from "@/components/Skeletons/ContractsSkeleton";
import { IProposal } from "@/interfaces/proposal";
import { ChangeEvent, useState } from "react";
import { CompleteContractCard } from "./CompleteContractCard";
import { useGetConsumerCompleteTasksQuery } from "@/redux/features/contract.feature";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";

const CompleteContracts = () => {
  const { data, isLoading, isError } =
    useGetConsumerCompleteTasksQuery(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const contracts = (data?.data as IProposal[]) || [];
  const filteredCompleted = contracts?.filter(
    (c) =>
      c?.task?.task_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c?.provider?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="w-full max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="অনুসন্ধান করুন..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
      </div>
      <div className="pt-5">
        {isLoading ? (
          <ContractsSkeleton />
        ) : isError ? (
          <ManageStatusState
            type="error"
            message="ডাটা লোড করতে সমস্যা হয়েছে"
            description="দয়া করে পেজটি রিফ্রেশ করুন অথবা পরে আবার চেষ্টা করুন।"
          />
        ) : filteredCompleted?.length === 0 ? (
          <ManageStatusState
            type="notFound"
            message="কোনো টাস্ক নেই"
            description="আপনার কোনো সম্পন্ন টাস্ক নেই।"
          />
        ) : (
          <div className="grid gap-4">
            {filteredCompleted?.map((contract) => (
              <CompleteContractCard key={contract.id} contract={contract} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteContracts;
