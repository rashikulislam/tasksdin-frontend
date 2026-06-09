"use client";

import { useState, ChangeEvent } from "react";
import ContractsSkeleton from "@/components/Skeletons/ContractsSkeleton";
import { ContractCard } from "./ContractCard";
import { useGetConsumerContractsQuery } from "@/redux/features/proposal.nonskill.features";
import { IProposal } from "@/interfaces/proposal";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";

const ActiveContracts = () => {
  const { data, isLoading, isError } = useGetConsumerContractsQuery(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const contracts = (data?.data as IProposal[]) || [];

  // Filter contracts based on search query
  const filteredActive = contracts.filter(
    (c) =>
      c?.task?.task_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c?.provider?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-4">
      {/* Search input always visible */}
      <div className="w-full max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="অনুসন্ধান করুন..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
      </div>

      {/* Conditional content */}
      {isLoading ? (
        <ContractsSkeleton />
      ) : isError ? (
        <ManageStatusState
          type="error"
          message="ডাটা লোড করতে সমস্যা হয়েছে"
          description="দয়া করে পেজটি রিফ্রেশ করুন অথবা পরে আবার চেষ্টা করুন।"
        />
      ) : !filteredActive.length ? (
        <ManageStatusState
          type="notFound"
          message="কোনো চলমান কাজ নেই"
          description="এই মুহূর্তে আপনার কোনো চলমান কাজ নেই।"
        />
      ) : (
        <div className="grid gap-4">
          {filteredActive.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveContracts;
