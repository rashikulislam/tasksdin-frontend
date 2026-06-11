"use client";

import { useRouter, usePathname } from "next/navigation";
import { ShieldCheck, ShieldAlert, ShieldX, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { showToast } from "@/components/Reusable/CustomToast";
import {
  useCreateDiditKycSessionMutation,
  useGetDiditKycStatusQuery,
} from "@/redux/features/kyc.feature";

interface DiditKycVerificationProps {
  dashboardPath: string;
}

// Maps the raw status Didit reports on the latest session to a badge.
// "Approved" is the only state where is_kyc_verified becomes true.
const STATUS_BADGES: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; Icon: typeof ShieldCheck }> = {
  Approved: { label: "Approved", variant: "default", Icon: ShieldCheck },
  "In Review": { label: "Pending", variant: "secondary", Icon: ShieldAlert },
  "In Progress": { label: "Pending", variant: "secondary", Icon: ShieldAlert },
  "Not Started": { label: "Not Started", variant: "outline", Icon: ShieldAlert },
  Declined: { label: "Rejected", variant: "destructive", Icon: ShieldX },
  Abandoned: { label: "Rejected", variant: "destructive", Icon: ShieldX },
  Expired: { label: "Rejected", variant: "destructive", Icon: ShieldX },
};

const DiditKycVerification = ({ dashboardPath }: DiditKycVerificationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isFetching } = useGetDiditKycStatusQuery(undefined);
  const [createSession, { isLoading: isStarting }] = useCreateDiditKycSessionMutation();

  const isVerified: boolean = data?.data?.is_kyc_verified ?? false;
  const session = data?.data?.session ?? null;
  const rawStatus: string = isVerified ? "Approved" : session?.status ?? "Not Started";
  const badge = STATUS_BADGES[rawStatus] ?? STATUS_BADGES["Not Started"];

  const handleStartVerification = async () => {
    try {
      // Derive the locale from the current pathname (e.g. "/en/dashboard/..." → "en")
      // so the Didit callback always redirects back to the same host and locale.
      const locale = pathname.split("/")[1] || "en";
      const redirect_url = `${window.location.origin}/${locale}/kyc-callback`;

      const result = await createSession({ redirect_url }).unwrap();
      const sessionUrl = result?.data?.session_url;
      if (!sessionUrl) {
        return showToast({ type: "error", description: "Failed to start verification. Please try again." });
      }
      // Hand the user off to Didit's hosted verification flow
      window.location.href = sessionUrl;
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showToast({
        type: "error",
        description: err?.data?.message ?? "Failed to start verification. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            Identity Verification (KYC)
          </CardTitle>
          <Badge variant={badge.variant} className="gap-1">
            <badge.Icon className="h-3 w-3" />
            {badge.label}
          </Badge>
        </div>
        <CardDescription>
          We use Didit, a trusted third-party identity verification provider, to confirm your
          identity. This is required before you can post tasks, accept tasks, or submit bids.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {isVerified ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-green-700 dark:text-green-400">
              Your identity has been verified. You now have full access to the platform.
            </p>
            <Button onClick={() => router.push(dashboardPath)} className="cursor-pointer w-full">
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {rawStatus === "In Review" || rawStatus === "In Progress" ? (
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Your verification is being reviewed by Didit. This usually takes just a few
                minutes — we will update your status automatically once it&apos;s complete.
              </p>
            ) : rawStatus === "Declined" || rawStatus === "Abandoned" || rawStatus === "Expired" ? (
              <p className="text-sm text-red-700 dark:text-red-400">
                Your last verification attempt was not successful. Please start a new verification
                session and try again.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Click below to start a secure identity verification session. You&apos;ll be
                redirected to Didit to complete the process with your ID and a live selfie.
              </p>
            )}

            <Button
              onClick={handleStartVerification}
              disabled={isStarting || isFetching}
              className="w-full bg-blue-600 hover:bg-blue-500 cursor-pointer"
            >
              {isStarting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Starting verification…
                </>
              ) : (
                <>
                  {rawStatus === "Not Started" ? "Start Verification" : "Restart Verification"}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiditKycVerification;
