"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, DollarSign, FileText, Clock } from "lucide-react";

interface Proposal {
  id: string;
  taskTitle: string;
  taskBrief: string;
  proposedPrice: string;
  distance: string;
  submittedDate: string;
  proposalText: string;
  status: "pending" | "accepted" | "rejected";
  taskDescription: string;
  taskLocation: string;
  taskDuration: string;
}

interface UnskilledProposalDetailsProps {
  proposalId: string;
  onBack: () => void;
}

const UnskilledProposalDetails = ({ proposalId, onBack }: UnskilledProposalDetailsProps) => {
  // Mock data
  const proposal: Proposal = {
    id: proposalId,
    taskTitle: "বাজার করা এবং বাসায় পৌঁছানো",
    taskBrief: "স্থানীয় বাজার থেকে দৈনন্দিন প্রয়োজনীয় জিনিসপত্র",
    proposedPrice: "300",
    distance: "2.5 কিমি দূরে",
    submittedDate: "২ দিন আগে",
    proposalText: "আমি এই কাজটি খুব ভালোভাবে করতে পারব। আমার এই ধরনের কাজে অনেক অভিজ্ঞতা আছে এবং আমি সময়মতো কাজ সম্পন্ন করি। আপনার তালিকা অনুযায়ী সব জিনিস কিনে নিরাপদে পৌঁছে দেব।",
    status: "pending",
    taskDescription: "স্থানীয় বাজার থেকে দৈনন্দিন প্রয়োজনীয় জিনিসপত্র কিনে বাসায় পৌঁছে দিতে হবে। তালিকা এবং টাকা আগে থেকেই দেওয়া হবে।",
    taskLocation: "ধানমন্ডি, ঢাকা",
    taskDuration: "২ ঘন্টা"
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">অপেক্ষমাণ</Badge>;
      case "accepted":
        return <Badge className="bg-success text-success-foreground">গৃহীত</Badge>;
      case "rejected":
        return <Badge className="bg-destructive text-destructive-foreground">প্রত্যাখ্যাত</Badge>;
      default:
        return <Badge variant="outline">অজানা</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border p-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Proposal Details</h1>
      </div>

      <div className="container mx-auto p-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Side - Task Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl">কাজের বিবরণ</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{proposal.taskTitle}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{proposal.taskBrief}</p>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    সম্পূর্ণ বিবরণ
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {proposal.taskDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{proposal.taskLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">সময়কাল: {proposal.taskDuration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">বাজেট: ৳{proposal.proposedPrice}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Proposal Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>আপনার প্রস্তাব</CardTitle>
                  {getStatusBadge(proposal.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Proposal Status */}
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">প্রস্তাবিত মূল্য</span>
                    <span className="text-2xl font-bold text-primary">৳{proposal.proposedPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">দূরত্ব</span>
                    <span className="font-medium">{proposal.distance}</span>
                  </div>
                </div>

                {/* Proposal Text */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    প্রস্তাবনা
                  </h4>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground leading-relaxed">
                      {proposal.proposalText}
                    </p>
                  </div>
                </div>

                {/* Submission Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">জমা দেওয়ার তারিখ</p>
                      <p className="text-xs text-muted-foreground">{proposal.submittedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Status Message */}
                {proposal.status === "pending" && (
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="text-sm text-center">
                      আপনার প্রস্তাব পর্যালোচনা করা হচ্ছে। ক্লায়েন্ট শীঘ্রই সাড়া দেবেন।
                    </p>
                  </div>
                )}

                {proposal.status === "accepted" && (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-sm text-center font-medium text-success">
                      অভিনন্দন! আপনার প্রস্তাব গৃহীত হয়েছে।
                    </p>
                  </div>
                )}

                {proposal.status === "rejected" && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-center">
                      দুঃখিত, এই প্রস্তাব গৃহীত হয়নি। চেষ্টা চালিয়ে যান!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnskilledProposalDetails;