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
  const { data, isLoading, error } = useGetKycStatusQuery(undefined);

  if (isLoading) {
    return { loading: true, isVerified: false, kycState: null as KycState | null, kyc: null as KycRecord | null };
  }

  if (error) {
    return { loading: false, isVerified: false, kycState: "NOT_SUBMITTED" as KycState, kyc: null };
  }

  const isVerified: boolean = data?.data?.is_kyc_verified ?? false;
  const kyc: KycRecord | null = data?.data?.kyc ?? null;

  let kycState: KycState;
  if (isVerified) {
    kycState = "APPROVED";
  } else if (!kyc) {
    kycState = "NOT_SUBMITTED";
  } else {
    kycState = kyc.status;
  }

  return { loading: false, isVerified, kycState, kyc };
};

export default useKycStatus;
