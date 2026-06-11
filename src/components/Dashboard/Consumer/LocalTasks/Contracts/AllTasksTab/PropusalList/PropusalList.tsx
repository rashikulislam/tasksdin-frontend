"use client";

import { ProposalHeader } from "./ProposalHeader";
import { ProviderCard } from "./ProviderCard";
import { useRouter } from "next/navigation";
import { useGetParticularTaskProposalQuery } from "@/redux/features/proposal.nonskill.features";
import ProposalsSkeleton from "@/components/Skeletons/ProposalsSkeleton";
import { TUserLocation } from "@/interfaces/location";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";

interface ProposalsListProps {
  taskId: string;
}
export interface IProvider {
  provider_id: string;
  user_id: string;
  email: string;
  phone_number: string;
  full_name: string;
  profile_img: string;
  nid_image_front: string;
  nid_image_backend: string;
  nid_image_number: string;
  passport_img: string;
  passport_number: string;
  live_image: string;
  created_at: string;
  updated_at: string;
  user: { avgRating: number; ratingCount: number; locations: TUserLocation[] };
  completedProposalCount: number;
}
export interface IProposal {
  id: string;
  provider_id: string;
  task_id: string;
  description: string;
  match_type: string | null;
  proposal_price: number;
  longitude: number;
  latitude: number;
  completion_date: string | null;
  is_accepted: boolean;
  created_at: string;
  updated_at: string;
  status: string;
  provider: IProvider;
  task: {
    longitude: number;
    latitude: number;
  };
  conversation?: { id: string };
}

export default function ProposalsList({ taskId }: ProposalsListProps) {
  const { isLoading, data, isError } = useGetParticularTaskProposalQuery(
    taskId,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const router = useRouter();
  const proposals = data?.data?.proposals || [];
  return (
    <div className="space-y-6 pb-20">
      <ProposalHeader count={proposals?.length} onBack={router.back} />

      {isLoading ? (
        <>
          <ProposalsSkeleton />
        </>
      ) : isError ? (
        <ManageStatusState
          type="error"
          message="কনট্র্যাক্ট লোড করতে সমস্যা হয়েছে"
          description="দয়া করে পেজটি রিফ্রেশ করুন অথবা পরে আবার চেষ্টা করুন।"
        />
      ) : (
        <div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-blue-500">
              {data?.data?.task?.task_title}
            </h1>
            <p className=" py-1 text-gray-500">
              {data?.data?.task?.description}
            </p>
            <p className="text-2xl font-bold text-red-500">
              ৳{data?.data?.task?.budget}
            </p>
          </div>
          <div className="grid gap-6 pt-5">
            {proposals?.map((provider: IProposal) => (
              <ProviderCard key={provider.id} proposal={provider} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
