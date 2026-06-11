"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, CheckCircle, Briefcase, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { IProposal } from "./PropusalList";
import { useAlert } from "@/components/Reusable/AlertModal";
import { useAcceptProposalNonSkillMutation } from "@/redux/features/proposal.nonskill.features";
import { useCreateConversationMutation } from "@/redux/features/conversation";
import { calculateDistance } from "@/components/Dashboard/Common/utils/calculateDistance";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import MessagePageChatArea from "@/components/Pages/DashboardPages/Message/MessagePageChatArea";

interface ProviderCardProps {
  proposal: IProposal;
}

export function ProviderCard({ proposal }: ProviderCardProps) {
  const t = useTranslations("Dashboard.Consumer.Proposals");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [createConversation, { isLoading: isCreatingConversation }] = useCreateConversationMutation();

  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };
  const { showConfirm, showAlert } = useAlert();
  const [mutateAsync, { isLoading }] = useAcceptProposalNonSkillMutation();

  const handleHireProvider = (proposalId: string, providerId: string) => {
    const payload = {
      proposalId,
      providerUserId: providerId,
    };

    showConfirm({
      title: "আপনি কি এই প্রোভাইডারকে নিয়োগ দিতে চান?",
      description:
        "এই প্রোভাইডারকে নিয়োগ দেওয়ার পর সিস্টেমে তাদের স্ট্যাটাস তাৎক্ষণিকভাবে পরিবর্তিত হবে।",
      confirmText: "হ্যাঁ, নিয়োগ দিন",
      cancelText: "বাতিল",
      onConfirm: async () => {
        try {
          const result = await mutateAsync(payload).unwrap();
          if (result?.success) {
            showAlert({
              type: "success",
              title: "প্রোভাইডারকে সফলভাবে নিয়োগ দেওয়া হয়েছে।",
            });
            return;
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log(error);
          return showAlert({
            type: "error",
            title: error?.data?.message || "কিছু একটা সমস্যা হয়েছে",
          });
        }
      },
    });
  };

  return (
    <>
      <Card className="shadow transition-shadow">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage src={proposal?.provider?.profile_img} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                  {proposal?.provider?.full_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      {proposal?.provider?.full_name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate text-blue-600 font-semibold">
                        {`${calculateDistance(
                          {
                            lat1: proposal?.latitude,
                            lng1: proposal?.longitude,
                          },
                          {
                            lat2: proposal?.task?.latitude as number,
                            lng2: proposal?.task?.longitude as number,
                          },
                        ).toFixed(1)} কিমি`}{" "}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/30"
                  >
                    সেরা মিল
                  </Badge>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg border">
              <div className=" flex items-center justify-center gap-2 mb-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="">
                  <span className="text-xs text-muted-foreground">
                    {t("successRate")}
                  </span>
                  <p className="text-lg font-bold text-green-600">
                    {(100 * proposal?.provider?.completedProposalCount) / 100}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-1 border-x">
                <Briefcase className="w-5 h-5 text-primary" />
                <div>
                  <span className="text-xs text-muted-foreground">
                    {t("jobCount")}
                  </span>
                  <p className="text-lg font-bold text-primary">
                    {proposal?.provider?.completedProposalCount}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t("rating")}</p>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-500 pt-1">
                    {proposal?.provider?.user?.avgRating.toFixed(1)}
                  </span>
                  <div className="flex">
                    <Rating
                      style={{ maxWidth: 100 }}
                      value={proposal?.provider?.user?.avgRating}
                      itemStyles={myStyles}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Proposal */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{t("proposal")}</h4>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {t("proposedPrice")}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    ৳{proposal?.proposal_price}
                  </p>
                </div>
              </div>
              {proposal?.description && (
                <div className="bg-muted/20 p-4 rounded-lg border">
                  <p className="text-sm leading-relaxed">
                    {proposal?.description}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                disabled={isLoading || proposal?.status === "ON_GOING"}
                onClick={() =>
                  handleHireProvider(proposal?.id, proposal?.provider?.user_id)
                }
              >
                {t("hire")}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={isCreatingConversation}
                onClick={async () => {
                  try {
                    const result = await createConversation({
                      receiverId: proposal?.provider?.user_id,
                    }).unwrap();
                    setActiveConversationId(result?.data?.id);
                    setIsChatOpen(true);
                  } catch {
                    setActiveConversationId(null);
                  }
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {isCreatingConversation ? "..." : t("message")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inline chat sheet */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent
          side="left"
          className="w-full sm:max-w-lg p-0 flex flex-col"
        >
          <SheetHeader className="px-4 pt-4 pb-2 border-b">
            <SheetTitle className="text-base">
              {proposal?.provider?.full_name} — চ্যাট
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            {activeConversationId ? (
              <MessagePageChatArea
                conversationId={activeConversationId}
                onBack={() => setIsChatOpen(false)}
              />
            ) : (
              <p className="flex items-center justify-center h-full text-sm text-muted-foreground">
                কথোপকথন লোড হচ্ছে...
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
