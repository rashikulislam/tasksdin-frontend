import { useGetKycStatusQuery } from "@/redux/features/kyc.feature";

export type KycState = "NOT_SUBMITTED" | "PENDING" | "APPROVED" | "REJECTED" | "HOLD";

export interface KycRecord {
  id: string;
  doc_type: string;
  status: KycState;
  reject_reason: string | null;
  hold_reason: string | null;
  created_at: string;
  updated_at: string;
}

const useKycStatus = () => {
  const { data, isLoading, isFetching, error } = useGetKycStatusQuery(undefined);

  // Treat any in-flight fetch (initial load OR refetch after mutation) as loading,
  // so the banner never renders with stale pre-submission data.
  if (isLoading || isFetching) {
    return { loading: true, isVerified: false, kycState: null as KycState | null, kyc: null as KycRecord | null };
  }

  if (error) {
    return { loading: false, isVerified: false, kycState: "NOT_SUBMITTED" as KycState, kyc: null };
  }

  const isVerified: boolean = data?.data?.is_kyc_verified ?? false;
  const kyc: KycRecord | null = data?.data?.kyc ?? null;
  const diditStatus: string | null = data?.data?.didit_status ?? null;

  const DIDIT_PENDING_STATUSES = ["In Review", "In Progress", "Not Started"];

  let kycState: KycState;
  if (isVerified) {
    kycState = "APPROVED";
  } else if (kyc) {
    kycState = kyc.status;
  } else if (diditStatus && DIDIT_PENDING_STATUSES.includes(diditStatus)) {
    // Didit automated verification is in progress — treat as PENDING
    // so the banner does not prompt the user to submit KYC again.
    kycState = "PENDING";
  } else {
    kycState = "NOT_SUBMITTED";
  }

  return { loading: false, isVerified, kycState, kyc };
};

export default useKycStatus;
