"use client";

import ContractHeader from "@/components/Dashboard/Consumer/LocalTasks/ContractsDetails/ContractHeader";
import ContractInfoCard from "@/components/Dashboard/Consumer/LocalTasks/ContractsDetails/ContractInfoCard";
import PaymentBreakdownCard from "@/components/Dashboard/Consumer/LocalTasks/ContractsDetails/PaymentBreakdownCard";
import ProviderInfoCard from "@/components/Dashboard/Consumer/LocalTasks/ContractsDetails/ProviderInfoCard";
import { useGetConsumerSingleContractQuery } from "@/redux/features/proposal.nonskill.features";
import { IProposal } from "@/interfaces/proposal";
import ServiceDetailsSkeleton from "@/components/Skeletons/ServiceDetailsSkeleton";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ContractDetailsPage({ id }: { id: string }) {
  // Mock data

  const { data, isLoading } = useGetConsumerSingleContractQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const isMobile = useIsMobile();
  const contract = data?.data as IProposal;
  const conversationId = data?.data?.conversation?.id;

  if (isLoading) {
    return <ServiceDetailsSkeleton isMobile={isMobile} />;
  }

  return (
    <div className="min-h-screen bg-background pb-0 lg:pb-6 pt-5">
      {/* <ContractHeader /> */}
      <div>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left */}
          <div className="space-y-6">
            <ContractInfoCard contract={contract} />
            <PaymentBreakdownCard price={contract?.proposal_price} />
          </div>

          {/* Right */}
          <div className="space-y-6">
            <ProviderInfoCard
              provider={contract?.provider}
              conversationId={conversationId}
              latitude={contract?.latitude}
              longitude={contract?.longitude}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
