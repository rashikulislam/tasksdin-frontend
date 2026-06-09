"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFullConversationQuery } from "@/redux/features/conversation";

interface RightSideProfileProps {
  conversationId: string;
  onClose?: () => void;
}

export default function RightSideProfile({
  conversationId,
  onClose,
}: RightSideProfileProps) {
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

  //  Loading Skeleton
  if (isLoading) {
    return (
      <div className="w-full lg:w-80 h-full bg-card border-l p-6 ">
        <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4 bg-[#2e2e2e]" />
        <Skeleton className="w-32 h-4 mx-auto pt-5 mb-2 bg-[#2e2e2e]" />
        <Skeleton className="w-20 h-4 mx-auto pt-5 mb-2 bg-[#2e2e2e]" />
        <div className="mt-8">
          <Skeleton className="w-40 h-2 mx-auto mb-2 bg-[#2e2e2e]" />
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

  //  Error State

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
    <div
      className="
 w-full lg:w-80 h-full flex flex-col pb-0 rounded-t-lg overflow-hidden
  bg-card
  shadow-[10px_10px_30px_rgba(0,0,0,0.05)]
  dark:shadow-[inset_0_10px_100px_rgba(255,255,255,0.06)]
  backdrop-blur-sm
"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 ">
        {/* Avatar */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24 border-background shadow-lg">
              <AvatarImage src={user?.profile_img} alt={user?.full_name} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                {user?.full_name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Online Indicator */}
            {user?.isOnline || (
              <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-card rounded-full" />
            )}
          </div>

          <h3 className="text-[18px] font-bold">{user?.full_name}</h3>

          {/* {user?.subtitle && (
            <p className="text-sm text-muted-foreground mb-3">
              {user.subtitle}
            </p>
          )} */}

          {user?.isOnline || (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-600 mt-2"
            >
              Online
            </Badge>
          )}
        </div>

        {/* <Separator className="my-4" /> */}

        {/* Bio */}
        {user?.bio || (
          <div className="mb-6">
            <p className="text-sm text-center max-w-[80%] mx-auto text-muted-foreground">
              {" "}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
              laborum nihil, eligendi expedita, distinctio, consequuntur eos{" "}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-2 mt-10">
          <Button variant="outline" className="w-full justify-center">
            Hire Provider
          </Button>
          <Button variant="outline" className="w-full justify-center">
            View Proposal
          </Button>
        </div>
      </div>
    </div>
  );
}
