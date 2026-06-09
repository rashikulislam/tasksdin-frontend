import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // CREATE CONSUMER ACCOUNT
    createConsumerAccount: builder.mutation({
      query: (payload) => ({
        url: "/user/register/consumer",
        method: "POST",
        body: payload,
      }),
    }),

    // CREATE NON-SKILLED PROVIDER ACCOUNT
    createProviderAccount: builder.mutation({
      query: (payload) => ({
        url: "/user/register-non-skilled-provider",
        method: "POST",
        body: payload,
      }),
    }),

    // Phone OTP verification is disabled — see twilio_helper.ts on the backend.
    // verifyPhone / resendPhoneOtp endpoints are kept commented out below in
    // case phone OTP needs to be re-enabled later.

    // verifyPhone: builder.mutation({
    //   query: (payload: { phone_number: string; otp_code: string }) => ({
    //     url: "/auth/verify-phone",
    //     method: "POST",
    //     body: payload,
    //   }),
    // }),

    // resendPhoneOtp: builder.mutation({
    //   query: (payload: { phone_number: string }) => ({
    //     url: "/auth/resend-phone-otp",
    //     method: "POST",
    //     body: payload,
    //   }),
    // }),

    // VERIFY EMAIL — returns { accessToken } on success (auto-login)
    verifyEmail: builder.mutation({
      query: (payload: { email: string; code: string }) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: payload,
      }),
    }),

    // RESEND EMAIL VERIFICATION CODE
    resendEmailVerificationCode: builder.mutation({
      query: (payload: { email: string }) => ({
        url: "/auth/new-email-verification-code",
        method: "POST",
        body: payload,
      }),
    }),

    // SAVE PROFILE (final onboarding step — address + GPS location + referral code)
    saveAddress: builder.mutation({
      query: (payload: {
        address: string;
        latitude?: number;
        longitude?: number;
        referral_code?: string;
      }) => ({
        url: "/user/save-address",
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const {
  useCreateConsumerAccountMutation,
  useCreateProviderAccountMutation,
  useVerifyEmailMutation,
  useResendEmailVerificationCodeMutation,
  useSaveAddressMutation,
} = authApi;
