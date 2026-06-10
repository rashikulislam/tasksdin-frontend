"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useGetDiditKycStatusQuery } from "@/redux/features/kyc.feature";

// This page is where Didit redirects the user's browser after they complete
// (or abandon) a hosted verification session. It polls the backend for the
// latest KYC status so the user sees their result immediately, then offers
// a link back to their role-appropriate dashboard.
//
// The redirect URL is configured in the backend as DIDIT_REDIRECT_URL.

const POLL_INTERVAL_MS = 4000;
const MAX_POLLS = 12; // ~48 s before giving up

const KycCallbackPage = () => {
  const router = useRouter();

  // Poll the backend KYC status until it changes away from the initial state
  const { data, refetch, isFetching } = useGetDiditKycStatusQuery(undefined, {
    pollingInterval: 0, // manual polling only
  });

  const [pollCount, setPollCount] = useState(0);
  const [timedOut, setTimedOut] = useState(false);

  const isVerified: boolean = data?.data?.is_kyc_verified ?? false;
  const rawStatus: string = data?.data?.session?.status ?? "Not Started";

  // Determine the user's dashboard path from the token stored in localStorage.
  // Falls back to generic /dashboard if role can't be determined.
  const getDashboardPath = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return "/dashboard";
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role: string = payload?.role ?? "";
      if (role === "CONSUMER") return "/dashboard/consumer";
      if (role === "NON_SKILL_PROVIDER") return "/dashboard/general-provider";
      if (role === "PROMOTER") return "/dashboard/agent";
    } catch {
      // ignore
    }
    return "/dashboard";
  };

  // Poll until we get a definitive status or time out
  useEffect(() => {
    if (isVerified || rawStatus === "Approved" || rawStatus === "Declined" || timedOut) return;

    if (pollCount >= MAX_POLLS) {
      setTimedOut(true);
      return;
    }

    const timer = setTimeout(async () => {
      await refetch();
      setPollCount((n) => n + 1);
    }, POLL_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [pollCount, rawStatus, isVerified, timedOut, refetch]);

  const isDeclined =
    rawStatus === "Declined" || rawStatus === "Abandoned" || rawStatus === "Expired";
  const isPending = rawStatus === "In Review" || rawStatus === "In Progress";
  const isPolling = !isVerified && !isDeclined && !timedOut;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-md border">
        <CardHeader className="text-center space-y-2">
          {isVerified ? (
            <ShieldCheck className="h-12 w-12 text-green-500 mx-auto" />
          ) : isDeclined ? (
            <ShieldAlert className="h-12 w-12 text-red-500 mx-auto" />
          ) : timedOut ? (
            <ShieldAlert className="h-12 w-12 text-orange-400 mx-auto" />
          ) : (
            <Loader2 className="h-12 w-12 text-blue-500 mx-auto animate-spin" />
          )}

          <CardTitle className="text-xl font-bold">
            {isVerified
              ? "Verification Successful!"
              : isDeclined
              ? "Verification Not Successful"
              : timedOut
              ? "Still Processing"
              : "Processing Your Verification…"}
          </CardTitle>

          <CardDescription>
            {isVerified
              ? "Your identity has been verified. You now have full access to the platform."
              : isDeclined
              ? "Your verification attempt was not approved. Please try again from your KYC page."
              : isPending
              ? "Didit is reviewing your submission. This usually takes just a few minutes."
              : timedOut
              ? "We are still waiting for confirmation from Didit. Your status will update automatically — please check your KYC page."
              : "We received your verification submission and are processing the result. Please wait…"}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 pt-0">
          {(isVerified || isDeclined || timedOut) && (
            <Button
              className="w-full cursor-pointer"
              onClick={() => router.push(getDashboardPath())}
            >
              Go to Dashboard
            </Button>
          )}

          {(isDeclined || timedOut) && (
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => router.push(`${getDashboardPath()}/kyc`)}
            >
              Back to KYC Page
            </Button>
          )}

          {isPolling && (
            <p className="text-xs text-center text-muted-foreground">
              Checking status… ({pollCount + 1}/{MAX_POLLS})
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KycCallbackPage;
