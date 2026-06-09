"use client";
import { INonSkillContractProvider } from "@/interfaces/proposal";
import UnskilledContractDetails from "./ContractDetails";
import { useGetProviderSingleContractQuery } from "@/redux/features/proposal.nonskill.features";
import TaskDetailsSkeleton from "@/components/Skeletons/TaskDetailsSkeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";

const SingleContractDetails = ({ id }: { id: string }) => {
  const { isLoading, data, isError } = useGetProviderSingleContractQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const isMobile = useIsMobile();
  const contract = data?.data as INonSkillContractProvider;

  return (
    <div>
      {isLoading ? (
        <TaskDetailsSkeleton isMobile={isMobile} />
      ) : isError ? (
        <ManageStatusState
          type="error"
          message="ডাটা লোড করতে সমস্যা হয়েছে"
          description="দয়া করে পেজটি রিফ্রেশ করুন অথবা পরে আবার চেষ্টা করুন।"
        />
      ) : (
        <UnskilledContractDetails contract={contract} />
      )}
    </div>
  );
};

export default SingleContractDetails;
