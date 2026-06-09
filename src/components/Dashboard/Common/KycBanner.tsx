"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, Clock, XCircle, Info } from "lucide-react";
import useKycStatus from "@/hooks/useKycStatus";

interface KycBannerProps {
  kycPath: string;
}

const KycBanner = ({ kycPath }: KycBannerProps) => {
  const pathname = usePathname();
  const { loading, isVerified, kycState, kyc } = useKycStatus();

  // Don't render while loading, when verified, or when already on the KYC page
  if (loading || isVerified || pathname.includes("/kyc")) return null;

  const configs = {
    NOT_SUBMITTED: {
      bg: "bg-amber-50 border-amber-300 dark:bg-amber-950/30 dark:border-amber-700",
      text: "text-amber-800 dark:text-amber-300",
      Icon: AlertTriangle,
      title: "Identity verification required",
      message: "Submit your KYC documents to unlock task posting, proposals, and Bua services.",
      action: "Verify Now",
    },
    PENDING: {
      bg: "bg-blue-50 border-blue-300 dark:bg-blue-950/30 dark:border-blue-700",
      text: "text-blue-800 dark:text-blue-300",
      Icon: Clock,
      title: "KYC under review",
      message: "Your documents have been received. Our team will review them within 24–48 hours.",
      action: "View Status",
    },
    REJECTED: {
      bg: "bg-red-50 border-red-300 dark:bg-red-950/30 dark:border-red-700",
      text: "text-red-800 dark:text-red-300",
      Icon: XCircle,
      title: "KYC rejected",
      message: kyc?.reject_reason
        ? `Reason: ${kyc.reject_reason}. Please resubmit with correct documents.`
        : "Your KYC was rejected. Please resubmit with correct documents.",
      action: "Resubmit",
    },
    HOLD: {
      bg: "bg-orange-50 border-orange-300 dark:bg-orange-950/30 dark:border-orange-700",
      text: "text-orange-800 dark:text-orange-300",
      Icon: Info,
      title: "KYC on hold",
      message: kyc?.hold_reason
        ? `Reason: ${kyc.hold_reason}. Please check and resubmit if needed.`
        : "Your KYC review is on hold. Please check for further instructions.",
      action: "View Details",
    },
  } as const;

  if (!kycState || kycState === "APPROVED") return null;
  const { bg, text, Icon, title, message, action } = configs[kycState];

  return (
    <div className={`w-full rounded-lg border px-4 py-3 mb-4 flex items-start gap-3 ${bg}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${text}`} />
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm ${text}`}>{title}</p>
        <p className={`text-xs mt-0.5 ${text} opacity-80`}>{message}</p>
      </div>
      <Link
        href={kycPath}
        className={`shrink-0 text-xs font-semibold underline underline-offset-2 ${text}`}
      >
        {action} →
      </Link>
    </div>
  );
};

export default KycBanner;
