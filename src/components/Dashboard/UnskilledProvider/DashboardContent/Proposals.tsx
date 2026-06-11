"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Eye, Calendar } from "lucide-react";
import Link from "next/link";
import { useGetProviderProposalsQuery } from "@/redux/features/proposal.nonskill.features";
import { IProposal } from "@/interfaces/proposal";
import { calculateDistance } from "@/components/Dashboard/Common/utils/calculateDistance";
import moment from "moment";
import ProposalsSkeleton from "@/components/Skeletons/ProposalsSkeleton";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";

const UnskilledProviderProposals = () => {
  const { isLoading, data, isError } = useGetProviderProposalsQuery(undefined);

  const proposals = data?.data || [];
  const getStatusBadge = (status: IProposal["status"]) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="bg-warning/10 text-warning border-warning/30"
          >
            Pending
          </Badge>
        );
      case "ON_GOING":
        return (
          <Badge
            variant="outline"
            className="bg-success/10 text-success border-success/30"
          >
            On Going
          </Badge>
        );
      case "DENY":
        return (
          <Badge
            variant="outline"
            className="bg-destructive/10 text-destructive border-destructive/30"
          >
            Deny
          </Badge>
        );
      case "COMPLETE":
        return (
          <Badge
            variant="outline"
            className="bg-destructive/10 text-destructive border-destructive/30"
          >
            Complete
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">আমার প্রস্তাবনা</h2>
          <p className="text-muted-foreground mt-1">
            আপনার জমা দেওয়া সব প্রস্তাবনা এখানে ট্র্যাক করুন
          </p>
        </div>
        <Badge variant="outline" className="text-primary">
          {proposals.length}টি মোট
        </Badge>
      </div>

      {isLoading ? (
        <>
          <ProposalsSkeleton />
        </>
      ) : isError ? (
        <ManageStatusState
          type="error"
          message="ডাটা লোড করতে সমস্যা হয়েছে"
          description="দয়া করে পেজটি রিফ্রেশ করুন অথবা পরে আবার চেষ্টা করুন।"
        />
      ) : proposals.length === 0 ? (
        <ManageStatusState
          type="notFound"
          message="কোনো প্রস্তাবনা নেই"
          description="এই মুহূর্তে আপনার জন্য কোনো প্রস্তাবনা নেই।"
        />
      ) : (
        <div className="grid gap-4">
          {proposals.map((proposal: IProposal) => (
            <Card
              key={proposal.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">
                        {proposal.task?.task_title}
                      </CardTitle>
                      {getStatusBadge(proposal?.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {proposal?.task.description}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Key Details */}
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Task Price</p>
                    <p className="text-lg font-bold text-primary">
                      ৳{proposal?.task?.budget}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Proposed Price
                    </p>
                    <p className="text-lg font-bold text-primary">
                      ৳{proposal?.proposal_price}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Distance
                    </p>
                    <p className="text-lg font-medium">
                      {proposal.latitude && proposal.longitude && proposal.task?.latitude && proposal.task?.longitude
                        ? `${calculateDistance(
                            { lat1: proposal.latitude, lng1: proposal.longitude },
                            { lat2: proposal.task.latitude, lng2: proposal.task.longitude },
                          ).toFixed(1)} কিমি`
                        : "—"}
                    </p>
                  </div>
                </div>

                {/* Proposal Details */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Your Proposal
                  </p>
                  <p className="text-sm bg-muted/20 p-3 rounded-lg border border-border">
                    {proposal?.description}
                  </p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Submitted on{" "}
                    {moment(proposal.completion_date).format("DD-MM-YYY")}
                  </span>
                </div>

                {/* Actions */}
                <Button variant="outline" size="lg" className="w-full ">
                  <Link
                    href={`/dashboard/general-provider/contracts/${proposal.id}`}
                    className="flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnskilledProviderProposals;
