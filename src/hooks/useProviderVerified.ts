import { useGeneralProviderVerifiedStatusQuery } from "@/redux/features/general.provider.feature";

const useProviderVerified = () => {
  const { isLoading, data, error } =
    useGeneralProviderVerifiedStatusQuery(undefined);
  console.log(data);
  if (error) {
    return {
      loading: isLoading,
      isVerified: false,
      status: null,
    };
  }

  if (data) {
    return {
      loading: isLoading,
      isVerified: data?.data?.is_verified,
      status: data?.data?.verification?.status,
    };
  }

  return {
    loading: isLoading,
    isVerified: data?.data?.is_verified,
    status: null,
  };
};

export default useProviderVerified;
