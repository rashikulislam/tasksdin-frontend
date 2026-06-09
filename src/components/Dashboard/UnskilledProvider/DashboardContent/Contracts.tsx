"use client";
import { ChangeEvent, useState } from "react";
import { useGetProviderRunningProposalsQuery } from "@/redux/features/proposal.nonskill.features";
import { IProposal } from "@/interfaces/proposal";
import ProposalsSkeleton from "@/components/Skeletons/ProposalsSkeleton";
import ActiveContractProvider from "./ActiveContractProvider";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";

const UnskilledProviderContracts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } =
    useGetProviderRunningProposalsQuery(undefined);
  const contracts = data?.data || [];

  const filteredActive = contracts?.filter((c: IProposal) =>
    c?.task?.task_title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="w-full max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="অনুসন্ধান করুন..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
      </div>
      {isLoading ? (
        <ProposalsSkeleton />
      ) : isError ? (
        <ManageStatusState
          type="error"
          message="ডাটা লোড করতে সমস্যা হয়েছে"
          description="দয়া করে পেজটি রিফ্রেশ করুন অথবা পরে আবার চেষ্টা করুন।"
        />
      ) : !filteredActive?.length ? (
        <ManageStatusState
          type="notFound"
          message="কোনো চলমান কাজ নেই"
          description="এই মুহূর্তে আপনার কোনো চলমান কাজ নেই।"
        />
      ) : (
        <div>
          {filteredActive?.map((contract: IProposal) => (
            <ActiveContractProvider key={contract?.id} contract={contract} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UnskilledProviderContracts;
