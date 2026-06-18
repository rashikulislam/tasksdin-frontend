"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useGetFullConversationQuery } from "@/redux/features/conversation";
import {
  useGetPendingProposalByProviderQuery,
  useAcceptProposalNonSkillMutation,
} from "@/redux/features/proposal.nonskill.features";
import { useAlert } from "@/components/Reusable/AlertModal";
import moment from "moment";

interface RightSideProfileProps {
  conversationId: string;
  onClose?: () => void;
}

export default function RightSideProfile({
  conversationId,
  onClose,
}: RightSideProfileProps) {
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  const {
    data: conversation,
    isLoading,
    isError,
    refetch,
  } = useGetFullConversationQuery(conversationId, {
    skip: !conversationId,
    refetchOnMountOrArgChange: true,
  });

  const user = conversation?.data?.user;
  const providerUserId: string | undefined = user?.user_id;

  const { data: proposalRes, refetch: refetchProposal } =
    useGetPendingProposalByProviderQuery(providerUserId as string, {
      skip: !providerUserId,
    });

  const proposal = proposalRes?.data ?? null;

  const [acceptProposal, { isLoading: isHiring }] =
    useAcceptProposalNonSkillMutation();
  const { showConfirm, showAlert } = useAlert();

  const handleHireProvider = () => {
    if (!proposal) return;
    showConfirm({
      title: "আপনি কি এই প্রোভাইডারকে নিয়োগ দিতে চান?",
      description:
        "এই প্রোভাইডারকে নিয়োগ দেওয়ার পর সিস্টেমে তাদের স্ট্যাটাস তাৎক্ষণিকভাবে পরিবর্তিত হবে।",
      confirmText: "হ্যাঁ, নিয়োগ দিন",
      cancelText: "বাতিল",
      onConfirm: async () => {
        try {
          const result = await acceptProposal({
            proposalId: proposal.id,
            providerUserId,
          }).unwrap();
          if (result?.success) {
            showAlert({
              type: "success",
              title: "প্রোভাইডারকে সফলভাবে নিয়োগ দেওয়া হয়েছে।",
            });
            refetchProposal();
          }
        } catch (error: unknown) {
          const e = error as { data?: { message?: string } };
          showAlert({
            type: "error",
            title: e?.data?.message || "কিছু একটা সমস্যা হয়েছে",
          });
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="w-full lg:w-80 h-full bg-card border-l p-6">
        <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4 bg-[#2e2e2e]" />
        <Skeleton className="w-32 h-4 mx-auto pt-5 mb-2 bg-[#2e2e2e]" />
        <Skeleton className="w-20 h-4 mx-auto pt-5 mb-2 bg-[#2e2e2e]" />
        <div className="mt-8">
          <Skeleton className="w-40 h-2 mx-auto mb-2 bg-[#2e2e2e]" />
          <Skeleton className="w-40 h-2 mx-auto mb-2 bg-[#2e2e2e]" />
        </div>
        <div className="mt-10">
          <Skeleton className="w-full h-8 mb-2 bg-[#2e2e2e]" />
          <Skeleton className="w-full h-8 mb-2 bg-[#2e2e2e]" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full lg:w-80 h-full bg-card border-l p-6 flex flex-col justify-center items-center">
        <p className="text-red-500 font-medium">Failed to load profile.</p>
        <Button variant="outline" className="mt-3" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="w-full lg:w-80 h-full flex flex-col pb-0 rounded-t-lg overflow-hidden bg-card shadow-[10px_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_10px_100px_rgba(255,255,255,0.06)] backdrop-blur-sm">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6">
          {/* Avatar */}
          <div className="flex flex-col items-center text-center mb-4">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24 border-background shadow-lg">
                <AvatarImage src={user?.profile_img} alt={user?.full_name} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {user?.full_name?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {user?.is_online && (
                <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-card rounded-full" />
              )}
            </div>

            <h3 className="text-[18px] font-bold">{user?.full_name}</h3>

            {user?.is_online && (
              <Badge variant="secondary" className="bg-green-100 text-green-600 mt-2">
                Online
              </Badge>
            )}
          </div>

          {/* Proposal summary (if pending proposal exists) */}
          {proposal && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-sm border border-blue-100 dark:border-blue-900">
              <p className="font-semibold text-blue-700 dark:text-blue-300 truncate">
                {proposal.task?.task_title}
              </p>
              <p className="text-blue-600 dark:text-blue-400 mt-0.5">
                প্রস্তাবিত মূল্য: <span className="font-bold">৳{proposal.proposal_price}</span>
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-2 mt-4">
            <Button
              className="w-full justify-center"
              disabled={!proposal || isHiring}
              onClick={handleHireProvider}
              title={!proposal ? "কোনো পেন্ডিং প্রস্তাব নেই" : undefined}
            >
              {isHiring ? "প্রক্রিয়া হচ্ছে..." : "Hire Provider"}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-center"
              disabled={!proposal}
              onClick={() => setIsProposalOpen(true)}
              title={!proposal ? "কোনো পেন্ডিং প্রস্তাব নেই" : undefined}
            >
              View Proposal
            </Button>
          </div>

          {!proposal && providerUserId && (
            <p className="text-xs text-center text-muted-foreground mt-3">
              এই প্রোভাইডারের কোনো পেন্ডিং প্রস্তাব নেই।
            </p>
          )}
        </div>
      </div>

      {/* Proposal details sheet */}
      <Sheet open={isProposalOpen} onOpenChange={setIsProposalOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>প্রস্তাবের বিবরণ</SheetTitle>
          </SheetHeader>

          {proposal && (
            <div className="mt-6 space-y-5">
              <div className="p-4 bg-muted/40 rounded-lg space-y-2">
                <p className="text-xs text-muted-foreground">কাজের নাম</p>
                <p className="font-semibold">{proposal.task?.task_title}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/40 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">প্রস্তাবিত মূল্য</p>
                  <p className="text-xl font-bold text-primary">৳{proposal.proposal_price}</p>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">মূল বাজেট</p>
                  <p className="text-xl font-bold">৳{proposal.task?.budget}</p>
                </div>
              </div>

              {proposal.task?.deadline && (
                <div className="p-3 bg-muted/40 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">সময়সীমা</p>
                  <p className="font-medium">
                    {moment(proposal.task.deadline).format("DD MMM YYYY, hh:mm a")}
                  </p>
                </div>
              )}

              {proposal.description && (
                <div className="p-3 bg-muted/40 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">প্রোভাইডারের বার্তা</p>
                  <p className="text-sm leading-relaxed">{proposal.description}</p>
                </div>
              )}

              <div className="pt-2 space-y-2">
                <Button
                  className="w-full"
                  disabled={isHiring}
                  onClick={() => {
                    setIsProposalOpen(false);
                    handleHireProvider();
                  }}
                >
                  {isHiring ? "প্রক্রিয়া হচ্ছে..." : "এই প্রোভাইডারকে নিয়োগ দিন"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsProposalOpen(false)}
                >
                  বন্ধ করুন
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
